import { makeStyles } from '@material-ui/core/styles';
import { Resizable, ResizeCallback } from 're-resizable';
import React from 'react';
import { useParams } from 'react-router-dom';

import NutriNavigation from '../../components/NutriNavigation';
import { CHAT_WRAPPER } from '../../utils/test-helpers';

import InboxSidebar from '../components/inboxSidebar/InboxSidebar';
import Inbox from '../components/Inbox';
import RoomDetails from '../components/RoomDetails';
import RoomHeader from '../components/RoomHeader';
import Room from '../components/Room';
import { InboxProvider } from '../contexts/InboxContext';
import { RoomProvider } from '../contexts/RoomContext';
import useKabelwerk from '../hooks/useKabelwerk';
import useNotification from '../hooks/useNotification';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexWrap: 'nowrap',
    width: '100vw',
    height: `calc(100vh - 10px - 64px)`, // 100vh - nutri navigation height - appbar height
  },
  resize: {
    display: 'flex',
    borderRight: '2px solid #d8eceb',
  },
  sidebar: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    overflowY: 'auto',
  },
  main: {
    flex: '1 1 auto',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
  },
  details: {
    display: 'flex',
    flex: '0 0 350px',
    marginLeft: 'auto',
  },
  inboxSidebar: {
    display: 'flex',
  },
}));

const Chat = () => {
  const classes = useStyles();

  // which room is currently open is determined by the URL
  const { inboxSlug, roomId } = useParams();
  const roomIdInt = roomId ? parseInt(roomId) : null;

  const { connected } = useKabelwerk();
  const { showInfo, showSuccess } = useNotification();

  const [width, setWidth] = React.useState(320);

  const handleResizeStop: ResizeCallback = (_e, _direction, _ref, d) => {
    // FIXME: causes <Chat /> to scroll to bottom
    setWidth(width + d.width);
  };

  React.useEffect(() => {
    if (connected === false) {
      showInfo('Connecting to Kabelwerk...');
      return;
    }

    showSuccess('Connected to Kabelwerk!');
  }, [connected, showInfo, showSuccess]);

  return (
    <>
      <NutriNavigation />
      <div className={classes.root}>
        {connected ? (
          <>
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
              {inboxSlug && (
                <InboxProvider slug={inboxSlug}>
                  <Inbox />
                </InboxProvider>
              )}
            </Resizable>

            {roomIdInt && (
              <RoomProvider id={roomIdInt}>
                <div className={classes.main} data-testid={CHAT_WRAPPER}>
                  <RoomHeader />
                  <Room />
                </div>
                <div className={classes.details}>
                  <RoomDetails />
                </div>
              </RoomProvider>
            )}
          </>
        ) : null}
      </div>
    </>
  );
};

export default Chat;
