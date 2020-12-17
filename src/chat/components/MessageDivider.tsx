import React from 'react';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  divder: {
    flexGrow: 1,
    backgroundColor: theme.palette.primary.main,
  },
  text: {
    margin: theme.spacing(),
  },
}));

export default function MessageDivider({
  children,
}: React.PropsWithChildren<{}>) {
  const classes = useStyles();
  return (
    <Box display="flex" alignItems="center">
      <Divider className={classes.divder} />
      <Typography variant="body2" className={classes.text}>
        {children}
      </Typography>
      <Divider className={classes.divder} />
    </Box>
  );
}
