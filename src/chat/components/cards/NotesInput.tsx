import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';
import { useIntl } from 'react-intl';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '0 8px 12px',
  },
  box: {
    marginTop: 8,
    marginBottom: 12,
    border: `1px solid ${theme.palette.divider}`,
    overflow: 'hidden',
  },
  input: {
    padding: theme.spacing(1),
    width: '100%',
    resize: 'none',
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.background.paper,
    outline: 0,
    border: 0,
    ...theme.typography.body1,
  },
}));

interface NotesInput {
  onSubmit: (message: string) => void;
}

export default function NotesInput({ onSubmit }: NotesInput) {
  const intl = useIntl();
  const classes = useStyles();
  const [message, setMessage] = useState('');

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  const handleSubmit = () => {
    if (message) {
      onSubmit(message);
      setMessage('');
    }
  };

  return (
    <div className={classes.root}>
      <Paper elevation={0} className={classes.box}>
        <textarea
          value={message}
          onChange={handleMessageChange}
          className={classes.input}
          rows={3}
        />
      </Paper>
      <Button
        variant="contained"
        color="primary"
        disabled={!message}
        onClick={handleSubmit}
      >
        {intl.formatMessage({
          id: 'common.send',
          defaultMessage: 'Send',
        })}
      </Button>
    </div>
  );
}
