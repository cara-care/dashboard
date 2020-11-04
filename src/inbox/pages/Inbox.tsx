import React from 'react';
import { Resizable, ResizeCallback } from 're-resizable';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'classnames';
import times from 'lodash/times';
import NutriNavigation from '../../components/NutriNavigation';
import MessagePreview from '../components/MessagePreview';
import Message from '../components/Message';
import MessageSkeleton from '../components/MessageSkeleton';
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
    flexDirection: 'column',
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

const sleep = (ms: number) =>
  new Promise<{ data: never[] }>((r) => setTimeout(() => r({ data: [] }), ms));

export default function Inbox() {
  const classes = useStyles();
  const socketRef = React.useRef<WebSocket | null>(null);
  const [width, setWidth] = React.useState(320);
  // @ts-ignore
  const [userId, _] = React.useState(598765); // eslint-disable-line @typescript-eslint/no-unused-vars
  const [isFetching, setIsFetching] = React.useState(false);
  const [messages, setMessages] = React.useState<any[]>([]);

  const handleResizeStop: ResizeCallback = (_e, _direction, _ref, d) => {
    setWidth(width + d.width);
  };

  const fetchMessages = React.useCallback(async (id: number) => {
    try {
      setIsFetching(true);
      const res = await sleep(2500);
      setMessages(res.data);
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
        room: 'u-0AS13EOKO5PZLVKV',
        sent: new Date().toISOString(),
      })
    );
  };

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
      setMessages((m) => m.concat(data));
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
                  // TODO: figure out how to decide if the message should be left or right
                  position="right"
                  message={message.text}
                  sent={message.sent}
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
