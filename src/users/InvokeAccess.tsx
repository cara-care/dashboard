import React, {useCallback, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {Redirect, RouteComponentProps, useHistory} from 'react-router-dom';
import {FormattedMessage, useIntl} from "react-intl";

import {makeStyles} from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import {TextareaAutosize} from "@material-ui/core";
import CancelIcon from "@material-ui/icons/Cancel";
import Paper from "@material-ui/core/Paper";

import {isAuthenticated as isAuthenticatedSelector} from '../auth';

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


const InvokeAccess: React.FC<RouteComponentProps<{
  token?: string;
}>> = ({ match }) => {
  const classes = useStyles();
  const intl = useIntl();
  const dispatch = useDispatch();
  const history = useHistory();

  const { token } = match.params;
  const isAuthenticated = useSelector(isAuthenticatedSelector);
  const [userIds, setUserIds] = useState('')
  const goBack = useCallback(() => {
    history.go(-1);
  }, [history]);

  const handleSubmit = (event: { preventDefault: () => void; })=> {
    alert('User Ids submitted: ' + userIds);
    event.preventDefault();
  }

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
            id="users.invokeAccess"
            defaultMessage="Invoke Users Access"
          />
        </Typography>
        <form
          className={classes.form}
          onSubmit={handleSubmit}
        >
          <TextareaAutosize
            placeholder="Please provide comma separated user ids here..."
            value={userIds}
            onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setUserIds(e.target.value)}
            className={classes.input}
            rows={4}
          />

          <Button
            className={classes.submit}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
          >
            <FormattedMessage
              id="invokeAccess.invokeAccess"
              defaultMessage="Invoke Access"
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
              id="invokeAccess.goBack"
              defaultMessage="Go back"
            />
          </Link>
        </form>
      </Paper>
    </div>
  );
};

export default InvokeAccess;
