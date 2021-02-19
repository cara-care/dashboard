import React, { useCallback, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Divider, IconButton, Typography, useTheme } from '@material-ui/core';
import {
  ChatUserNote,
  clearEditMode,
  currentUserIdSelector,
  deleteChatUserNote,
  noteEditModeSelector,
  setNodeEditMode,
} from '../../redux';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { useDispatch, useSelector } from 'react-redux';
import { deleteNote } from '../../../utils/api';
import { getNutriName } from '../../../auth';

const useStyles = makeStyles((_theme) => ({
  list: {
    padding: 8,
    backgroundColor: 'rgba(216, 236, 235, 0.2)',
  },
  headerContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  divider: {
    margin: '8px 0',
  },
  smallIcon: {
    fontSize: 15,
  },
}));

export default function NotesList({ notes }: { notes: ChatUserNote[] }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const theme = useTheme();
  const userId = useSelector(currentUserIdSelector);
  const nutriName = useSelector(getNutriName);
  const { isEdit, noteId } = useSelector(noteEditModeSelector);

  useEffect(() => {
    return () => {
      dispatch(clearEditMode());
    };
  }, [dispatch]);

  const handleNoteDelete = useCallback(
    async (id: number) => {
      if (!userId) return;
      try {
        await deleteNote(userId, id);
        dispatch(deleteChatUserNote(id));
      } catch (error) {}
    },
    [dispatch, userId]
  );

  const handleNoteEdit = useCallback(
    async (id: number, noteText: string) => {
      isEdit && noteId === id
        ? dispatch(clearEditMode())
        : dispatch(
            setNodeEditMode({
              isEdit: true,
              noteId: id,
              message: noteText,
            })
          );
    },
    [dispatch, isEdit, noteId]
  );

  return (
    <div className={classes.list}>
      {notes.map((note, index) => {
        const {
          id,
          text,
          author: { name },
        } = note;
        const isLast = index === notes.length - 1;
        return (
          <div key={id}>
            <div className={classes.headerContainer}>
              <Typography variant="body2" color="primary">
                {name}
              </Typography>
              {nutriName === name && (
                <div>
                  <IconButton
                    aria-label="edit-icon"
                    onClick={() => handleNoteEdit(note.id, note.text)}
                  >
                    <EditIcon
                      className={classes.smallIcon}
                      style={{
                        color:
                          noteId === note.id
                            ? theme.palette.primary.main
                            : undefined,
                      }}
                    />
                  </IconButton>
                  <IconButton
                    aria-label="delete-icon"
                    onClick={() => handleNoteDelete(note.id)}
                  >
                    <DeleteIcon className={classes.smallIcon} />
                  </IconButton>
                </div>
              )}
            </div>
            <Typography variant="body2" color="textPrimary">
              {text}
            </Typography>
            {!isLast && <Divider className={classes.divider} />}
          </div>
        );
      })}
    </div>
  );
}
