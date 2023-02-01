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

import { isAuthenticated as isAuthenticatedSelector } from '../auth';
import { searchUser } from '../utils/api';

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
          setError('No user found with similar username or email address.');
        }
      });
  };

  if (!isAuthenticated) {
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
      {userFound && (
        <div className={classes.wrapper}>
          <p>
            <strong>Username: </strong>
            {userData['username']}
          </p>
          <p>
            <strong>Email Confirmed: </strong>
            {userData['email_confirmed'] ? 'True' : 'False'}
          </p>
          <p>
            <strong>Timezone: </strong>
            {userData['timezone']}
          </p>
          <p>
            <strong>Code Activated: </strong>
            {userData['code_activated'] ? 'True' : 'False'}
          </p>
          <p>
            <strong>Onboarding Done On Date: </strong>
            {userData['onboarding_date']}
          </p>
          <p>
            <strong>Account Created On: </strong>
            {userData['date_joined']}
          </p>
          <p>
            <strong>Last Seen In App: </strong>
            {userData['last_seen']}
          </p>
          <div>
            <strong>User Groups: </strong>
            <ul>
              {userData['groups'] &&
                userData['groups'].map(
                  (
                    group: {} | null | undefined,
                    i: string | number | undefined
                  ) => (
                    <li key={i}>
                      <span>{group}</span>
                    </li>
                  )
                )}
            </ul>
          </div>
          <p>
            <strong>Disease: </strong>
            {userData['diseases']}
          </p>
          <p>
            <strong>Allergies: </strong>
            {userData['allergies']}
          </p>
          <p>
            <strong>App Version: </strong>
            {userData['app_version']}
          </p>
          <p>
            <strong>Platform: </strong>
            {userData['platform']}
          </p>
          <p>
            <strong>T0 Completed: </strong>
            {userData['t0_completed']}
          </p>
          <p>
            <strong>T1 Completed: </strong>
            {userData['t1_completed']}
          </p>
          <p>
            <strong>T2 Completed: </strong>
            {userData['t2_completed']}
          </p>
          <p>
            <strong>T3 Completed: </strong>
            {userData['t3_completed']}
          </p>
          <p>
            <strong>Programme: </strong>
            {userData['programme']}
          </p>
          <p>
            <strong>Programme Started: </strong>
            {userData['programme_started']}
          </p>
          <p>
            <strong>Current Week: </strong>
            {userData['programme_week']}
          </p>
          <p>
            <strong>Modules: </strong>
            {userData['programme_modules']}
          </p>
          {userData['t0_answers'] !== undefined && (
            <div>
              <strong>T0 Answers: </strong>
              <ul>
                {userData['t0_answers'].map(
                  (answer: { [x: string]: React.ReactNode }, index: any) => {
                    return (
                      <li key={index} className={classes.listItem}>
                        <span>
                          <strong>Slug: </strong>
                          {answer.slug}
                        </span>
                        <br />
                        <span>
                          <strong>Answer: </strong>
                          {answer.data ? JSON.stringify(answer.data) : 'None'}
                        </span>
                      </li>
                    );
                  }
                )}
              </ul>
            </div>
          )}
        </div>
      )}
    </form>
  );
};

export default AnalyticsHome;
