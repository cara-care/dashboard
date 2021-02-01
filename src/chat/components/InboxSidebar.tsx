import React, { useCallback, useEffect } from 'react';
import { Box, IconButton, makeStyles, Typography } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import Converstaions from './Converstaions';
import SearchInput from './SearchInput';
import SidebarPrograms from './SidebarPrograms';
import { getInboxesList } from '../../utils/api';
import { useDispatch } from 'react-redux';
import { ChatConversation, setChatConversations } from '../redux';

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
  const dispatch = useDispatch();

  const setConversations = useCallback(
    (conversations: ChatConversation[]) => {
      dispatch(setChatConversations(conversations));
    },
    [dispatch]
  );

  useEffect(() => {
    const getInboxes = async () => {
      try {
        const res = await getInboxesList();
        setConversations(res.data.results);
      } catch (error) {
        console.log(error);
      }
    };
    getInboxes();
  }, [setConversations]);

  const classes = useStyles();
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
      <Converstaions />
      <SearchInput />
      <SidebarPrograms title="UK Users" />
      <SidebarPrograms title="US Nutris" />
    </Box>
  );
}
