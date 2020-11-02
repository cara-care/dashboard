import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    paddingTop: theme.spacing(),
    paddingRight: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingBottom: theme.spacing(),
  },
  avatar: {
    width: 32,
    height: 32,
    marginRight: theme.spacing(),
  },
  inner: {
    marginRight: theme.spacing(2),
  },
}));

// export interface MessagePreviewProps {
//   name: string;
//   message: string;
// }

export default function MessagePreview() {
  const classes = useStyles();

  return (
    <>
      <div className={classes.root}>
        <Avatar className={classes.avatar} />
        <div className={classes.inner}>
          <Typography variant="h6">Name of user here</Typography>
          <Typography variant="body2">
            Hi Alina! I mostly struggle with pain and diarrhea.
          </Typography>
        </div>
        <Typography variant="caption">12h</Typography>
      </div>
      <Divider />
    </>
  );
}
