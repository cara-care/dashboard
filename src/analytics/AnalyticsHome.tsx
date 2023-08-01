import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import AssessmentIcon from '@material-ui/icons/Assessment';
import SearchIcon from '@material-ui/icons/Search';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';

import {
  getUserGroups,
  isAuthenticated as isAuthenticatedSelector,
} from '../auth';
import { searchUser } from '../utils/api';
import UserInfo from './UserInfo';

const useStyles = makeStyles((theme) => ({
  wrapper: {
    width: 'auto',
    display: 'block',
    [theme.breakpoints.up(400 + theme.spacing(6))]: {
      width: 800,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
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
  error: {
    color: 'red',
  },
  listItem: {
    paddingTop: '10px',
  },
}));

const AnalyticsHome = () => {
  const classes = useStyles();
  const isAuthenticated = useSelector(isAuthenticatedSelector);
  const userGroups = useSelector(getUserGroups);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState('');
  const [userFound, setUserFound] = useState(false);
  const [userData, setUserData] = useState({});

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();

    if (searchTerm === '') {
      setError('Please provide search term.');
      setUserFound(false);
      setUserData({});
      return;
    }

    searchUser(searchTerm)
      .then((res: any) => {
        setUserFound(true);
        setError('');
        setUserData(res.data);
      })
      .catch((error) => {
        setUserFound(false);
        setUserData({});

        if (error.response.status === 403) {
          setError(error.response.data.detail);
        } else {
          setError(
            'No user found with similar username, email address or code.'
          );
        }
      });
  };

  if (
    !isAuthenticated ||
    !(
      userGroups.includes('care_panel_user_analytics') ||
      userGroups.includes('user_analytics') ||
      userGroups.includes('admin_user_analytics') ||
      userGroups.includes('care_panel_admin_analytics')
    )
  ) {
    return <Redirect to="/nutri/login" />;
  }

  return (
    <form className={classes.paper} onSubmit={handleSubmit}>
      <Avatar className={classes.avatar}>
        <AssessmentIcon />
      </Avatar>
      <h1>Analytics Dashboard</h1>
      <Paper className={classes.searchBarPaper}>
        <InputBase
          className={classes.inputBase}
          placeholder="Search User"
          inputProps={{ 'aria-label': 'search user' }}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <IconButton
          type="button"
          aria-label="search"
          className={classes.iconBtn}
          onClick={handleSubmit}
        >
          <SearchIcon />
        </IconButton>
      </Paper>
      <hr />
      {error && (
        <p className={classes.error}>
          <i>{error}</i>
        </p>
      )}
      {userFound && <UserInfo userData={userData} />}
    </form>
  );
};

export default AnalyticsHome;
