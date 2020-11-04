import React from 'react';
import clsx from 'classnames';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { getTime } from '../../utils/dateUtils';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    marginBottom: theme.spacing(),
  },
  reverse: {
    flexDirection: 'row-reverse',
  },
  avatar: {
    width: 32,
    height: 32,
  },
  avatarLeft: {
    marginRight: theme.spacing(),
  },
  avatarRight: {
    marginLeft: theme.spacing(),
  },
  bubble: {
    position: 'relative',
    padding: theme.spacing(),
    color: '#150b2c',
    borderRadius: theme.shape.borderRadius,
    marginBottom: 24,
    [theme.breakpoints.up('md')]: {
      maxWidth: '50%',
    },
  },
  bubbleLeft: {
    backgroundColor: '#eef4f3',
  },
  bubbleRight: {
    backgroundColor: '#f3f1f1',
  },
  message: {
    whiteSpace: 'pre-wrap',
  },
  timestamp: {
    position: 'absolute',
    bottom: '-24px',
    right: 0,
    display: 'block',
    textAlign: 'right',
    color: theme.palette.primary.main,
  },
}));

export interface MessageProps {
  position?: 'left' | 'right';
  message: string;
  sent: string | Date;
}

export default function Message({
  message,
  sent,
  position = 'left',
}: MessageProps) {
  const classes = useStyles();
  return (
    <div
      className={clsx(classes.root, {
        [classes.reverse]: position === 'right',
      })}
    >
      <Avatar
        className={clsx(classes.avatar, {
          [classes.avatarLeft]: position === 'left',
          [classes.avatarRight]: position === 'right',
        })}
      />
      <div
        className={clsx(classes.bubble, {
          [classes.bubbleLeft]: position === 'left',
          [classes.bubbleRight]: position === 'right',
        })}
      >
        <Typography className={classes.message}>{message}</Typography>
        <Typography variant="caption" className={classes.timestamp}>
          {getTime(sent)}
        </Typography>
      </div>
    </div>
  );
}
