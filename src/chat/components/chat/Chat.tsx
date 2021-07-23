import React, { useEffect, useRef, useState } from 'react';
import Kabelwerk from 'kabelwerk';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import InputToolbar from './InputToolbar';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';
import Spinner from '../../../components/Spinner';
import ChatMessagesList from './ChatMessagesList';
import { useDispatch, useSelector } from 'react-redux';
import { Message, getRoom, updateMessages } from '../../redux';


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


export default function Chat() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const messagesRootRef = useRef<HTMLDivElement>(null);
  const messagesTopRef = useRef<HTMLDivElement>(null);

  // the inbox item selected from the list to the left
  const selectedRoom = useSelector(getRoom);

  // Kabelwerk's room object
  const roomRef = useRef<any>(null);

  // whether we are awaiting Kabelwerk's loadEarlier() function
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  // whether we have reached the earliest message in the room
  const [canLoadMore, setCanLoadMore] = useState(true);

  useEffect(() => {
    // do nothing if no room is selected yet
    if (!selectedRoom) return;

    // if we have selected a room, we have a connection
    let kabel = Kabelwerk.getKabel();

    // clear the previous room object, if such
    if (roomRef.current) {
      roomRef.current.off();
      roomRef.current = null;
    }

    // init the new room object
    roomRef.current = kabel.openRoom(selectedRoom.id);

    roomRef.current.on('ready', (messages: Message[]) => {
      dispatch(updateMessages(messages));
    });

    roomRef.current.on('message_posted', (message: Message) => {
      dispatch(updateMessages([message], 'append'));
    });

    // reset the load more flags
    setIsLoadingMore(false);
    setCanLoadMore(true);
  }, [
    dispatch,
    selectedRoom,
  ]);

  const postMessage = function(text: string) {
    if (roomRef.current) {
      // the message_posted hook above takes care of displaying it
      roomRef.current.postMessage({ text }).catch((error: any) => {
        console.error(error);
      });
    }
  };

  const handleIntersect = function() {
    if (roomRef.current && !isLoadingMore && canLoadMore) {
      setIsLoadingMore(true);
      roomRef.current.loadEarlier().then((messages: Message[]) => {
        if (messages.length) {
          dispatch(updateMessages(messages, 'prepend'));
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
        <ChatMessagesList />
        <div ref={messagesTopRef} className={classes.top} />
        {isLoadingMore && (
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
      {selectedRoom && <InputToolbar onSubmit={postMessage} />}
    </>
  );
};
