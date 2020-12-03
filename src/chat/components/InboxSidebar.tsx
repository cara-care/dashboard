import React from 'react';
import { Box, IconButton, makeStyles, Typography } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import Converstaions from './Converstaions';
import SearchInput from './SearchInput';
import SidebarPrograms from './SidebarPrograms';

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
  // heading: {
  //   fontSize: theme.typography.pxToRem(15),
  //   fontWeight: theme.typography.fontWeightRegular,
  // },
}));

export default function InboxSidebar() {
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
