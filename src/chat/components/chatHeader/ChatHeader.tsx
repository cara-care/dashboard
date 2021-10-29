import { Box, IconButton, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ArchiveIcon from '@material-ui/icons/Archive';
import UnarchiveIcon from '@material-ui/icons/Unarchive';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { zIndexes } from '../../../theme';
import {
  getNotesList,
  getUserByEmailOrUsername,
  getUserDataById,
} from '../../../utils/api';
import useKabelwerk from '../../hooks/useKabelwerk';
import useNotification from '../../hooks/useNotification';
import { setChatUserNotes, updatePatient } from '../../redux';
import { ChatUser } from '../../redux/types';
import { ChatHeaderSkeleton } from '../other/LoadingScreens';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'sticky',
    zIndex: zIndexes.chatHeader,
    left: 0,
    top: 0,
    backgroundColor: theme.palette.background.default,
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    borderBottom: `1px solid ${theme.palette.divider}`,
    padding: '8px 12px',
    alignItems: 'center',
  },
}));

export default function ChatHeader() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [patient, setPatient] = useState<null | ChatUser>(null);
  const { currentRoom, selectRoom } = useKabelwerk();
  const { showError, showSuccess, showInfo } = useNotification();

  useEffect(() => {
    // do nothing if no room is selected yet
    if (!currentRoom) {
      return;
    }

    // reset the patient
    setPatient(null);
    dispatch(updatePatient(null));
    dispatch(setChatUserNotes([]));

    getUserByEmailOrUsername(currentRoom.getUser().key)
      .then((res: any) => {
        return getUserDataById(res.data.id);
      })
      .then((res: any) => {
        setPatient(res.data);
        dispatch(updatePatient(res.data));
        return getNotesList(res.data.id);
      })
      .then((res: any) => {
        dispatch(setChatUserNotes(res.data));
      })
      .catch((error: Error) => {
        showError(error.message);
      });
  }, [dispatch, currentRoom, showError]);

  if (!currentRoom) {
    return <></>;
  }

  if (currentRoom && !patient) {
    return (
      <Box className={classes.root}>
        <ChatHeaderSkeleton />
      </Box>
    );
  }

  return (
    <Box className={classes.root}>
      <Typography variant="h6">{patient?.nickname}</Typography>
      <div>
        <IconButton
          title="Assign to teammate"
          onClick={() => {
            showInfo('Assignment feature is coming soon!');
          }}
          color="primary"
        >
          <AccountCircleIcon />
        </IconButton>
        {currentRoom !== null && currentRoom.isArchived() ? (
          <IconButton
            title="Unarchive this room"
            onClick={() => {
              currentRoom
                .unarchive()
                .then(() => {
                  // TODO remove with selectRoom refactor
                  selectRoom(null);
                  showSuccess('Room successfully moved back to its Inbox!');
                })
                .catch((error: Error) => showError(error.message));
            }}
            color="primary"
          >
            <UnarchiveIcon />
          </IconButton>
        ) : (
          <IconButton
            title="Archive this room"
            onClick={() => {
              currentRoom
                .archive()
                .then(() => {
                  // TODO remove with selectRoom refactor
                  selectRoom(null);
                  showSuccess('Room successfully archived!');
                })
                .catch((error: Error) => showError(error.message));
            }}
            color="primary"
          >
            <ArchiveIcon />
          </IconButton>
        )}
      </div>
    </Box>
  );
}
