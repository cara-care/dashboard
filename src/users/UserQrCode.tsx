import React, { useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, RouteComponentProps, useHistory } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import QRCode from 'react-qr-code';

import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import CodeIcon from '@material-ui/icons/Code';
import Paper from '@material-ui/core/Paper';

import { isAuthenticated as isAuthenticatedSelector } from '../auth';
import { getUserQrCode } from '../utils/api';
import { FetchUsersQrCodeFailed, FetchUsersQrCodeSuccess } from './userActions';
import useNotification from '../chat/hooks/useNotification';
import Link from '@material-ui/core/Link';

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
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  link: {
    display: 'block',
    textAlign: 'center',
    width: '100%',
  },
}));

const UserQrCode: React.FC<RouteComponentProps<{
  token?: string;
}>> = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const isAuthenticated = useSelector(isAuthenticatedSelector);
  const [url, setUrl] = useState('');
  const goBack = useCallback(() => {
    history.go(-1);
  }, [history]);
  const { showError } = useNotification();

  useEffect(() => {
    getUserQrCode()
      .then((res: any) => {
        dispatch(FetchUsersQrCodeSuccess(res.data));
        setUrl(res.data.url);
      })
      .catch((error: Error) => {
        dispatch(FetchUsersQrCodeFailed(error));
        showError(error.message);
      });
  }, [dispatch, showError]);

  if (!isAuthenticated) {
    return <Redirect to="/nutri/login" />;
  }

  return (
    <div className={classes.wrapper}>
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <CodeIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          <FormattedMessage
            id="users.userQrCode"
            defaultMessage="User QR Code"
          />
        </Typography>
        <p>
          Install{' '}
          <a href="https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2">
            Google Authenticator
          </a>{' '}
          and use the URL below or scan QR Code:
        </p>
        <p>{url}</p>
        {url ? <QRCode value={url} /> : null}
        <br />
        <Link
          component="button"
          type="button"
          variant="body2"
          className={classes.link}
          onClick={goBack}
        >
          <FormattedMessage id="userQrCode.goBack" defaultMessage="Go back" />
        </Link>
      </Paper>
    </div>
  );
};

export default UserQrCode;
