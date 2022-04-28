import React, { useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, RouteComponentProps, useHistory } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import Link from '@material-ui/core/Link';
import { TextareaAutosize } from '@material-ui/core';
import CancelIcon from '@material-ui/icons/Cancel';
import Paper from '@material-ui/core/Paper';
import {
  FormLabel,
  FormControlLabel,
  Radio,
  RadioGroup,
} from '@material-ui/core';

import { isAuthenticated as isAuthenticatedSelector } from '../auth';
import { revokeAccess } from '../utils/api';
import {
  RevokeUsersAccessFailed,
  RevokeUsersAccessSuccess,
} from './userActions';

const useStyles = makeStyles((theme) => ({
  wrapper: {
    paddingTop: theme.spacing(8),
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    [theme.breakpoints.up(400 + theme.spacing(6))]: {
      width: 800,
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
  input: {
    marginTop: theme.spacing(2),
    paddingRight: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    width: '100%',
    resize: 'none',
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.background.paper,
    ...theme.typography.body1,
    marginBottom: theme.spacing(2),
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  link: {
    display: 'block',
    textAlign: 'center',
    width: '100%',
  },
}));

const RevokeAccess: React.FC<RouteComponentProps<{
  token?: string;
}>> = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const isAuthenticated = useSelector(isAuthenticatedSelector);
  const [usersCodes, setUserCodes] = useState('');
  const [message, setMessage] = useState('');
  const [deactivationType, setDeactivationType] = useState('study_completed');
  const [isSnackbarOpen, setIsSnackbarOpen] = useState<boolean>(false);
  const goBack = useCallback(() => {
    history.go(-1);
  }, [history]);
  const closeSnackbar = () => {
    setIsSnackbarOpen(false);
    setMessage('');
  };

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();

    if (usersCodes === '') {
      setIsSnackbarOpen(true);
      setMessage('Please provide comma separated users access codes');
      return;
    }

    revokeAccess(usersCodes, deactivationType)
      .then((res: any) => {
        dispatch(RevokeUsersAccessSuccess(res.data));
        setMessage(res.data.detail);
        setIsSnackbarOpen(true);
      })
      .catch((error: Error) => {
        dispatch(RevokeUsersAccessFailed(error));
      });
  };

  if (!isAuthenticated) {
    return <Redirect to="/nutri/login" />;
  }

  return (
    <div className={classes.wrapper}>
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <CancelIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          <FormattedMessage
            id="users.revokeAccess"
            defaultMessage="Revoke Users Access"
          />
        </Typography>
        <Snackbar
          open={isSnackbarOpen}
          autoHideDuration={6000}
          onClose={closeSnackbar}
        >
          <Alert onClose={closeSnackbar}>
            <FormattedMessage
              id="revokeAccess.userAccessRevokedSuccess"
              defaultMessage={message}
            />
          </Alert>
        </Snackbar>
        <form className={classes.form} onSubmit={handleSubmit}>
          <FormLabel id="users_codes">Users Access Codes</FormLabel>
          <TextareaAutosize
            aria-labelledby="users_codes"
            placeholder="Please provide comma separated users access codes here..."
            value={usersCodes}
            onChange={(e: {
              target: { value: React.SetStateAction<string> };
            }) => setUserCodes(e.target.value)}
            className={classes.input}
            rows={4}
          />

          <FormLabel id="deactivation_type">Users Type</FormLabel>
          <RadioGroup
            row
            aria-labelledby="deactivation_type"
            name="deactivation_type"
            value={deactivationType}
            onChange={(e: {
              target: { value: React.SetStateAction<string> };
            }) => setDeactivationType(e.target.value)}
          >
            <FormControlLabel
              value="study_completed"
              control={<Radio />}
              label="Study Completed"
            />
            <FormControlLabel
              value="dropout"
              control={<Radio />}
              label="Dropout"
            />
          </RadioGroup>

          <Button
            className={classes.submit}
            type="submit"
            variant="contained"
            fullWidth
            color="primary"
          >
            <FormattedMessage
              id="revokeAccess.revokeAccess"
              defaultMessage="Revoke Access"
            />
          </Button>
          <Link
            component="button"
            type="button"
            variant="body2"
            className={classes.link}
            onClick={goBack}
          >
            <FormattedMessage
              id="revokeAccess.goBack"
              defaultMessage="Go back"
            />
          </Link>
        </form>
      </Paper>
    </div>
  );
};

export default RevokeAccess;
