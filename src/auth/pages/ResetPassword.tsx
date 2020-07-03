import React, { useState } from 'react';
import { useIntl, FormattedMessage } from 'react-intl';
import { useForm } from 'react-hook-form';
import { RouteComponentProps } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import Avatar from '@material-ui/core/Avatar';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import { makeStyles } from '@material-ui/core/styles';
import useAutoLogin from '../useAutoLogin';
import AuthLayout from '../components/AuthLayout';
import Link from '../../components/Link';
import { resetPassword } from '../../utils/api';

const useStyles = makeStyles((theme) => ({
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  title: {
    marginBottom: theme.spacing(2),
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
  },
}));

enum Result {
  SUCCESS = 'success',
  ERROR = 'error',
}

interface FormData {
  password: string;
  confirmPassword: string;
}

const ResetPassword: React.FC<RouteComponentProps> = ({ location }) => {
  const classes = useStyles();
  const intl = useIntl();
  const tokenMatches = location.search.match(/token=([^&]*)/i);
  const { register, errors, handleSubmit, reset } = useForm<FormData>();
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState<boolean>(false);
  const [result, setResult] = useState<Result | undefined>(undefined);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const closeSnackbar = () => {
    setIsSnackbarOpen(false);
  };
  const handleResetPassword = async ({
    password,
    confirmPassword,
  }: FormData) => {
    if (tokenMatches && tokenMatches[1]) {
      if (password !== confirmPassword) {
        setErrorMessage(
          intl.formatMessage({
            id: 'resetPassword.passwordsDontMatch',
            defaultMessage: "Passwords don't match",
          })
        );
        setResult(Result.ERROR);
        setIsSnackbarOpen(true);
      } else {
        setIsFetching(true);
        try {
          await resetPassword({ password, token: tokenMatches[1] });
          setIsFetching(false);
          setResult(Result.SUCCESS);
          setIsSnackbarOpen(true);
          reset();
        } catch (err) {
          setErrorMessage(
            err.message ||
              intl.formatMessage({
                id: 'resetPassword.tokenIsInvalidOrExpired',
                defaultMessage:
                  'Failed to reset password, you token is either invalid or expired.',
              })
          );
          setResult(Result.ERROR);
          setIsSnackbarOpen(true);
          setIsFetching(false);
        }
      }
    } else {
      setErrorMessage(
        intl.formatMessage({
          id: 'resetPassword.tokenIsInvalidOrExpired',
          defaultMessage:
            'Failed to reset password, you token is either invalid or expired.',
        })
      );
      setResult(Result.ERROR);
      setIsSnackbarOpen(true);
    }
  };

  useAutoLogin();

  return (
    <AuthLayout>
      <Avatar className={classes.avatar}>
        <VpnKeyIcon />
      </Avatar>
      <Typography component="h1" variant="h5" className={classes.title}>
        <FormattedMessage
          id="resetPassword.resetPassword"
          defaultMessage="Reset Password"
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
              id="resetPassword.yourPasswordHasBeenUpdated"
              defaultMessage="Your password has been updated. You can now sign in with your updated password."
            />
          ) : (
            errorMessage || (
              <FormattedMessage
                id="resetPassword.tokenIsInvalidOrExpired"
                defaultMessage="Failed to reset password, you token is either invalid or expired."
              />
            )
          )}
        </Alert>
      </Snackbar>
      <form
        className={classes.form}
        onSubmit={handleSubmit(handleResetPassword)}
      >
        <TextField
          id="password"
          name="password"
          inputRef={register({ required: true, minLength: 8, maxLength: 200 })}
          label={intl.formatMessage({
            id: 'resetPassword.newPassword',
            defaultMessage: 'New password',
          })}
          type="password"
          margin="normal"
          error={!!errors.password}
          required
          fullWidth
          helperText={
            !!errors.confirmPassword &&
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
          id="confirmPassword"
          name="confirmPassword"
          inputRef={register({ required: true, minLength: 8, maxLength: 200 })}
          label={intl.formatMessage({
            id: 'resetPassword.confirmNewPassword',
            defaultMessage: 'Confirm new password',
          })}
          type="password"
          margin="normal"
          required
          fullWidth
          error={!!errors.confirmPassword}
          helperText={
            !!errors.confirmPassword &&
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
            id="resetPassword.resetPassword"
            defaultMessage="resetPassword.resetPassword"
          />
        </Button>
        <Link to="/nutri/login/" className={classes.link}>
          <FormattedMessage
            id="forgotPassword.returnToLogin"
            defaultMessage="Return to login"
          />
        </Link>
      </form>
    </AuthLayout>
  );
};

export default ResetPassword;
