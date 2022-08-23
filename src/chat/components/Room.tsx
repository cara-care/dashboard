import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import React, { useEffect, useRef, useState } from 'react';

import Spinner from '../../components/Spinner';
import { RoomContext } from '../contexts/RoomContext';
import useIntersectionObserver from '../hooks/useIntersectionObserver';

import InputToolbar from './InputToolbar';
import MessagesList from './MessagesList';

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

const Room = function () {
  const classes = useStyles();

  const messagesRootRef = useRef<HTMLDivElement>(null);
  const messagesTopRef = useRef<HTMLDivElement>(null);

  // the inbox item selected from the list to the left
  const { isReady, loadEarlierMessages, postMessage } = React.useContext(
    RoomContext
  );

  // whether we are awaiting Kabelwerk's loadEarlier() function
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  // whether we have reached the earliest message in the room
  const [canLoadMore, setCanLoadMore] = useState(true);

  useEffect(() => {
    setIsLoadingMore(false);
    setCanLoadMore(true);
  }, [isReady]);

  const handleIntersect = function () {
    if (isReady && !isLoadingMore && canLoadMore) {
      setIsLoadingMore(true);
      loadEarlierMessages()
        .then((hasNewMessages: boolean) => {
          if (!hasNewMessages) {
            setCanLoadMore(false);
          }
          setIsLoadingMore(false);
        })
        .catch(() => {
          setIsLoadingMore(false);
        });
    }
  };

  useIntersectionObserver({
    targetRef: messagesTopRef,
    rootRef: messagesRootRef,
    onIntersect: handleIntersect,
    threshold: 0.5,
    rootMargin: '20px',
    enabled: canLoadMore,
  });

  return (
    <>
      <div ref={messagesRootRef} className={classes.messages}>
        {isReady && <MessagesList />}
        <div ref={messagesTopRef} className={classes.top} />
        {isLoadingMore && (
          <Box display="flex" alignItems="center" justifyContent="center" p={1}>
            <Spinner size={24} noText />
          </Box>
        )}
      </div>
      {isReady && <InputToolbar postMessage={postMessage} />}
    </>
  );
};

export default Room;
