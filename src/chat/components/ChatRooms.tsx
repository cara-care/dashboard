import React, { useRef } from 'react';
import { useInfiniteQuery } from 'react-query';
import { FormattedMessage } from 'react-intl';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import times from 'lodash/times';
import { v1 } from 'uuid';
import useIntersectionObserver from '../hooks/useIntersectionObserver';
import Spinner from '../../components/Spinner';
import MessageSkeleton from './MessageSkeleton';
import ChatRoom from './ChatRoom';
import getParams from '../../utils/getParams';
import { getChatRooms } from '../../utils/api';

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
  const rootRef = useRef<HTMLDivElement>(null);
  const fetchMoreButtonRef = useRef<HTMLButtonElement>(null);
  const {
    status,
    data,
    error,
    isFetchingMore,
    refetch,
    fetchMore,
    canFetchMore,
  } = useInfiniteQuery(
    'chatRooms',
    async (_key, url = '?limit=100&offset=0') => {
      // FIXME: typings
      // @ts-ignore
      const { limit, offset } = getParams(url);
      const res = await getChatRooms({ limit, offset });
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
      ) : (
        data?.map((page, i) => (
          <React.Fragment key={i}>
            {page.results.map((room: any) => (
              <ChatRoom
                key={v1()}
                userId={room.patient.id}
                username={room.patient.username}
                nickname={room.patient.nickname}
                message={room.lastMessage.text}
                sent={room.lastMessage.created}
              />
            ))}
          </React.Fragment>
        ))
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
