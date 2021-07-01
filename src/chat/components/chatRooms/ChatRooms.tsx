import React, { useEffect } from 'react';
import Kabelwerk from 'kabelwerk';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import ChatRoomsList from './ChatRoomsList';
import { useDispatch, useSelector } from 'react-redux';
import { getInbox, updateInboxRooms } from '../../redux';
import { Divider, Typography } from '@material-ui/core';

const useStyles = makeStyles((_theme) => ({
  sidebar: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    overflowY: 'scroll',
  },
  headerBox: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '24px 16px',
  },
  divider: {},
}));

export default function ChatRooms() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selectedInbox = useSelector(getInbox);

  useEffect(() => {
    let kabel, params, inbox;

    if (!selectedInbox) {
      return;  // do nothing if no inbox is selected yet
    }

    try {
      kabel = Kabelwerk.getKabel();
    } catch (error) {
      return;  // do nothing if the websocket is not connected yet
    }

    params = {limit: 10};
    switch (selectedInbox.slug) {
      case 'personal':
        break;

      case 'DE:free':
        params['attributes'] = {country: 'DE', is_premium: false};
        break;

      case 'DE:premium':
        params['attributes'] = {country: 'DE', is_premium: true};
        break;

      case 'UK:free':
        params['attributes'] = {country: 'UK', is_premium: false};
        break;

      case 'UK:premium':
        params['attributes'] = {country: 'UK', is_premium: true};
        break;

      case 'pilot_study':
        params['attributes'] = {groups: ['pilot_study']};
        break;

      case '_':
        break;

      case 'all':
      default:
        break;
    }

    inbox = kabel.openInbox(params);

    inbox.on('ready', (rooms: any[]) => {
      dispatch(updateInboxRooms(rooms));
    });

    inbox.on('updated', (rooms: any[]) => {
      dispatch(updateInboxRooms(rooms));
    });
  }, [
    dispatch,
    selectedInbox,
  ]);

  return (
    <div className={classes.sidebar}>
      <Box className={classes.headerBox}>
        <Typography variant="h6">
          {selectedInbox ? selectedInbox.name : 'Loading…'}
        </Typography>
      </Box>
      <Divider className={classes.divider} />
      <ChatRoomsList />
    </div>
  );
}
