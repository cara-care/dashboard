import React, { useCallback, useEffect, useRef } from 'react';
import { Channel, Socket } from 'phoenix';
import { Resizable, ResizeCallback } from 're-resizable';
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
import { getChatAuthorizationToken } from '../../utils/api';

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
  const dispatch = useDispatch();
  const currentUser = useSelector(currentUserSelector);

  const socket = useRef<Socket | null>(null);
  const channel = useRef<Channel | null>(null);

  useEffect(() => {
    const establishSocketConnection = async () => {
      try {
        const res = await getChatAuthorizationToken();
        const ws = new Socket('wss://localhost:3000/api/mercury/socket', {
          params: { token: res.data.token },
        });
        socket.current = ws;
        ws.connect();
        ws.onOpen(() => {
          console.info('The socket was opened');
          const nutriChannel = ws.channel('nutris:all');
          channel.current = nutriChannel;
          nutriChannel.join().receive('ok', () => {
            console.log('Joined to Channel');
          });
          nutriChannel.on('message', (message) => {
            dispatch(addChatMessage(message));
            dispatch(addNewMessageToChatRoomInit(message));
          });
        });
      } catch (error) {
        console.log(error);
      }
    };
    establishSocketConnection();

    return () => {
      socket.current?.disconnect(() => {
        console.info('The socket was closed');
      });
    };
  }, [dispatch]);

  const [width, setWidth] = React.useState(320);

  const handleResizeStop: ResizeCallback = (_e, _direction, _ref, d) => {
    // FIXME: causes <Chat /> to scroll to bottom
    setWidth(width + d.width);
  };

  const sendMessage = useCallback(
    (message: string) => {
      channel.current?.push('message', {
        type: 'message',
        room: currentUser?.username,
        text: message,
        sent: new Date().toISOString(),
      });
    },
    [currentUser]
  );

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
