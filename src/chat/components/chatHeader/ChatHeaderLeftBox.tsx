import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, Box, Typography } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { useIntl } from 'react-intl';
import { ChatUser } from '../../redux';

const useStyles = makeStyles((theme) => ({
  box: {
    display: 'flex',
    flex: 1,
    padding: '12px 0',
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
  premiumBox: {
    display: 'flex',
    alignItems: 'center',
  },
  divder: { backgroundColor: theme.palette.divider },
}));

export default function ChatHeaderLeftBox({ user }: { user: ChatUser }) {
  const classes = useStyles();
  const intl = useIntl();
  const { enrolledProgrammes, username, nickname } = user;

  return (
    <Box className={classes.box}>
      <Box className={classes.photo}>
        <Avatar />
      </Box>
      <Box>
        <Typography variant="body2" className={classes.premiumBox}>
          {intl.formatMessage({
            id: 'common.premium',
            defaultMessage: 'Premium',
          })}
          :{' '}
          {enrolledProgrammes.length === 0 ? (
            <CloseIcon style={{ fontSize: 18 }} />
          ) : (
            enrolledProgrammes[0].title
          )}
        </Typography>
        <Typography variant="h6">{nickname}</Typography>
        <Typography variant="body2">
          {intl.formatMessage({
            id: 'chat.key.userID',
            defaultMessage: 'User ID',
          })}
          : {username}
        </Typography>
      </Box>
      {/* Comment: uncomment it when backend ready
          <Box className={classes.assginedLabel}>
            <ChatHeaderLabel
              label={intl.formatMessage({
                id: 'common.verified',
                defaultMessage: 'Verified',
              })}
            />
          </Box> */}
    </Box>
  );
}
