import { makeStyles } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    border: `1px solid ${theme.palette.primary.main}`,
    borderRadius: 6,
    padding: '6px 12px',
    fontSize: 12,
  },
}));

export default function ChatHeaderLabel({ label }: { label: string }) {
  const classes = useStyles();
  return <div className={classes.root}>{label}</div>;
}
