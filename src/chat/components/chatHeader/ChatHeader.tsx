import { Box, IconButton, Popover, Typography } from '@material-ui/core';
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
import AssignTeammate from './AssignTeammate';

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
  assignee: {
    fontWeight: 400,
  },
}));

export default function ChatHeader() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [patient, setPatient] = useState<null | ChatUser>(null);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [isAssigning, setIsAssigning] = useState(false);
  const { currentRoom, openRoom, hubUsers } = useKabelwerk();
  const { showError, showSuccess } = useNotification();

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
      <Typography variant="h6">
        {patient?.nickname}
        {currentRoom.getHubUser() && (
          <small className={classes.assignee}>
            {' '}
            ↔ {currentRoom.getHubUser().name}
          </small>
        )}
      </Typography>
      <div>
        <IconButton
          // disabled when the hub user is only one
          disabled={hubUsers.length === 1}
          onClick={(event) => {
            setAnchorEl(event.currentTarget);
            setIsAssigning(true);
          }}
          color="primary"
          title={
            hubUsers.length === 1
              ? 'No other hub users yet.'
              : 'Assign this room to one of your teammates.'
          }
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
                  openRoom(null);
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
                  openRoom(null);
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
      {isAssigning && (
        <Popover
          id="assign-popover"
          open={isAssigning}
          anchorEl={anchorEl}
          onClose={() => {
            setIsAssigning(false);
          }}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
        >
          <AssignTeammate
            handleCloseAssignPopup={() => {
              setIsAssigning(false);
            }}
          />
        </Popover>
      )}
    </Box>
  );
}
