import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import {
  getUserByEmailOrUsername,
  getUserDataById,
  getNotesList,
} from '../../../utils/api';
import { setChatUserNotes, updatePatient } from '../../redux';
import { zIndexes } from '../../../theme';
import { ChatHeaderSkeleton } from '../other/LoadingScreens';
import ChatHeaderLeftBox from './ChatHeaderLeftBox';
import ChatHeaderRightBox from './ChatHeaderRightBox';
import useKabelwerk from '../../hooks/useKabelwerk';
import useNotification from '../../hooks/useNotification';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'sticky',
    zIndex: zIndexes.chatHeader,
    left: 0,
    top: 0,
    backgroundColor: theme.palette.background.default,
    width: '100%',
    display: 'flex',
    borderBottom: `1px solid ${theme.palette.divider}`,
    marginBottom: 12,
  },
}));

export default function ChatHeader() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { currentInboxRoom } = useKabelwerk();
  const notification = useNotification();

  const [patient, setPatient] = useState(null);

  useEffect(() => {
    // do nothing if no room is selected yet
    if (!currentInboxRoom) return;

    // reset the patient
    setPatient(null);
    dispatch(updatePatient(null));
    dispatch(setChatUserNotes([]));

    getUserByEmailOrUsername(currentInboxRoom.user.key)
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
        notification.showError(error.message);
      });
  }, [dispatch, currentInboxRoom]);

  if (!currentInboxRoom) {
    return <></>;
  } else if (currentInboxRoom && !patient) {
    return (
      <Box className={classes.root}>
        <ChatHeaderSkeleton height={96} />
      </Box>
    );
  } else {
    return (
      <div>
        <Box className={classes.root}>
          <ChatHeaderLeftBox patient={patient} />
          <ChatHeaderRightBox />
        </Box>
      </div>
    );
  }
}
