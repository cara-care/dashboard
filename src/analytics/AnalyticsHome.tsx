import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import AssessmentIcon from '@material-ui/icons/Assessment';
import SearchIcon from '@material-ui/icons/Search';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';

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
  searchBarPaper: {
    p: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400,
  },
  iconBtn: {
    p: '10px',
  },
  inputBase: {
    marginLeft: '10px',
    ml: 10,
    flex: 1,
  },
}));

const AnalyticsHome = () => {
  const classes = useStyles();
  const isAuthenticated = useSelector(isAuthenticatedSelector);

  if (!isAuthenticated) {
    return <Redirect to="/nutri/login" />;
  }

  return (
    <Paper className={classes.paper} elevation={0}>
      <Avatar className={classes.avatar}>
        <AssessmentIcon />
      </Avatar>

      <h1>Analytics Dashboard</h1>
      <Paper component="form" className={classes.searchBarPaper}>
        <InputBase
          className={classes.inputBase}
          placeholder="Search User"
          inputProps={{ 'aria-label': 'search user' }}
        />
        <IconButton
          type="button"
          aria-label="search"
          className={classes.iconBtn}
        >
          <SearchIcon />
        </IconButton>
      </Paper>
    </Paper>
  );
};

export default AnalyticsHome;
