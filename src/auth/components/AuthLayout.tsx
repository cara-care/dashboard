import React from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  wrapper: {
    paddingTop: theme.spacing(8),
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    [theme.breakpoints.up(400 + theme.spacing(6))]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing(2)}px ${theme.spacing(3)}px ${theme.spacing(
      3
    )}px`,
  },
}));

const AuthLayout: React.FC = ({ children }) => {
  const classes = useStyles();
  return (
    <div className={classes.wrapper}>
      <Paper className={classes.paper}>{children}</Paper>
    </div>
  );
};

export default AuthLayout;
