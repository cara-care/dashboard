import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
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
  gridArticle: {
    border: '1px solid #ccc',
    boxShadow: '2px 2px 6px 0px  grey',
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
    background: '#45aeb3',
    border: '0',
    color: 'white',
    padding: '10px',
    width: '100%',
  },
}));

const PrescriptionEpostService = () => {
  const classes = useStyles();
  const isAuthenticated = useSelector(isAuthenticatedSelector);

  if (!isAuthenticated) {
    return <Redirect to="/nutri/login" />;
  }

  return (
    <Paper className={classes.paper} elevation={0}>
      <h1>ePost Prescription Service</h1>
      <div className={classes.grid}>
        <div className={classes.gridArticle}>
          <div className={classes.text}>
            <h3>Upload</h3>
            <p>Upload a draft prescription</p>
            <Link
              className={classes.link}
              to="/nutri/epost-prescription/upload"
            >
              <button className={classes.textButton}>More details</button>
            </Link>
          </div>
        </div>
        <div className={classes.gridArticle}>
          <div className={classes.text}>
            <h3>Review</h3>
            <p>Approve pending drafts</p>
            <Link
              className={classes.link}
              to="/nutri/epost-prescription/review"
            >
              <button className={classes.textButton}>More details</button>
            </Link>
          </div>
        </div>
        <div className={classes.gridArticle}>
          <div className={classes.text}>
            <h3>Track</h3>
            <p>Track the status of posted prescriptions</p>
            <Link className={classes.link} to="/nutri/epost-prescription/track">
              <button className={classes.textButton}>More details</button>
            </Link>
          </div>
        </div>
      </div>
    </Paper>
  );
};

export default PrescriptionEpostService;
