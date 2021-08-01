import React from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import { useIntl } from 'react-intl';
import InputToolbarTab from './InputToolbarTab';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
  card: {
    paddingBottom: 4,
    border: `1px solid ${theme.palette.divider}`,
    overflow: 'hidden' /* to prevent input borders from overflowing */,
  },
}));

interface InputToolbarProps {
  onSubmit: (message: string) => void;
}

export default function InputToolbar({ onSubmit }: InputToolbarProps) {
  const classes = useStyles();
  const intl = useIntl();

  const sendMessage = (message: string) => {
    onSubmit(message);
  };

  return (
    <div className={classes.root}>
      <Paper elevation={0} className={classes.card}>
        <InputToolbarTab
          value={0}
          index={0}
          buttonMessage={intl.formatMessage({
            id: 'common.send',
            defaultMessage: 'Send',
          })}
          onSubmit={sendMessage}
        />
      </Paper>
    </div>
  );
}
