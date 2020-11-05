import React from 'react';
import { Resizable, ResizeCallback } from 're-resizable';
import { useInfiniteQuery, useQueryCache } from 'react-query';
import { useParams } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'classnames';
import times from 'lodash/times';
import { v1 } from 'uuid';
import NutriNavigation from '../../components/NutriNavigation';
import Message from '../components/Message';
import MessageSkeleton from '../components/MessageSkeleton';
import InputToolbar from '../components/InputToolbar';
import MessagePreview from '../components/MessagePreview';
import Spinner from '../../components/Spinner';
import { getChatRooms, getMessages } from '../../utils/api';
import getParams from '../../utils/getParams';

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
  const { userId, username } = useParams();
  const queryCache = useQueryCache();
  const {
    status,
    data,
    error,
    // isFetching,
    isFetchingMore,
    refetch,
    fetchMore,
    canFetchMore,
  } = useInfiniteQuery(
    'chatRooms',
    async (_key, url = '?limit=1&offset=0') => {
      // FIXME: typings
      // @ts-ignore
      const { limit, offset } = getParams(url);
      const res = await getChatRooms({ limit, offset });
      return res.data;
    },
    {
      refetchOnWindowFocus: false,
      getFetchMore: (lastPage) => (lastPage.next ? lastPage.next : null),
    }
  );
  const socketRef = React.useRef<WebSocket | null>(null);
  const [width, setWidth] = React.useState(320);
  const [isFetchingMessages, setIsFetchingMessages] = React.useState(false);
  const [messages, setMessages] = React.useState<any[]>([]);

  const refetchChatRooms = () => {
    refetch();
  };

  const handleResizeStop: ResizeCallback = (_e, _direction, _ref, d) => {
    setWidth(width + d.width);
  };

  const fetchMessages = React.useCallback(async (id: number | string) => {
    try {
      setIsFetchingMessages(true);
      const res = await getMessages(id);
      console.log(res.data.results);
      setMessages(res.data.results);
    } catch {
    } finally {
      setIsFetchingMessages(false);
    }
  }, []);

  const sendMessage = (message: string) => {
    socketRef.current?.send(
      JSON.stringify({
        type: 'message',
        text: message,
        room: username,
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
      const msg = JSON.parse(e.data);
      // TODO:
      // go through all the rooms and check if the room is in cache, if yes re-fetch all queries
      console.log(msg);
      queryCache.refetchQueries('chatRooms');
      if (msg.room === username) {
        setMessages((m) => [msg, ...m]);
      }
    };

    return () => {
      socket.close();
    };
  }, [queryCache, username]);

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
            {status === 'loading' ? (
              times(5).map(() => (
                <Box key={v1()} px={2} py={1}>
                  <MessageSkeleton />
                </Box>
              ))
            ) : status === 'error' ? (
              <Alert
                severity="error"
                action={
                  <Button
                    color="inherit"
                    size="small"
                    onClick={refetchChatRooms}
                  >
                    Retry
                  </Button>
                }
              >
                <AlertTitle>Error</AlertTitle>
                {error.response
                  ? error.response.data
                  : error.request
                  ? error.request?.response
                  : error.message}
              </Alert>
            ) : (
              data?.map((page, i) => (
                <React.Fragment key={i}>
                  {page.results.map((room: any) => (
                    <MessagePreview
                      key={v1()}
                      userId={room.patient.id}
                      username={room.patient.username}
                      nickname={room.patient.nickname}
                      message={room.lastMessage.text}
                      sent={room.lastMessage.created}
                    />
                  ))}
                </React.Fragment>
              ))
            )}
            {isFetchingMore ? (
              <Box
                px={2}
                py={1}
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Spinner size={24} noText />
              </Box>
            ) : canFetchMore ? (
              <Button onClick={() => fetchMore()}>Load more</Button>
            ) : null}
          </div>
        </Resizable>
        <div className={classes.main}>
          {isFetchingMessages ? (
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
                  position={getMessagePosition(message.author)}
                  message={message.text}
                  created={message.created}
                />
              ))}
            </div>
          ) : (
            <div className={classes.center}>
              <Typography>
                {username
                  ? 'No messages here yet...'
                  : 'Please select a room...'}
              </Typography>
            </div>
          )}
          {username && <InputToolbar onSubmit={sendMessage} />}
        </div>
      </div>
    </>
  );
}
