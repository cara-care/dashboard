import React, { useCallback } from 'react';
import { Box, makeStyles } from '@material-ui/core';
import Conversations from './Conversations';
import { getInboxesList } from '../../../utils/api';
import { useDispatch, useSelector } from 'react-redux';
import {
  ChatConversation,
  selectedAssignmentSelector,
  setChatConversations,
} from '../../redux';
import { useQuery } from 'react-query';
import { ChatRoomsError } from '../other/Errors';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.secondary.main,
    padding: '4px 8px',
    width: '100%',
    overflowY: 'scroll',
  },
}));

export default function InboxSidebar() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selectedAssignment = useSelector(selectedAssignmentSelector);

  const setConversations = useCallback(
    (conversations: ChatConversation[]) => {
      dispatch(setChatConversations(conversations));
    },
    [dispatch]
  );

  const { error, refetch } = useQuery(
    ['inboxList', selectedAssignment],
    async (_key: string) => {
      const res = await getInboxesList();
      setConversations(res.data);
      return res.data;
    },
    {
      cacheTime: 0,
      refetchOnWindowFocus: true,
    }
  );

  return (
    <Box className={classes.root}>
      {error ? <ChatRoomsError {...{ error, refetch }} /> : <Conversations />}
    </Box>
  );
}
