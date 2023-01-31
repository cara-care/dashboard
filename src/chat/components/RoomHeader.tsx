import { Box, IconButton, Popover, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ArchiveIcon from '@material-ui/icons/Archive';
import UnarchiveIcon from '@material-ui/icons/Unarchive';
import React from 'react';

import { zIndexes } from '../../theme';

import { RoomContext } from '../contexts/RoomContext';
import useKabelwerk from '../hooks/useKabelwerk';
import useNotification from '../hooks/useNotification';

import { ChatHeaderSkeleton } from './other/LoadingScreens';
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

const RoomHeader = function () {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const [isAssigning, setIsAssigning] = React.useState(false);
  const { hubUsers } = useKabelwerk();
  const { room, roomUser, isReady } = React.useContext(RoomContext);
  const { showError, showSuccess } = useNotification();

  if (!isReady) {
    return (
      <Box className={classes.root}>
        <ChatHeaderSkeleton />
      </Box>
    );
  }

  return (
    <Box className={classes.root}>
      <Typography variant="h6">
        {roomUser!.name}
        {room!.getHubUser() && (
          <small className={classes.assignee}>
            {' '}
            ↔ {room!.getHubUser().name}
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
        {room && room.isArchived() ? (
          <IconButton
            title="Unarchive this room"
            onClick={() => {
              room!
                .unarchive()
                .then(() => {
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
              room!
                .archive()
                .then(() => {
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
};

export default RoomHeader;
