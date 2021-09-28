import { Divider, Typography } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Kabelwerk from 'kabelwerk';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../../../components/Spinner';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';
import { INBOXES } from '../../inboxes';
import {
  getInbox,
  Inbox as InboxType,
  InboxRoom,
  updateInboxRooms,
} from '../../redux';
import ChatRoomsList from './ChatRoomsList';

const useStyles = makeStyles((_theme) => ({
  sidebar: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    overflowY: 'scroll',
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
  const selectedInbox = useSelector(getInbox);

  // Kabelwerk's inbox object
  const inboxRef = useRef<any>(null);

  // whether we are awaiting Kabelwerk's loadMore() function
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  // whether we have reached the bottom of the room list
  const [canLoadMore, setCanLoadMore] = useState(true);

  useEffect(() => {
    if (!selectedInbox) {
      return; // do nothing if no inbox is selected yet
    }

    if (!Kabelwerk.isConnected()) {
      return; // do nothing if the websocket is not connected yet
    }

    const params = { limit: 20 };

    switch (selectedInbox) {
      case InboxType.PERSONAL:
        params['assignedTo'] = Kabelwerk.getUser().id;
        break;

      case InboxType.ANWENDERTEST_HB:
        params['attributes'] = { in_anwendertest_hb: true };
        break;

      case InboxType.ANWENDERTEST_IBD:
        params['attributes'] = { in_anwendertest_ibd: true };
        break;

      case InboxType.ANWENDERTEST_IBS:
        params['attributes'] = { in_anwendertest_ibs: true };
        break;

      case InboxType.RCT_IBS:
        params['attributes'] = { in_rct_ibs: true };
        break;

      case InboxType.NO_STUDY:
        params['attributes'] = {
          in_anwendertest_hb: false,
          in_anwendertest_ibd: false,
          in_anwendertest_ibs: false,
          in_rct_ibs: false,
        };
        break;

      case InboxType.ALL:
      default:
        break;
    }

    if (inboxRef.current) {
      inboxRef.current.off(); // clear the previously attached event listeners
      inboxRef.current = null;
    }

    inboxRef.current = Kabelwerk.openInbox(params);

    inboxRef.current.on('ready', ({ rooms }: { rooms: InboxRoom[] }) => {
      dispatch(updateInboxRooms(rooms));
    });

    inboxRef.current.on('updated', ({ rooms }: { rooms: InboxRoom[] }) => {
      dispatch(updateInboxRooms(rooms));
    });

    inboxRef.current.connect();

    // reset the load more flags
    setIsLoadingMore(false);
    setCanLoadMore(true);
  }, [dispatch, selectedInbox]);

  const handleIntersect = function () {
    if (inboxRef.current && !isLoadingMore && canLoadMore) {
      setIsLoadingMore(true);
      inboxRef.current
        .loadMore()
        .then(({ rooms }: { rooms: InboxRoom[] }) => {
          if (rooms.length) {
            dispatch(updateInboxRooms(rooms));
          } else {
            setCanLoadMore(false);
          }
          setIsLoadingMore(false);
        })
        .catch((error: any) => {
          console.error(error);
          setIsLoadingMore(false);
        });
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
          {selectedInbox !== null ? INBOXES[selectedInbox].name : 'Loading…'}
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
