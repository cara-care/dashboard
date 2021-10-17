import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Button, Popover, Typography } from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AssignTeammate from './AssignTeammate';
import useNotification from '../../hooks/useNotification';

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
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const notification = useNotification();

  const handleOpenAssignPopup = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    notification.showInfo('Assignment feature is coming soon! ');
    setAnchorEl(event.currentTarget);
    setOpen(true);
  };

  const handleCloseAssignPopup = () => {
    setOpen(false);
  };

  return (
    <>
      <Box className={classes.box}>
        <div
          style={{ margin: '5px 8px', display: 'flex', alignItems: 'center' }}
        >
          <Button
            onClick={() =>
              notification.showInfo('Assignment feature is coming soon! ')
            }
            className={classes.button}
            startIcon={
              <AccountCircleIcon style={{ marginRight: 4, fontSize: 20 }} />
            }
          >
            <Typography
              variant="body2"
              className={classes.buttonText}
            ></Typography>
          </Button>
        </div>
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
