import React, { useEffect, useRef, useState } from 'react';
import Kabelwerk from 'kabelwerk';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';
import Spinner from '../../../components/Spinner';
import ChatRoomsList from './ChatRoomsList';
import { useDispatch, useSelector } from 'react-redux';
import { getInbox, updateInboxRooms } from '../../redux';
import { Divider, Typography } from '@material-ui/core';


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
      return;  // do nothing if no inbox is selected yet
    }

    let kabel;
    try {
      kabel = Kabelwerk.getKabel();
    } catch (error) {
      return;  // do nothing if the websocket is not connected yet
    }

    let params = {limit: 20};
    switch (selectedInbox.slug) {
      case 'personal':
        params['assignedTo'] = kabel.getUser().id;
        break;

      case 'DE:free':
        params['attributes'] = {country: 'DE', is_premium: false};
        break;

      case 'DE:premium':
        params['attributes'] = {country: 'DE', is_premium: true};
        break;

      case 'UK:free':
        params['attributes'] = {country: 'UK', is_premium: false};
        break;

      case 'UK:premium':
        params['attributes'] = {country: 'UK', is_premium: true};
        break;

      case 'pilot_study':
        params['attributes'] = {in_anwendertest_ibs: true};
        break;

      case '_':
        params['attributes'] = {country: ''};
        break;

      case 'all':
      default:
        break;
    }

    if (inboxRef.current) {
      inboxRef.current.off();  // clear the previously attached event listeners
      inboxRef.current = null;
    }

    inboxRef.current = kabel.openInbox(params);

    inboxRef.current.on('ready', (rooms: any[]) => {
      dispatch(updateInboxRooms(rooms));
    });

    inboxRef.current.on('updated', (rooms: any[]) => {
      dispatch(updateInboxRooms(rooms));
    });

    // reset the load more flags
    setIsLoadingMore(false);
    setCanLoadMore(true);
  }, [
    dispatch,
    selectedInbox,
  ]);

  const handleIntersect = function() {
    if (inboxRef.current && !isLoadingMore && canLoadMore) {
      setIsLoadingMore(true);
      inboxRef.current.loadMore().then((rooms: any[]) => {
        if (rooms.length) {
          dispatch(updateInboxRooms(rooms));
        } else {
          setCanLoadMore(false);
        }
        setIsLoadingMore(false);
      }).catch((error: any) => {
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
          {selectedInbox ? selectedInbox.name : 'Loading…'}
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
        <Button
          ref={loadMoreButtonRef}
          disabled={true}
        >
          {isLoadingMore ? 'Loading...' : 'Load more'}
        </Button>
      ) : null}
    </div>
  );
}
