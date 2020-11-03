import React from 'react';
import clsx from 'classnames';
// import hexToRgba from 'hex-to-rgba';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingTop: theme.spacing(),
    paddingRight: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingBottom: theme.spacing(),
  },
  active: {
    color: '#150b2c',
    backgroundColor: '#d8eceb',
  },
  container: {
    display: 'flex',
  },
  avatar: {
    width: 32,
    height: 32,
    marginRight: theme.spacing(),
  },
  inner: {
    marginRight: theme.spacing(2),
  },
  divder: { backgroundColor: '#d8eceb' },
}));

export interface MessagePreviewProps {
  isActive?: boolean;
}

export default function MessagePreview({ isActive }: MessagePreviewProps) {
  const classes = useStyles();

  return (
    <>
      <div className={clsx(classes.root, isActive && classes.active)}>
        <div className={classes.container}>
          <Avatar className={classes.avatar} />
          <div className={classes.inner}>
            <Typography variant="h6">Name of user here</Typography>
            <Typography variant="body2">
              Hi Alina! I mostly struggle with pain and diarrhea.
            </Typography>
          </div>
        </div>
        <Typography variant="caption">12h</Typography>
      </div>
      <Divider className={classes.divder} />
    </>
  );
}
