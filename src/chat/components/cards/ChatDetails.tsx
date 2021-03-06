import React from 'react';
import { FormattedMessage } from 'react-intl';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import UserInformation from './UserInformation';
import Details from './Details';
import HealthCard from './HealthCard';
import Notes from './NotesCard';

const useStyles = makeStyles((_theme) => ({
  root: {
    padding: '20px 12px',
    backgroundColor: 'rgba(216, 236, 235, 0.3)',
    width: '100%',
    overflowY: 'scroll',
  },
}));

export default function ChatDetails() {
  const classes = useStyles();

  // TODO: display error when error fetching user data

  return (
    <div className={classes.root}>
      <Typography variant="h6" color="textPrimary">
        <FormattedMessage
          id="chat.conversationDetails"
          defaultMessage="Conversations Details"
        />
      </Typography>
      <UserInformation />
      <HealthCard />
      <Details />
      <Notes />
    </div>
  );
}
