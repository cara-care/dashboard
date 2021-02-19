import React, { useCallback, useState } from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import { useIntl } from 'react-intl';
import { Tabs, Tab } from '@material-ui/core';
import InputToolbarTab from './InputToolbarTab';
import { useDispatch, useSelector } from 'react-redux';
import { sendNote } from '../../../utils/api';
import {
  addChatUserNote,
  ChatUserNote,
  currentUserIdSelector,
} from '../../redux';

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
  const dispatch = useDispatch();
  const userId = useSelector(currentUserIdSelector);
  const [value, setValue] = useState(0);

  const sendNoteToStore = useCallback(
    (note: ChatUserNote) => {
      dispatch(addChatUserNote(note));
    },
    [dispatch]
  );

  const handleTabChange = (_event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const sendMessage = (message: string) => {
    onSubmit(message);
  };

  const handleNoteSend = async (message: string) => {
    if (!userId || !message) return;
    try {
      const res = await sendNote(userId, message);
      sendNoteToStore(res.data);
    } catch (error) {}
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
          onSubmit={handleNoteSend}
        />
      </Paper>
    </div>
  );
}
