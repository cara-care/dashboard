import React from 'react';
import { NavLink } from 'react-router-dom';
import { formatDistanceToNowStrict } from 'date-fns';
import truncate from 'lodash/truncate';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  link: {
    color: 'inherit',
    backgroundColor: 'transparent',
    textDecoration: 'none',
    transition: `color ${theme.transitions.duration.shorter}ms ${theme.transitions.easing.easeInOut}, background-color ${theme.transitions.duration.shorter}ms ${theme.transitions.easing.easeInOut}`,
    '&:hover': {
      color: '#150b2c',
      backgroundColor: 'rgba(216, 236, 235, 0.8)',
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
    color: '#150b2c',
    backgroundColor: '#d8eceb',
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

export interface MessagePreviewProps {
  nickname: string;
  message: string;
  sent: string;
  userId: number;
  username: string;
}

export default React.memo(function MessagePreview({
  nickname,
  message,
  sent,
  userId,
  username,
}: MessagePreviewProps) {
  const classes = useStyles();

  return (
    <NavLink
      to={`/nutri/inbox/${userId}` + (username ? `/${username}` : '')}
      className={classes.link}
      activeClassName={classes.active}
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
