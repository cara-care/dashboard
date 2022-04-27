import { Divider, Typography } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import React, { useEffect, useRef, useState } from 'react';
import Spinner from '../../../components/Spinner';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';
import { InboxItem } from '../../interfaces';
import { KabelwerkContext } from '../../KabelwerkContext';
import ChatRoomItem from './ChatRoomItem';

const useStyles = makeStyles((theme) => ({
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
  emptyInboxMessage: {
    textAlign: 'center',
    color: theme.palette.primary.main,
  },
}));

export default function ChatRooms() {
  const classes = useStyles();

  const rootRef = useRef<HTMLDivElement>(null);
  const loadMoreButtonRef = useRef<HTMLDivElement>(null);

  // the inbox selected from the sidebar to the very left
  const { inboxItems, loadMoreInboxItems } = React.useContext(KabelwerkContext);

  // whether we are awaiting Kabelwerk's loadMore() function
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  // whether we have reached the bottom of the room list
  const [canLoadMore, setCanLoadMore] = useState(true);

  useEffect(() => {
    setIsLoadingMore(false);
    setCanLoadMore(true);
  }, [inboxItems]);

  const handleIntersect = function () {
    setIsLoadingMore(true);
    loadMoreInboxItems().then((hasMore) => {
      setIsLoadingMore(false);
      setCanLoadMore(hasMore);
    });
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
        {/* <Typography variant="h6">
          {currentInboxType !== null
            ? INBOXES[currentInboxType].name
            : 'Loading…'}
        </Typography> */}
        <Typography variant="subtitle1"></Typography>
      </Box>
      <Divider />
      {inboxItems.length === 0 ? (
        <p className={classes.emptyInboxMessage}>this inbox is empty</p>
      ) : (
        inboxItems.map((item: InboxItem) => {
          return <ChatRoomItem key={item.room.id} inboxItem={item} />;
        })
      )}
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
      ) : (
        <div ref={loadMoreButtonRef} />
      )}
    </div>
  );
}
