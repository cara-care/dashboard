import React from 'react';
import { FormattedMessage } from 'react-intl';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

import {
  getNotesList,
  getUserByEmailOrUsername,
  getUserDataById,
} from '../../utils/api';

import { RoomContext } from '../contexts/RoomContext';
import useNotification from '../hooks/useNotification';
import { setChatUserNotes, updatePatient } from '../redux';

import UserInformation from './cards/UserInformation';
import Notes from './cards/NotesCard';

const useStyles = makeStyles((_theme) => ({
  root: {
    padding: '20px 12px',
    backgroundColor: 'rgba(216, 236, 235, 0.3)',
    width: '100%',
    overflowY: 'scroll',
  },
}));

const RoomDetails = function () {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { showError } = useNotification();

  const { roomUser } = React.useContext(RoomContext);

  // load the user's info from the main backend
  React.useEffect(() => {
    if (roomUser) {
      getUserByEmailOrUsername(roomUser.key)
        .then((res: any) => {
          return getUserDataById(res.data.id);
        })
        .then((res: any) => {
          dispatch(updatePatient(res.data));
          return getNotesList(res.data.id);
        })
        .then((res: any) => {
          dispatch(setChatUserNotes(res.data));
        })
        .catch((error: Error) => {
          showError(error.message);
        });
    }

    return () => {
      // reset the patient
      dispatch(updatePatient(null));
      dispatch(setChatUserNotes([]));
    };
  }, [dispatch, showError, roomUser]);

  return (
    <div className={classes.root}>
      <Typography variant="h6" color="textPrimary">
        <FormattedMessage
          id="chat.conversationDetails"
          defaultMessage="Conversations Details"
        />
      </Typography>
      <UserInformation />
      <Notes />
    </div>
  );
};

export default RoomDetails;
