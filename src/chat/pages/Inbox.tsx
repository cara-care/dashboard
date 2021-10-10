import { makeStyles } from '@material-ui/core/styles';
import { Resizable, ResizeCallback } from 're-resizable';
import React from 'react';
import NutriNavigation from '../../components/NutriNavigation';
import { CHAT_WRAPPER } from '../../utils/test-helpers';
import ChatDetails from '../components/cards/ChatDetails';
import Chat from '../components/chat/Chat';
import ChatHeader from '../components/chatHeader/ChatHeader';
import ChatRooms from '../components/chatRooms/ChatRooms';
import InboxSidebar from '../components/inboxSidebar/InboxSidebar';
import useKabelwerk from '../hooks/useKabelwerk';

export enum InboxType {
  PERSONAL = 'personal',
  ANWENDERTEST_HB = 'anwendertest_hb',
  ANWENDERTEST_IBD = 'anwendertest_ibd',
  ANWENDERTEST_IBS = 'anwendertest_ibs',
  RCT_IBS = 'rct_ibs',
  NO_STUDY = 'no_study',
  ALL = 'all',
}

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

const Inbox = () => {
  const classes = useStyles();

  const { connected } = useKabelwerk();

  const [width, setWidth] = React.useState(320);

  const handleResizeStop: ResizeCallback = (_e, _direction, _ref, d) => {
    // FIXME: causes <Chat /> to scroll to bottom
    setWidth(width + d.width);
  };

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
              <ChatRooms />
            </Resizable>

            <div className={classes.main} data-testid={CHAT_WRAPPER}>
              <ChatHeader />
              <Chat />
            </div>
            <div className={classes.details}>
              <ChatDetails />
            </div>
          </>
        ) : (
          <>connecting..</>
        )}
      </div>
    </>
  );
};

export default Inbox;
