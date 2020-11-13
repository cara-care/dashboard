import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Button, Typography } from '@material-ui/core';
import ChatDetailsCard from './ChatDetailsCard';
import { useQuery } from 'react-query';
import { getChatRoom } from '../../utils/api';
import { times } from 'lodash';
import MessageSkeleton from './MessageSkeleton';
import { v1 } from 'uuid';
import { Alert, AlertTitle } from '@material-ui/lab';

const useStyles = makeStyles((_theme) => ({
  root: {
    padding: '20px 12px',
    backgroundColor: 'rgba(216, 236, 235, 0.3)',
  },
}));

export interface ChatDetailsProps {
  userId: string | number;
}

export default function ChatDetails({ userId }: ChatDetailsProps) {
  const classes = useStyles();
  const intl = useIntl();

  const { isLoading, isError, data, error, refetch } = useQuery(
    [`chatRoom-${userId}`, userId],
    getChatRoom
  );

  if (isLoading) {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {times(3).map(() => (
          <Box key={v1()} px={2} py={1}>
            <MessageSkeleton />
          </Box>
        ))}
      </div>
    );
  }
  if (isError) {
    return (
      <Alert
        severity="error"
        action={
          <Button color="inherit" size="small" onClick={() => refetch}>
            Retry
          </Button>
        }
      >
        <AlertTitle>
          <FormattedMessage id="common.error" defaultMessage="Error" />
        </AlertTitle>
        {error.response
          ? error.response.data
          : error.request
          ? error.request?.response
          : error.message}
      </Alert>
    );
  }
  if (!data?.data) {
    return null;
  }

  const { patient } = data.data;

  const userInformation = [
    { key: 'User ID', value: patient.id },
    { key: 'Last Contact', value: 'Alina' },
    { key: 'Age', value: '24' },
    { key: 'Sex', value: 'male' },
  ];

  const userDetails = [
    { key: 'Back-end ID', value: patient.username },
    { key: 'Phone OS', value: 'Android' },
    { key: 'First Seen', value: '12/12/2020' },
    { key: 'Last Seen', value: '12/12/2020' },
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
      />
      <ChatDetailsCard
        title={intl.formatMessage({
          id: 'common.details',
          defaultMessage: 'Details',
        })}
        cardDetailsValues={userDetails}
      />
    </div>
  );
}
