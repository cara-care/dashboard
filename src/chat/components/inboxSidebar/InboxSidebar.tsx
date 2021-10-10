import React from 'react';
import { Box, makeStyles } from '@material-ui/core';
import Conversations from './Conversations';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.secondary.main,
    padding: '4px 8px',
    width: '100%',
    overflowY: 'auto',
  },
}));

export default function InboxSidebar() {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Conversations />
    </Box>
  );
}
