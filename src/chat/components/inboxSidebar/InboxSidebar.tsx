import React, { useCallback } from 'react';
import { Box, IconButton, makeStyles, Typography } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import Conversations from './Conversations';
import SearchInput from './SearchInput';
import SidebarPrograms from './SidebarPrograms';
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
    padding: '16px 8px',
    width: '100%',
    overflowY: 'scroll',
  },
  headerBox: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
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
      <Box className={classes.headerBox}>
        <Typography variant="h6" style={{ marginLeft: 16 }}>
          Inbox
        </Typography>
        <IconButton size="medium" aria-label="search">
          <SearchIcon />
        </IconButton>
      </Box>
      {error ? <ChatRoomsError {...{ error, refetch }} /> : <Conversations />}
      <SearchInput />
      <SidebarPrograms title="UK Users" />
      <SidebarPrograms title="US Nutris" />
    </Box>
  );
}
