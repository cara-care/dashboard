import React, { useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, Redirect, RouteComponentProps } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useIntl, FormattedMessage } from 'react-intl';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Avatar from '@material-ui/core/Avatar';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import { isAuthenticated as isAuthenticatedSelector } from '../authReducer';
import AuthLayout from '../components/AuthLayout';
import { changePassword } from '../../utils/api';

const useStyles = makeStyles((theme) => ({
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

interface FormData {
  currentPassword: string;
  newPassword: string;
}

enum Result {
  SUCCESS = 'success',
  ERROR = 'error',
}

const ChangePassword: React.FC<RouteComponentProps> = () => {
  const classes = useStyles();
  const intl = useIntl();
  const history = useHistory();
  const isAuthenticated = useSelector(isAuthenticatedSelector);
  const { register, errors, handleSubmit, reset } = useForm<FormData>();
  const [isFetching, setIsFetching] = useState(false);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState<boolean>(false);
  const [result, setResult] = useState<Result | undefined>(undefined);
  const closeSnackbar = useCallback(() => {
    setIsSnackbarOpen(false);
  }, []);
  const goBack = useCallback(() => {
    history.go(-1);
  }, [history]);
  const handleChangePassword = useCallback(
    async ({ currentPassword, newPassword }: FormData) => {
      setIsFetching(true);

      try {
        await changePassword({ currentPassword, newPassword });
        setIsFetching(false);
        setResult(Result.SUCCESS);
        setIsSnackbarOpen(true);
        reset();
      } catch (err) {
        setIsFetching(false);
        setResult(Result.ERROR);
        setIsSnackbarOpen(true);
      }
    },
    [reset]
  );

  if (!isAuthenticated) {
    return <Redirect to="/nutri/login" />;
  }

  return (
    <AuthLayout>
      <Avatar className={classes.avatar}>
        <VpnKeyIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        <FormattedMessage
          id="changePassword.changePassword"
          defaultMessage="Change Password"
        />
      </Typography>
      <Snackbar
        open={isSnackbarOpen}
        autoHideDuration={6000}
        onClose={closeSnackbar}
      >
        <Alert onClose={closeSnackbar} severity={result}>
          {result === Result.SUCCESS ? (
            <FormattedMessage
              id="changePassword.yourPasswordHasBeenUpdated"
              defaultMessage="Your password has been updated"
            />
          ) : (
            <FormattedMessage
              id="changePassword.failedToChangePassword"
              defaultMessage="Failed to change your password, make sure you entered your current password correctly."
            />
          )}
        </Alert>
      </Snackbar>
      <form
        className={classes.form}
        onSubmit={handleSubmit(handleChangePassword)}
      >
        <TextField
          id="currentPassword"
          name="currentPassword"
          inputRef={register({ required: true, minLength: 8, maxLength: 200 })}
          label={intl.formatMessage({
            id: 'changePassword.currentPassword',
            defaultMessage: 'Current password',
          })}
          type="password"
          margin="normal"
          error={!!errors.currentPassword}
          required
          fullWidth
          helperText={
            !!errors.currentPassword &&
            intl.formatMessage(
              {
                id: 'common.minimumCharaters',
                defaultMessage: 'Minimum {num} characters',
              },
              { num: 8 }
            )
          }
        />
        <TextField
          id="newPassword"
          name="newPassword"
          inputRef={register({ required: true, minLength: 8, maxLength: 200 })}
          label={intl.formatMessage({
            id: 'changePassword.newPassword',
            defaultMessage: 'New password',
          })}
          type="password"
          margin="normal"
          error={!!errors.newPassword}
          required
          fullWidth
          helperText={
            !!errors.newPassword &&
            intl.formatMessage(
              {
                id: 'common.minimumCharaters',
                defaultMessage: 'Minimum {num} characters',
              },
              { num: 8 }
            )
          }
        />
        <Button
          disabled={isFetching}
          className={classes.submit}
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
        >
          <FormattedMessage
            id="changePassword.changePassword"
            defaultMessage="Change Password"
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
            id="changePassword.goBack"
            defaultMessage="Go back"
          />
        </Link>
      </form>
    </AuthLayout>
  );
};

export default ChangePassword;
