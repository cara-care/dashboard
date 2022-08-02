import { Divider, Typography } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { useHistory, useParams } from 'react-router-dom';

import Spinner from '../../components/Spinner';
import useIntersectionObserver from '../hooks/useIntersectionObserver';

import { InboxContext } from '../InboxContext';
import * as interfaces from '../interfaces';

import InboxItem from './InboxItem';

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

const Inbox = function () {
  const classes = useStyles();

  const rootRef = React.useRef<HTMLDivElement>(null);
  const loadMoreButtonRef = React.useRef<HTMLDivElement>(null);

  const history = useHistory();
  const { inboxSlug, roomId } = useParams();

  // the inbox selected from the sidebar to the very left
  const { loadedSlug, inboxItems, loadMoreInboxItems } = React.useContext(
    InboxContext
  );

  // whether we are awaiting Kabelwerk's loadMore() function
  const [isLoadingMore, setIsLoadingMore] = React.useState(false);

  // whether we have reached the bottom of the room list
  const [canLoadMore, setCanLoadMore] = React.useState(true);

  React.useEffect(() => {
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

  // open the first room if there is no room ID specified in the URL and the
  // inbox is not empty
  React.useEffect(() => {
    if (loadedSlug === inboxSlug && roomId === undefined && inboxItems.length) {
      const id = inboxItems[0].room.id;
      history.push(`/nutri/inbox/${inboxSlug}/${id}`);
    }
  }, [history, inboxSlug, roomId, loadedSlug, inboxItems]);

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
        inboxItems.map((item: interfaces.InboxItem) => {
          return <InboxItem key={item.room.id} inboxItem={item} />;
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
};

export default Inbox;
