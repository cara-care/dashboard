import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { formatDistanceToNowStrict } from 'date-fns';
import truncate from 'lodash/truncate';
import React from 'react';
import { NavLink } from 'react-router-dom';
import useKabelwerk from '../../hooks/useKabelwerk';
import { InboxRoom } from '../../KabelwerkContext';

const useStyles = makeStyles((theme) => ({
  link: {
    color: 'inherit',
    backgroundColor: 'transparent',
    textDecoration: 'none',
    transition: `color ${theme.transitions.duration.shorter}ms ${theme.transitions.easing.easeInOut}, background-color ${theme.transitions.duration.shorter}ms ${theme.transitions.easing.easeInOut}`,
    '&:hover': {
      color: '#150b2c',
      backgroundColor: 'rgba(216, 236, 235, 0.3)',
    },
  },
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingTop: theme.spacing(),
    paddingRight: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingBottom: theme.spacing(),
  },
  active: {
    position: 'relative',
    color: '#150b2c',
    backgroundColor: '#d8eceb',
    '&:before': {
      position: 'absolute',
      display: 'block',
      content: '""',
      top: 0,
      left: 0,
      width: 8,
      height: '100%',
      backgroundColor: '#a6d2d1',
    },
  },
  container: {
    display: 'flex',
  },
  avatar: {
    width: 32,
    height: 32,
    marginRight: theme.spacing(),
  },
  inner: {
    marginRight: theme.spacing(2),
  },
  nickname: {
    fontWeight: 'bold',
    whiteSpace: 'pre-wrap',
  },
  divder: { backgroundColor: '#d8eceb' },
}));

interface ChatRoomItemProps {
  room: InboxRoom;
}

export default function ChatRoomItem({ room }: ChatRoomItemProps) {
  const classes = useStyles();
  const { selectRoom, selectCurrentInboxRoom } = useKabelwerk();

  return (
    <NavLink
      to={`/nutri/inbox/${room.id}`}
      className={classes.link}
      activeClassName={classes.active}
      onClick={() => {
        selectRoom(room.id);
        selectCurrentInboxRoom(room);
      }}
    >
      <div className={classes.root}>
        <div className={classes.container}>
          <div className={classes.inner}>
            <Typography className={classes.nickname}>
              {room.user.name}
            </Typography>
            <Typography variant="body2">
              {room.lastMessage
                ? truncate(room.lastMessage.text, { length: 60 })
                : ''}
            </Typography>
          </div>
        </div>
        <Typography variant="caption">
          {room.lastMessage
            ? formatDistanceToNowStrict(room.lastMessage.insertedAt)
            : 'unknown'}
        </Typography>
      </div>
      <Divider className={classes.divder} />
    </NavLink>
  );
}
