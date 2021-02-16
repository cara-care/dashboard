import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import { useIntl } from 'react-intl';
import { Tabs, Tab } from '@material-ui/core';
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

  const [value, setValue] = useState(0);

  const handleTabChange = (_event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const sendMessage = (message: string) => {
    onSubmit(message);
  };

  const sendNote = (message: string) => {
    console.log(message); // TODO: Update when `notes` BE ready
  };

  return (
    <div className={classes.root}>
      <Paper elevation={0} className={classes.card}>
        <Tabs
          value={value}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          style={{ paddingLeft: 12 }}
        >
          <Tab
            label={intl.formatMessage({
              id: 'common.reply',
              defaultMessage: 'Reply',
            })}
          />
          <Tab
            label={intl.formatMessage({
              id: 'common.note',
              defaultMessage: 'Note',
            })}
          />
        </Tabs>
        <InputToolbarTab
          value={value}
          index={0}
          buttonMessage={intl.formatMessage({
            id: 'common.send',
            defaultMessage: 'Send',
          })}
          onSubmit={sendMessage}
        />
        <InputToolbarTab
          value={value}
          index={1}
          buttonMessage={intl.formatMessage({
            id: 'chat.addNote',
            defaultMessage: 'Add Note',
          })}
          onSubmit={sendNote}
        />
      </Paper>
    </div>
  );
}
