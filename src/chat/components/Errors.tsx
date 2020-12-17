import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Alert, AlertTitle } from '@material-ui/lab';
import { Button } from '@material-ui/core';
import { FormattedMessage } from 'react-intl';

const useStyles = makeStyles((theme) => ({
  messages: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column-reverse',
    padding: theme.spacing(2),
    overflowY: 'auto',
  },
  center: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    padding: theme.spacing(2),
  },
}));

interface ChatMessagesError {
  error: unknown;
  refetch: any;
}

export function ChatMessagesError({ error, refetch }: any) {
  const classes = useStyles();
  return (
    <div className={classes.center}>
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
    </div>
  );
}

export function ChatRoomsError({ error, refetch }: any) {
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
