import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  Button,
  IconButton,
  Popover,
  Typography,
} from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AssignTeammate from './AssignTeammate';
import { useSelector } from 'react-redux';
import { selectedAssignmentSelector } from '../../redux';


const useStyles = makeStyles({
  box: {
    display: 'flex',
    flex: 1,
    paddingTop: 16,
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    flexWrap: 'wrap',
  },
  iconMargin: {
    margin: '0 8px',
  },
  button: {
    marginTop: -5,
  },
  buttonText: {
    fontSize: 12,
    letterSpacing: '1.6px',
  },
});


export default function ChatHeaderRightBox() {
  const classes = useStyles();
  const selectedAssignment = useSelector(selectedAssignmentSelector);
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleOpenAssignPopup = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setAnchorEl(event.currentTarget);
    setOpen(true);
  };

  const handleCloseAssignPopup = () => {
    setOpen(false);
  };

  return (
    <>
      <Box className={classes.box}>
        <IconButton size="small" aria-label="settings">
          <MoreVertIcon />
        </IconButton>
        <div
          style={{ margin: '5px 8px', display: 'flex', alignItems: 'center' }}
        >
          <Button
            onClick={handleOpenAssignPopup}
            className={classes.button}
            startIcon={
              <AccountCircleIcon style={{ marginRight: 4, fontSize: 20 }} />
            }
          >
            <Typography variant="body2" className={classes.buttonText}>
              {selectedAssignment}
            </Typography>
          </Button>
        </div>
        <IconButton
          size="small"
          aria-label="star"
          className={classes.iconMargin}
        >
          <StarBorderIcon />
        </IconButton>
        <IconButton
          size="small"
          aria-label="notifications"
          className={classes.iconMargin}
        >
          <NotificationsNoneIcon />
        </IconButton>
        <IconButton
          size="small"
          aria-label="check"
          className={classes.iconMargin}
        >
          <CheckCircleOutlineIcon />
        </IconButton>
      </Box>
      <Popover
        id="assign-popover"
        open={open}
        anchorEl={anchorEl}
        onClose={handleCloseAssignPopup}
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
          assignUserToNutri={console.log}
          handleCloseAssignPopup={handleCloseAssignPopup}
        />
      </Popover>
    </>
  );
}
