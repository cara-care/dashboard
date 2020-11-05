import React from 'react';
import { Resizable, ResizeCallback } from 're-resizable';
import { useQueryCache } from 'react-query';
import useWebSocket from 'react-use-websocket';
import { useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import NutriNavigation from '../../components/NutriNavigation';
import Chat from '../components/Chat';
import ChatRooms from '../components/ChatRooms';

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
}));

export default function Inbox() {
  const classes = useStyles();
  const didUnmount = React.useRef(false);
  const queryCache = useQueryCache();
  const { userId, username } = useParams();
  // TODO: figure out how to handle this in prod (CORS + SameSite cookies) :(
  // Netlify doesn't support websocket proxying:
  // https://community.netlify.com/t/does-netlify-support-websocket-proxying/11230/4
  const { lastMessage, sendJsonMessage } = useWebSocket(
    'wss://localhost:3000/api/ws/dashboard/',
    {
      shouldReconnect: (_closeEvent) => {
        // reconnect if not unmounted
        return didUnmount.current === false;
      },
    }
  );

  const [width, setWidth] = React.useState(320);

  const handleResizeStop: ResizeCallback = (_e, _direction, _ref, d) => {
    // FIXME: causes <Chat /> to scroll to bottom
    setWidth(width + d.width);
  };

  const sendMessage = React.useCallback(
    (message: string) => {
      sendJsonMessage({
        type: 'message',
        text: message,
        room: username,
        sent: new Date().toISOString(),
      });
    },
    [username, sendJsonMessage]
  );

  React.useEffect(() => {
    return () => {
      didUnmount.current = true;
    };
  }, []);

  React.useEffect(() => {
    if (lastMessage) {
      const msg = JSON.parse(lastMessage.data);
      // FIXME: optimistically update chat rooms?
      // E.g.: Go through all the rooms and check if the room in cache + move it if necessary?
      queryCache.refetchQueries('chatRooms');

      // TODO: UPDATE MESSAGES
      // queryCache.cancelQueries(`messages-${msg.room}`);
      // const previousValue = queryCache.getQueryData(`messages-${msg.room}`);
      // console.log(previousValue);
      // queryCache.setQueryData(`messages-${msg.room}`, (old) => ({
      //   ...old,
      // }));
      if (msg.room === username) {
        queryCache.refetchQueries(`messages-${msg.room}`);
      }
    }
  }, [queryCache, lastMessage, username]);

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
          <ChatRooms />
        </Resizable>
        <div className={classes.main}>
          {userId && (
            <Chat
              userId={userId}
              username={username}
              onSendMessage={sendMessage}
            />
          )}
        </div>
      </div>
    </>
  );
}
