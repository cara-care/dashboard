import React, { useEffect, useCallback } from 'react';
import { Resizable, ResizeCallback } from 're-resizable';
import useWebSocket from 'react-use-websocket';
import { makeStyles } from '@material-ui/core/styles';
import NutriNavigation from '../../components/NutriNavigation';
import Chat from '../components/Chat';
import ChatRooms from '../components/ChatRooms';
import ChatDetails from '../components/ChatDetails';
import {
  addChatMessage,
  addNewMessageToChatRoomInit,
  currentUserSelector,
} from '../redux';
import { useDispatch, useSelector } from 'react-redux';
import ChatHeader from '../components/ChatHeader';
import InboxSidebar from '../components/InboxSidebar';

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

    //
    position: 'relative',
  },
  details: {
    display: 'flex',
    flex: '0 0 300px',
    marginLeft: 'auto',
  },
  inboxSidebar: {
    display: 'flex',
    flex: '0 0 300px',
  },
}));

export default function Inbox() {
  const classes = useStyles();
  const didUnmount = React.useRef(false);
  const dispatch = useDispatch();
  // const queryCache = useQueryCache();

  const currentUser = useSelector(currentUserSelector);

  // TODO: figure out how to handle this in prod (CORS + SameSite cookies) :(
  // Netlify doesn't support websocket proxying:
  // https://community.netlify.com/t/does-netlify-support-websocket-proxying/11230/4
  const { sendJsonMessage } = useWebSocket(
    'wss://localhost:3000/api/ws/dashboard/',
    {
      shouldReconnect: (_closeEvent) => {
        // reconnect if not unmounted
        return didUnmount.current === false;
      },
      onMessage: (event: WebSocketEventMap['message']) => {
        const message = JSON.parse(event.data);
        dispatch(addChatMessage(message));
        dispatch(addNewMessageToChatRoomInit(message));
      },
    }
  );

  const [width, setWidth] = React.useState(320);

  const handleResizeStop: ResizeCallback = (_e, _direction, _ref, d) => {
    // FIXME: causes <Chat /> to scroll to bottom
    setWidth(width + d.width);
  };

  const sendMessage = useCallback(
    (message: string) => {
      sendJsonMessage({
        type: 'message',
        text: message,
        room: currentUser?.username,
        sent: new Date().toISOString(),
      });
    },
    [currentUser, sendJsonMessage]
  );

  useEffect(() => {
    return () => {
      didUnmount.current = true;
    };
  }, []);

  return (
    <>
      <NutriNavigation />
      <div className={classes.root}>
        <div className={classes.inboxSidebar}>
          <InboxSidebar />
        </div>
        <Resizable
          className={classes.resize}
          enable={{ right: true }}
          size={{ width, height: '100%' }}
          minWidth={180}
          maxWidth={400}
          onResizeStop={handleResizeStop}
        >
          <ChatRooms />
        </Resizable>

        {currentUser && (
          <div className={classes.main}>
            <ChatHeader user={currentUser} />
            <Chat user={currentUser} onSendMessage={sendMessage} />
          </div>
        )}
        <div className={classes.details}>
          <ChatDetails />
        </div>
      </div>
    </>
  );
}
