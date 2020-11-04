import React from 'react';
import { Resizable, ResizeCallback } from 're-resizable';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'classnames';
import times from 'lodash/times';
import { v1 } from 'uuid';
import NutriNavigation from '../../components/NutriNavigation';
import MessagePreview from '../components/MessagePreview';
import Message from '../components/Message';
import MessageSkeleton from '../components/MessageSkeleton';
import InputToolbar from '../components/InputToolbar';
import { getChatRooms, getChatRoomsStatus, RoomsStatues } from '../chatReducer';
import { fetchChatRoomsPageInit } from '../chatActions';
import { getMessages } from '../../utils/api';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'nowrap',
    width: '100vw',
    height: `calc(100vh - 68px - 64px)`, // 100vh - nutri navigation height - appbar height
  },
  resize: {
    display: 'flex',
    borderRight: '2px solid #d8eceb',
  },
  sidebar: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    overflowY: 'scroll',
  },
  main: {
    flex: '1 1 auto',
    display: 'flex',
    flexDirection: 'column',
  },
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
}));

function getMessagePosition(username: string) {
  // app username starts with u- or auto-
  return /^(u-|auto-).*/i.test(username) ? 'left' : 'right';
}

export default function Inbox() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { userId, username } = useParams();
  const roomsStatus = useSelector(getChatRoomsStatus);
  const rooms = useSelector(getChatRooms);
  const socketRef = React.useRef<WebSocket | null>(null);
  const [width, setWidth] = React.useState(320);
  const [isFetching, setIsFetching] = React.useState(false);
  const [messages, setMessages] = React.useState<any[]>([]);

  const handleResizeStop: ResizeCallback = (_e, _direction, _ref, d) => {
    setWidth(width + d.width);
  };

  const fetchChatRooms = React.useCallback(() => {
    // TODO: FETCH CHAT ROOM PAGES DYNAMICALLY
    dispatch(fetchChatRoomsPageInit(0));
  }, [dispatch]);

  const fetchMessages = React.useCallback(async (id: number | string) => {
    try {
      setIsFetching(true);
      const res = await getMessages(id);
      console.log(res.data.results);
      setMessages(res.data.results);
    } catch {
    } finally {
      setIsFetching(false);
    }
  }, []);

  const sendMessage = (message: string) => {
    socketRef.current?.send(
      JSON.stringify({
        type: 'message',
        text: message,
        room: username, // TODO: CHECK IF EXISTS
        sent: new Date().toISOString(),
      })
    );
  };

  React.useEffect(() => {
    fetchChatRooms();
  }, [fetchChatRooms]);

  React.useEffect(() => {
    if (userId) {
      fetchMessages(userId);
    }
  }, [userId, fetchMessages]);

  React.useEffect(() => {
    // TODO: figure out how to handle this in prod (CORS + SameSite cookies) :(
    // Netlify doesn't support websocket proxying:
    // https://community.netlify.com/t/does-netlify-support-websocket-proxying/11230/4
    const socket = new WebSocket('wss://localhost:3000/api/ws/dashboard/');
    socketRef.current = socket;
    socket.onmessage = (e) => {
      const data = JSON.parse(e.data);
      setMessages((m) => [data, ...m]);
    };

    return () => {
      socket.close();
    };
  }, []);

  return (
    <>
      <NutriNavigation />
      <div className={classes.root}>
        <Resizable
          className={classes.resize}
          enable={{ right: true }}
          size={{ width, height: '100%' }}
          minWidth={180}
          maxWidth={600}
          onResizeStop={handleResizeStop}
        >
          <div className={classes.sidebar}>
            {rooms.map((room) => (
              <MessagePreview
                key={v1()}
                userId={room.patient.id}
                username={room.patient.username}
                nickname={room.patient.nickname}
                message={room.lastMessage.text}
                sent={room.lastMessage.sent}
              />
            ))}
            {roomsStatus === RoomsStatues.FETCHING ? (
              times(5).map(() => (
                <Box key={v1()} px={2} py={1}>
                  <MessageSkeleton />
                </Box>
              ))
            ) : roomsStatus === RoomsStatues.ERROR ? (
              <Button
                variant="contained"
                color="primary"
                onClick={fetchChatRooms}
              >
                Retry
              </Button>
            ) : null}
          </div>
        </Resizable>
        <div className={classes.main}>
          {isFetching ? (
            <div className={clsx(classes.messages, classes.noScroll)}>
              {times(5).map((n) => (
                <MessageSkeleton key={n} />
              ))}
            </div>
          ) : // TODO: HANDLE ERROR
          messages.length ? (
            <div className={classes.messages}>
              {messages.map((message) => (
                <Message
                  key={message.id}
                  position={
                    username
                      ? username === message.author
                        ? 'left'
                        : 'right'
                      : getMessagePosition(message.author)
                  }
                  message={message.text}
                  created={message.created}
                />
              ))}
            </div>
          ) : (
            <div className={classes.center}>
              <Typography>No messages here yet...</Typography>
            </div>
          )}
          <InputToolbar onSubmit={sendMessage} />
        </div>
      </div>
    </>
  );
}
