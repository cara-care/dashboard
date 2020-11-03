import React from 'react';
import { Resizable, ResizeCallback } from 're-resizable';
import { makeStyles } from '@material-ui/core/styles';
import NutriNavigation from '../../components/NutriNavigation';
import MessagePreview from '../components/MessagePreview';
import Message from '../components/Message';
import InputToolbar from '../components/InputToolbar';

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
}));

export default function Inbox() {
  const classes = useStyles();
  const socketRef = React.useRef<WebSocket | null>(null);
  const [width, setWidth] = React.useState(320);

  const handleResizeStop: ResizeCallback = (_e, _direction, _ref, d) => {
    setWidth(width + d.width);
  };

  React.useEffect(() => {
    const socket = new WebSocket('wss://localhost:3000/api/ws/dashboard/');

    socket.onmessage = (e) => {
      const data = JSON.parse(e.data);
      console.log(data);
    };

    socketRef.current = socket;

    return () => {
      socket.close();
    };
  }, []);

  const sendMessage = () => {
    socketRef.current?.send(
      JSON.stringify({
        type: 'message',
        text: 'hi!',
        room: 'u-0AS13EOKO5PZLVKV',
        sent: new Date().toISOString(),
      })
    );
  };

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
            <MessagePreview isActive />
            <MessagePreview />
            <MessagePreview />
            <MessagePreview />
            <MessagePreview />
            <MessagePreview />
            <MessagePreview />
            <MessagePreview />
            <MessagePreview />
            <MessagePreview />
            <MessagePreview />
            <MessagePreview />
            <MessagePreview />
            <MessagePreview />
            <MessagePreview />
            <MessagePreview />
          </div>
        </Resizable>
        <div className={classes.main}>
          <div className={classes.messages}>
            <Message
              position="right"
              message="Hi Benjamin, my name is Alina and I'm your personal dietitian here at Cara Care 😊 I'm glad that you’ve signed up for the IBS program. Which symptoms are you struggling with the most?"
            />
            <Message message="Hi Alina! I mostly struggle with pain and diarrhea." />
          </div>
          <button onClick={sendMessage}>Sent test</button>
          <InputToolbar />
        </div>
      </div>
    </>
  );
}
