import React from 'react';
import clsx from 'classnames';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { getTime, padWith0 } from '../../../utils/dateUtils';
import { MESSAGE_CONTAINER } from '../../../utils/test-helpers';
import Linkify from 'react-linkify';
import ExternalLink from '../../../components/ExternalLink';
import { Message as MessageType } from '../../KabelwerkContext';

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
    minWidth: 28,
    [theme.breakpoints.up('md')]: {
      maxWidth: '60%',
    },
  },
  serviceBubble: {
    maxWidth: '100%',
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
  serviceMessage: {
    fontStyle: 'italic',
    color: theme.palette.primary.main,
    fontSize: 14,
  },
  timestamp: {
    position: 'absolute',
    bottom: '-24px',
    display: 'block',
    minWidth: 100,
    color: theme.palette.primary.main,
  },
  timestampLeft: {
    left: 0,
    textAlign: 'left',
  },
  timestampRight: {
    right: 0,
    textAlign: 'right',
  },
}));

export interface MessageProps {
  position?: 'left' | 'right';
  message: MessageType;
}

const componentDecorator = (href: string, text: string) => (
  <ExternalLink href={href}>{text}</ExternalLink>
);

export default function Message({ message, position = 'left' }: MessageProps) {
  const classes = useStyles();
  return (
    <div
      className={clsx(classes.root, {
        [classes.reverse]: position === 'right',
      })}
      data-testid={MESSAGE_CONTAINER}
    >
      <div
        className={clsx(classes.bubble, {
          [classes.serviceBubble]: message.type === 'room_move',
          [classes.bubbleLeft]: position === 'left',
          [classes.bubbleRight]:
            position === 'right' && message.type === 'text',
        })}
      >
        <Linkify componentDecorator={componentDecorator}>
          <Typography
            className={
              message.type === 'text' ? classes.message : classes.serviceMessage
            }
          >
            {message.text}
          </Typography>
        </Linkify>
        <Typography
          variant="caption"
          className={clsx(classes.timestamp, {
            [classes.timestampLeft]: position === 'left',
            [classes.timestampRight]: position === 'right',
          })}
        >
          {padWith0(getTime(message.insertedAt))}
        </Typography>
      </div>
    </div>
  );
}
