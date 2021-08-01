import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  box: {
    display: 'flex',
    flex: 1,
    padding: '12px 0',
  },
  photo: {
    padding: '0 8px',
    marginTop: 6,
    width: '16px',
  },
  assginedLabel: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: 8,
  },
  premiumBox: {
    display: 'flex',
    alignItems: 'center',
  },
  divder: { backgroundColor: theme.palette.divider },
}));

export default function ChatHeaderLeftBox({ patient }: { patient: any }) {
  const classes = useStyles();

  return (
    <Box className={classes.box}>
      <Box className={classes.photo}></Box>
      <Box>
        <Typography variant="h6">{patient.nickname}</Typography>
      </Box>
    </Box>
  );
}
