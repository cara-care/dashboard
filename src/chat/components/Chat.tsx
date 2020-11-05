import React from 'react';
import { useInfiniteQuery } from 'react-query';
import { FormattedMessage } from 'react-intl';
import clsx from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import times from 'lodash/times';
import MessageSkeleton from './MessageSkeleton';
import Message from './Message';
import InputToolbar from './InputToolbar';
import useIntersectionObserver from '../hooks/useIntersectionObserver';
import Spinner from '../../components/Spinner';
import { getMessages } from '../../utils/api';
import getParams from '../../utils/getParams';

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
  username?: string;
  userId: string | number;
  onSendMessage: (message: string) => void;
}

function getMessagePosition(username: string) {
  // app username starts with u- or auto-
  return /^(u-|auto-).*/i.test(username) ? 'left' : 'right';
}

export default React.memo(function Chat({
  userId,
  username,
  onSendMessage,
}: ChatProps) {
  const classes = useStyles();
  const messagesRootRef = React.useRef<HTMLDivElement>(null);
  const messagesTopRef = React.useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesRootRef.current!.scrollTop = messagesRootRef.current!.scrollHeight;
  };

  const handleSendMessage = (message: string) => {
    // FIXME: WAIT FOR THE MESSAGE FROM A WEBSOCKET FRAME
    scrollToBottom();
    onSendMessage(message);
  };

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
      return res.data;
    },
    {
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
    rootMargin: '16px',
    enabled: !!canFetchMore,
  });

  return (
    <>
      {status === 'loading' ? (
        <div className={clsx(classes.messages, classes.noScroll)}>
          {times(5).map((n) => (
            <MessageSkeleton key={n} />
          ))}
        </div>
      ) : status === 'error' ? (
        <div className={classes.center}>
          <Alert
            severity="error"
            action={
              <Button color="inherit" size="small" onClick={() => refetch}>
                Retry
              </Button>
            }
          >
            <AlertTitle>
              <FormattedMessage id="common.error" defaultMessage="Error" />
            </AlertTitle>
            {error.response
              ? error.response.data
              : error.request
              ? error.request?.response
              : error.message}
          </Alert>
        </div>
      ) : data?.length ? (
        <div ref={messagesRootRef} className={classes.messages}>
          {data.map((page, i) => (
            <React.Fragment key={i}>
              {page.results.map((message: any) => (
                <Message
                  key={message.id}
                  position={getMessagePosition(message.author)}
                  message={message.text}
                  created={message.created}
                />
              ))}
            </React.Fragment>
          ))}
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
      {username && <InputToolbar onSubmit={handleSendMessage} />}
    </>
  );
});
