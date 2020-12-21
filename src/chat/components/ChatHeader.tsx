import React, { useEffect, useRef, useState } from 'react';
import clsx from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, Box, IconButton, Typography } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import CloseIcon from '@material-ui/icons/Close';
import { ChatUser, loadingCurrentUserSelector } from '../redux';
import { zIndexes } from '../../theme';
import ChatHeaderLabel from './ChatHeaderLabel';
import { useSelector } from 'react-redux';
import { ChatHeaderSkeleton } from './LoadingScreens';
import { useIntl } from 'react-intl';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'sticky',
    zIndex: zIndexes.chatHeader,
    left: 0,
    top: 0,
    backgroundColor: theme.palette.background.default,
    width: '100%',
    display: 'flex',
    borderBottom: `1px solid ${theme.palette.divider}`,
    marginBottom: 12,
  },
  box: {
    display: 'flex',
  },
  box1: {
    flex: 3,
    padding: '12px 0',
  },
  box2: {
    flex: 2,
    paddingTop: 16,
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    flexWrap: 'wrap',
  },
  photo: {
    padding: '0 8px',
    marginTop: 6,
  },
  assginedLabel: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: 8,
  },
  iconMargin: {
    margin: '0 8px',
  },
  premiumBox: {
    display: 'flex',
    alignItems: 'center',
  },
  divder: { backgroundColor: theme.palette.divider },
}));

export default function ChatHeader({ user }: { user: ChatUser }) {
  const loadingUserData = useSelector(loadingCurrentUserSelector);
  const classes = useStyles();
  const intl = useIntl();
  const ref = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(96);

  useEffect(() => {
    if (ref.current?.clientHeight) {
      // minus margin and border
      setHeight(ref.current.clientHeight - 13);
    }
  }, [loadingUserData]);

  if (loadingUserData) {
    return (
      <Box className={classes.root}>
        <ChatHeaderSkeleton height={height} />
      </Box>
    );
  }

  return (
    <div ref={ref}>
      <Box className={classes.root}>
        {/* 1 BOX */}
        <Box className={clsx(classes.box, classes.box1)}>
          <Box className={classes.photo}>
            <Avatar>H</Avatar>
          </Box>
          <Box>
            <Typography variant="body2" className={classes.premiumBox}>
              {intl.formatMessage({
                id: 'common.premium',
                defaultMessage: 'Premium',
              })}
              :{' '}
              {user.enrolledProgrammes.length === 0 ? (
                <CloseIcon style={{ fontSize: 18 }} />
              ) : (
                user.enrolledProgrammes[0]
              )}
            </Typography>
            <Typography variant="h6">{user.nickname}</Typography>
            <Typography variant="body2">
              {intl.formatMessage({
                id: 'chat.key.userID',
                defaultMessage: 'User ID',
              })}
              : {user.username}
            </Typography>
          </Box>
          <Box className={classes.assginedLabel}>
            <ChatHeaderLabel
              label={intl.formatMessage({
                id: 'common.verified',
                defaultMessage: 'Verified',
              })}
            />
          </Box>
        </Box>
        {/* 2 BOX */}
        <Box className={clsx(classes.box, classes.box2)}>
          <IconButton
            size="small"
            aria-label="settings"
            className={classes.iconMargin}
          >
            <MoreVertIcon />
          </IconButton>
          <div
            style={{ margin: '5px 8px', display: 'flex', alignItems: 'center' }}
          >
            <AccountCircleIcon style={{ marginRight: 4, fontSize: 18 }} />
            <Typography variant="body2">
              {intl.formatMessage({
                id: 'common.unassigned',
                defaultMessage: 'Unassigned',
              })}
            </Typography>
          </div>
          <IconButton
            size="small"
            aria-label="star"
            className={classes.iconMargin}
          >
            <StarBorderIcon />
          </IconButton>
          <IconButton
            size="small"
            aria-label="notifications"
            className={classes.iconMargin}
          >
            <NotificationsNoneIcon />
          </IconButton>
          <IconButton
            size="small"
            aria-label="check"
            className={classes.iconMargin}
          >
            <CheckCircleOutlineIcon />
          </IconButton>
        </Box>
      </Box>
    </div>
  );
}
