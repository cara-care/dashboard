import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import ChatDetailsCard from './ChatDetailsCard';
import { ChatUser, loadingCurrentUserSelector } from '../redux';
import { useSelector } from 'react-redux';

const useStyles = makeStyles((_theme) => ({
  root: {
    padding: '20px 12px',
    backgroundColor: 'rgba(216, 236, 235, 0.3)',
    overflowY: 'scroll',
  },
}));

export interface ChatDetailsProps {
  user: ChatUser;
}

export default function ChatDetails({ user }: ChatDetailsProps) {
  const classes = useStyles();
  const intl = useIntl();
  const loadingUserData = useSelector(loadingCurrentUserSelector);

  // if (isError) {
  //   return (
  //     <Alert
  //       severity="error"
  //       action={
  //         <Button color="inherit" size="small" onClick={() => refetch}>
  //           Retry
  //         </Button>
  //       }
  //     >
  //       <AlertTitle>
  //         <FormattedMessage id="common.error" defaultMessage="Error" />
  //       </AlertTitle>
  //       {error.response
  //         ? error.response.data
  //         : error.request
  //         ? error.request?.response
  //         : error.message}
  //     </Alert>
  //   );
  // }

  const userInformation = [
    { key: 'User ID', value: user.id },
    { key: 'Last Contact', value: 'Alina' },
    { key: 'Age', value: '24' },
    { key: 'Sex', value: user.sex ?? 'not specified' },
  ];

  const userDetails = [
    { key: 'Back-end ID', value: user.username },
    { key: 'Phone OS', value: user.platform },
    { key: 'First Seen', value: '12/12/2020' },
    { key: 'Last Seen', value: user.lastSeen },
    { key: 'Last heard from', value: '12/12/2020' },
  ];

  return (
    <div className={classes.root}>
      <Typography variant="h6" color="textPrimary">
        <FormattedMessage
          id="chat.converstaionDetails"
          defaultMessage="ConversationsDetails"
        />
      </Typography>

      <ChatDetailsCard
        title={intl.formatMessage({
          id: 'chat.userInformation',
          defaultMessage: 'User Information',
        })}
        cardDetailsValues={userInformation}
        loading={loadingUserData}
      />
      <ChatDetailsCard
        title={intl.formatMessage({
          id: 'common.details',
          defaultMessage: 'Details',
        })}
        cardDetailsValues={userDetails}
        loading={loadingUserData}
      />
    </div>
  );
}
