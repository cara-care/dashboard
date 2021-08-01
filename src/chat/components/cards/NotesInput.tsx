import React, { useCallback, useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { editNote, sendNote } from '../../../utils/api';
import {
  ChatUserNote,
  addChatUserNote,
  getPatient,
  noteEditModeSelector,
  editChatUserNote,
  clearEditMode,
} from '../../redux';

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

export default function NotesInput() {
  const intl = useIntl();
  const classes = useStyles();
  const dispatch = useDispatch();
  const patient = useSelector(getPatient);
  const { isEdit, message: editedMessage, noteId } = useSelector(
    noteEditModeSelector
  );
  const [message, setMessage] = useState('');

  useEffect(() => {
    setMessage(editedMessage);
  }, [editedMessage]);

  const sendNoteToStore = useCallback(
    (note: ChatUserNote) => {
      dispatch(addChatUserNote(note));
    },
    [dispatch]
  );

  const handleMessageChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setMessage(e.target.value);
    },
    []
  );

  const handleNoteUpdate = useCallback(async () => {
    if (patient) {
      await editNote(patient.id, noteId, message);
      dispatch(editChatUserNote(noteId, message));
      dispatch(clearEditMode());
    }
  }, [dispatch, message, noteId, patient]);

  const handleNoteCreate = useCallback(async () => {
    if (patient) {
      const res = await sendNote(patient.id, message);
      sendNoteToStore(res.data);
      setMessage('');
    }
  }, [message, patient, sendNoteToStore]);

  const handleSubmit = async () => {
    if (!patient || !message) return;
    try {
      isEdit ? handleNoteUpdate() : handleNoteCreate();
    } catch (error) {}
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
        disabled={!message || (isEdit && message === editedMessage)}
        onClick={handleSubmit}
      >
        {isEdit
          ? intl.formatMessage({
              id: 'common.update',
              defaultMessage: 'Update',
            })
          : intl.formatMessage({
              id: 'common.send',
              defaultMessage: 'Add',
            })}
      </Button>
    </div>
  );
}
