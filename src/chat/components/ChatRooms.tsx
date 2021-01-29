import React, { useCallback, useRef } from 'react';
import { useInfiniteQuery } from 'react-query';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import times from 'lodash/times';
import { v1 } from 'uuid';
import useIntersectionObserver from '../hooks/useIntersectionObserver';
import Spinner from '../../components/Spinner';
import MessageSkeleton from './MessageSkeleton';
import ChatRoomsList from './ChatRoomsList';
import { getChatRooms } from '../../utils/api';
import { useDispatch, useSelector } from 'react-redux';
import { getChatRoomsSlug, setChatRooms } from '../redux';
import { ChatRoomsError } from './Errors';

const useStyles = makeStyles((_theme) => ({
  sidebar: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    overflowY: 'scroll',
  },
}));

export default function ChatRooms() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const rootRef = useRef<HTMLDivElement>(null);
  const fetchMoreButtonRef = useRef<HTMLButtonElement>(null);
  const chatRoomsSlug = useSelector(getChatRoomsSlug);

  const setChatMessagesToStore = useCallback(
    (chatRooms: any) => {
      dispatch(setChatRooms(chatRooms));
    },
    [dispatch]
  );

  const {
    status,
    error,
    isFetchingMore,
    refetch,
    fetchMore,
    canFetchMore,
  } = useInfiniteQuery(
    ['chatRooms', chatRoomsSlug],
    async (
      _key: string,
      chatRoomsSlug: string,
      limit: number = 100,
      offset: number = 0
    ) => {
      const res = await getChatRooms({ chatRoomsSlug, limit, offset });
      setChatMessagesToStore(res.data.results);
      return res.data;
    },
    {
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
    targetRef: fetchMoreButtonRef,
    rootRef: rootRef,
    onIntersect,
    threshold: 0.5,
    rootMargin: '16px',
    enabled: !!canFetchMore,
  });

  return (
    <div ref={rootRef} className={classes.sidebar}>
      {status === 'loading' ? (
        times(5).map(() => (
          <Box key={v1()} px={2} py={1}>
            <MessageSkeleton />
          </Box>
        ))
      ) : status === 'error' ? (
        <ChatRoomsError {...{ error, refetch }} />
      ) : (
        <ChatRoomsList />
      )}
      {isFetchingMore ? (
        <Box
          px={2}
          py={1}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Spinner size={24} noText />
        </Box>
      ) : canFetchMore ? (
        <Button
          ref={fetchMoreButtonRef}
          disabled={isFetchingMore}
          onClick={() => fetchMore()}
        >
          {isFetchingMore ? 'Loading...' : 'Load more'}
        </Button>
      ) : null}
    </div>
  );
}
