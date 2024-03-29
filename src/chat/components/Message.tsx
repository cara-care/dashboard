import React from 'react';
import clsx from 'classnames';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import DoneIcon from '@material-ui/icons/Done';
import DoneAllIcon from '@material-ui/icons/DoneAll';

import { getTime, padWith0 } from '../../utils/dateUtils';

import * as interfaces from '../interfaces';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    marginBottom: theme.spacing(),
  },
  reverse: {
    flexDirection: 'row-reverse',
  },
  bubble: {
    position: 'relative',
    padding: '0 16px',
    color: '#150b2c',
    borderRadius: theme.shape.borderRadius,
    marginBottom: 24,
    minWidth: 28,
    [theme.breakpoints.up('md')]: {
      maxWidth: '60%',
    },
  },
  serviceBubble: {
    maxWidth: '100%',
    padding: 0,
  },
  bubbleLeft: {
    backgroundColor: '#eef4f3',
  },
  bubbleRight: {
    backgroundColor: '#f3f1f1',
  },
  serviceMessage: {
    fontStyle: 'italic',
    color: theme.palette.primary.main,
    fontSize: 14,
  },
  timestamp: {
    color: theme.palette.primary.main,
    display: 'block',
    marginBottom: 16,
  },
  timestampLeft: {
    left: 0,
    textAlign: 'left',
  },
  timestampRight: {
    right: 0,
    textAlign: 'right',
  },
  checkmarks: {
    fontSize: '1.2rem',
    marginLeft: 8,
    verticalAlign: 'text-bottom',
  },
}));

export interface MessageProps {
  position?: 'left' | 'right';
  message: interfaces.Message;
  seenByRoomUser: boolean;
}

export default function Message({
  message,
  position,
  seenByRoomUser,
}: MessageProps) {
  const classes = useStyles();

  return (
    <div
      className={clsx(classes.root, {
        [classes.reverse]: position === 'right',
      })}
    >
      <div
        className={clsx(classes.bubble, {
          [classes.serviceBubble]: message.type === 'room_move',
          [classes.bubbleLeft]: position === 'left',
          [classes.bubbleRight]:
            position === 'right' && message.type !== 'room_move',
        })}
      >
        {message.type === 'image' && message.upload !== null ? (
          <p>
            <a
              href={message.upload.original.url}
              target="_blank"
              rel="noopener noreferrer"
              title={message.upload.name + ' — click to open in a new tab'}
            >
              <img
                src={message.upload.preview.url}
                width={message.upload.preview.width}
                height={message.upload.preview.height}
                alt={message.upload.name}
              />
            </a>
          </p>
        ) : (
          <Typography
            className={clsx({
              [classes.serviceMessage]: message.type === 'room_move',
            })}
            dangerouslySetInnerHTML={{ __html: message.html }}
          ></Typography>
        )}
        <Typography
          variant="caption"
          className={clsx(classes.timestamp, {
            [classes.timestampLeft]: position === 'left',
            [classes.timestampRight]: position === 'right',
          })}
        >
          {padWith0(getTime(message.insertedAt))}
          {message.type !== 'room_move' &&
            position === 'right' &&
            (seenByRoomUser ? (
              <DoneAllIcon className={classes.checkmarks} />
            ) : (
              <DoneIcon className={classes.checkmarks} />
            ))}
        </Typography>
      </div>
    </div>
  );
}
