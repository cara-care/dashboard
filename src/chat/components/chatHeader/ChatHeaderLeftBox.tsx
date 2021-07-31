import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Typography } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
// import { ChatUser } from '../../redux';

const useStyles = makeStyles((theme) => ({
  box: {
    display: 'flex',
    flex: 1,
    padding: '12px 0',
  },
  photo: {
    padding: '0 8px',
    marginTop: 6,
    width: '16px',
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

export default function ChatHeaderLeftBox({ patient }: { patient: any }) {
  const classes = useStyles();

  return (
    <Box className={classes.box}>
      <Box className={classes.photo}></Box>
      <Box>
        <Typography variant="h6">{patient.nickname}</Typography>
        <Typography variant="body2" className={classes.premiumBox}>
          Programme:{' '}
          {patient.enrolledProgrammes.length === 0 ? (
            <CloseIcon style={{ fontSize: 18 }} />
          ) : (
            patient.enrolledProgrammes[0].title
          )}
        </Typography>
        <Typography variant="body2">User ID: {patient.username}</Typography>
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
