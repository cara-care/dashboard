import React, { useCallback, useEffect, useRef } from 'react';
import { useInfiniteQuery } from 'react-query';
import clsx from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import times from 'lodash/times';
import MessageSkeleton from '../other/MessageSkeleton';
import InputToolbar from './InputToolbar';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';
import Spinner from '../../../components/Spinner';
import { getMessages } from '../../../utils/api';
import getParams from '../../../utils/getParams';
import ChatMessagesList from './ChatMessagesList';
import { useDispatch, useSelector } from 'react-redux';
import {
  setChatMessages,
  scrollToChatBottomSelector,
  ChatUser,
  setScrollToBottom,
  clearChatMessages,
  setCurrentChatUser,
  loadingCurrentUserSelector,
} from '../../redux';
import { ChatMessagesError } from '../other/Errors';

const useStyles = makeStyles((theme) => ({
  messages: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column-reverse',
    padding: theme.spacing(2),
    overflowY: 'auto',
  },
  noScroll: {
    overflowY: 'hidden',
  },
  center: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    padding: theme.spacing(2),
  },
  top: {
    display: 'flex',
    alignSelf: 'stretch',
    height: 24,
    width: '100%',
  },
}));

export interface ChatProps {
  user: ChatUser;
  onSendMessage: (message: string) => void;
}

export default React.memo(function Chat({ user, onSendMessage }: ChatProps) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { id: userId, username } = user;
  const loadingUserData = useSelector(loadingCurrentUserSelector);
  const isScrollNeeded = useSelector(scrollToChatBottomSelector);
  const messagesRootRef = useRef<HTMLDivElement>(null);
  const messagesTopRef = useRef<HTMLDivElement>(null);

  const performScrollToBottom = () => {
    messagesRootRef.current!.scrollTop = messagesRootRef.current!.scrollHeight;
  };

  const setScrollValue = useCallback(
    (value: boolean) => {
      dispatch(setScrollToBottom(value));
    },
    [dispatch]
  );

  const clearChat = useCallback(() => {
    dispatch(clearChatMessages());
    dispatch(setCurrentChatUser(null));
  }, [dispatch]);

  useEffect(() => {
    if (isScrollNeeded) {
      performScrollToBottom();
      setScrollValue(false);
    }
  }, [isScrollNeeded, setScrollValue]);

  useEffect(() => {
    return () => {
      clearChat();
    };
  }, [clearChat]);

  const setChatMessagesToStore = useCallback(
    (chatMessages: any) => {
      dispatch(setChatMessages(chatMessages));
    },
    [dispatch]
  );

  const {
    status,
    error,
    data,
    refetch,
    isFetchingMore,
    fetchMore,
    canFetchMore,
  } = useInfiniteQuery(
    `messages-${username}`,
    async (_key, url = '?limit=100&offset=0') => {
      // FIXME: typings
      // @ts-ignore
      const { limit, offset } = getParams(url);
      const res = await getMessages({ userId, limit, offset });
      setChatMessagesToStore(res.data.results);
      return res.data;
    },
    {
      cacheTime: 0,
      enabled: !!username || !!userId,
      refetchOnWindowFocus: false,
      getFetchMore: (lastPage) => (lastPage.next ? lastPage.next : null),
    }
  );

  const onIntersect = React.useCallback(() => {
    if (!isFetchingMore) {
      fetchMore();
    }
  }, [isFetchingMore, fetchMore]);

  useIntersectionObserver({
    targetRef: messagesTopRef,
    rootRef: messagesRootRef,
    onIntersect,
    threshold: 0.5,
    rootMargin: '20px',
    enabled: !!canFetchMore,
  });

  if (loadingUserData || status === 'loading') {
    return (
      <div className={clsx(classes.messages, classes.noScroll)}>
        {times(5).map((n) => (
          <MessageSkeleton key={n} />
        ))}
      </div>
    );
  }

  return (
    <>
      {status === 'error' ? (
        <ChatMessagesError {...{ error, refetch }} />
      ) : data?.length ? (
        <div ref={messagesRootRef} className={classes.messages}>
          <ChatMessagesList />
          <div ref={messagesTopRef} className={classes.top} />
          {isFetchingMore && (
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              p={1}
            >
              <Spinner size={24} noText />
            </Box>
          )}
        </div>
      ) : (
        <div className={classes.center}>
          <Typography>
            {username ? 'No messages here yet...' : 'Please select a room...'}
          </Typography>
        </div>
      )}
      {username && <InputToolbar onSubmit={onSendMessage} />}
    </>
  );
});
