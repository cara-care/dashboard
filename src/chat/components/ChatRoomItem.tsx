import React, { useCallback } from 'react';
import { NavLink } from 'react-router-dom';
import { formatDistanceToNowStrict } from 'date-fns';
import truncate from 'lodash/truncate';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import {
  ChatUser,
  clearChatMessages,
  setCurrentChatUserInit,
  currentUserIdSelector,
  loadingCurrentUserSelector,
} from '../redux';

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
    whiteSpace: 'pre-wrap',
  },
  divder: { backgroundColor: '#d8eceb' },
}));

export interface ChatRoomItemProps {
  message: string;
  sent: string;
  patient: ChatUser;
}

export default React.memo(function ChatRoomItem({
  sent,
  message,
  patient,
}: ChatRoomItemProps) {
  const { nickname, username, id: userId } = patient;
  const classes = useStyles();
  const dispatch = useDispatch();
  const loadingUserData = useSelector(loadingCurrentUserSelector);
  const currentUserId = useSelector(currentUserIdSelector);

  const setCurrentPatient = useCallback(
    (patient: ChatUser, refetchMessages = false) => {
      dispatch(setCurrentChatUserInit(patient, refetchMessages));
    },
    [dispatch]
  );
  const clearMessages = useCallback(() => {
    dispatch(clearChatMessages());
  }, [dispatch]);

  const handleChatRoomSelected = () => {
    if (currentUserId === patient.id) {
      if (loadingUserData) {
        setCurrentPatient(patient, true);
      }
    } else {
      clearMessages();
      setCurrentPatient(patient);
    }
  };

  return (
    <NavLink
      // TODO: remove link, erase NavLInk
      to={`/nutri/inbox/${userId}` + (username ? `/${username}` : '')}
      className={classes.link}
      activeClassName={classes.active}
      onClick={handleChatRoomSelected}
    >
      <div className={classes.root}>
        <div className={classes.container}>
          <Avatar className={classes.avatar} />
          <div className={classes.inner}>
            <Typography variant="h6" className={classes.nickname}>
              {nickname || ' '}
            </Typography>
            {/* TODO: SHOW FILE NAME IF MESSAGE WAS A FILE? */}
            <Typography variant="body2">
              {truncate(message, { length: 60 })}
            </Typography>
          </div>
        </div>
        {/* TODO: INTL + units */}
        <Typography variant="caption">
          {formatDistanceToNowStrict(new Date(sent))}
        </Typography>
      </div>
      <Divider className={classes.divder} />
    </NavLink>
  );
});
