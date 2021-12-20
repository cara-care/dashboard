import { Divider, Typography } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import Spinner from '../../../components/Spinner';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';
import { INBOXES } from '../../inboxes';
import { KabelwerkContext } from '../../KabelwerkContext';
import ChatRoomsList from './ChatRoomsList';

const useStyles = makeStyles((_theme) => ({
  sidebar: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    overflowY: 'auto',
  },
  headerBox: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '24px 16px',
  },
  divider: {},
}));

export default function ChatRooms() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const rootRef = useRef<HTMLDivElement>(null);
  const loadMoreButtonRef = useRef<HTMLButtonElement>(null);

  // the inbox selected from the sidebar to the very left
  const { currentInboxType, loadMoreInboxItems } = React.useContext(
    KabelwerkContext
  );

  // whether we are awaiting Kabelwerk's loadMore() function
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  // whether we have reached the bottom of the room list
  const [canLoadMore, setCanLoadMore] = useState(true);

  useEffect(() => {
    // reset the load more flags
    setIsLoadingMore(false);
    setCanLoadMore(true);
  }, [dispatch, currentInboxType]);

  const handleIntersect = function () {
    if (!isLoadingMore && canLoadMore) {
      loadMoreInboxItems();
    }
  };

  useIntersectionObserver({
    targetRef: loadMoreButtonRef,
    rootRef: rootRef,
    onIntersect: handleIntersect,
    threshold: 0.5,
    rootMargin: '16px',
    enabled: canLoadMore,
  });

  return (
    <div ref={rootRef} className={classes.sidebar}>
      <Box className={classes.headerBox}>
        <Typography variant="h6">
          {currentInboxType !== null
            ? INBOXES[currentInboxType].name
            : 'Loading…'}
        </Typography>
        <Typography variant="subtitle1"></Typography>
      </Box>
      <Divider className={classes.divider} />
      <ChatRoomsList />
      {isLoadingMore ? (
        <Box
          px={2}
          py={1}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Spinner size={24} noText />
        </Box>
      ) : canLoadMore ? (
        <Button ref={loadMoreButtonRef} disabled={true}>
          {isLoadingMore ? 'Loading...' : 'Load more'}
        </Button>
      ) : null}
    </div>
  );
}
