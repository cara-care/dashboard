import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, RouteComponentProps } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import DashboardIcon from '@material-ui/icons/Dashboard';
import Paper from '@material-ui/core/Paper';

import { isAuthenticated as isAuthenticatedSelector } from '../auth';
import { RouterLinkWithPropForwarding as Link } from '../components/Link';

const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing(2)}px ${theme.spacing(3)}px ${theme.spacing(
      8
    )}px`,
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  link: {
    display: 'block',
    textAlign: 'center',
    width: '100%',
  },
  column: {
    float: 'left',
    width: '25%',
    padding: '0 10px',
  },
  gridArticle: {
    border: '1px solid #ccc',
    boxShadow: '2px 2px 6px 0px  grey',
  },
  row: {
    margin: '0 -5px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '50% 50%',
    gridGap: '20px',
    alignItems: 'start',
  },
  text: {
    padding: '0 20px 20px',
  },
  textButton: {
    background: 'green',
    border: '0',
    color: 'white',
    padding: '10px',
    width: '100%',
  },
}));

const HomeDashboard: React.FC<RouteComponentProps<{
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
          <DashboardIcon />
        </Avatar>

        <h1>Home Dashboard</h1>
        <div className={classes.grid}>
          <div className={classes.gridArticle}>
            <div className={classes.text}>
              <h3>Chat Board</h3>
              <p>Users correspondence with Cara Team.</p>
              <Link className={classes.link} to="/nutri/inbox/all">
                <button className={classes.textButton}>More details</button>
              </Link>
            </div>
          </div>
          <div className={classes.gridArticle}>
            <div className={classes.text}>
              <h3>Analytics</h3>
              <p>User related analytics and data queries.</p>
              <Link className={classes.link} to="/nutri/analytics">
                <button className={classes.textButton}>More details</button>
              </Link>
            </div>
          </div>
          <div className={classes.gridArticle}>
            <div className={classes.text}>
              <h3>Revoke Access</h3>
              <p>Revoke user's access to cara care app.</p>
              <Link className={classes.link} to="/nutri/revoke-access">
                <button className={classes.textButton}>More details</button>
              </Link>
            </div>
          </div>
          <div className={classes.gridArticle}>
            <div className={classes.text}>
              <h3>Get QR Code</h3>
              <p>Two factor authentication setup.</p>
              <Link className={classes.link} to="/nutri/user-qr-code">
                <button className={classes.textButton}>More details</button>
              </Link>
            </div>
          </div>
        </div>
      </Paper>
    </div>
  );
};

export default HomeDashboard;
