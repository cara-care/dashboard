import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, RouteComponentProps } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import AssessmentIcon from '@material-ui/icons/Assessment';
import Paper from '@material-ui/core/Paper';

import { isAuthenticated as isAuthenticatedSelector } from '../auth';

const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing(2)}px ${theme.spacing(3)}px`,
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
}));

const AnalyticsHome: React.FC<RouteComponentProps<{
  token?: string;
}>> = () => {
  const classes = useStyles();

  const isAuthenticated = useSelector(isAuthenticatedSelector);

  if (!isAuthenticated) {
    return <Redirect to="/nutri/login" />;
  }

  return (
    <div>
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <AssessmentIcon />
        </Avatar>

        <h1>Analytics Dashboard</h1>
      </Paper>
    </div>
  );
};

export default AnalyticsHome;
