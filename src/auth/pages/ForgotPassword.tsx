import React, { useState } from 'react';
import { useIntl, FormattedMessage } from 'react-intl';
import { useForm } from 'react-hook-form';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import Avatar from '@material-ui/core/Avatar';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import { makeStyles } from '@material-ui/core/styles';
import useAutoLogin from '../useAutoLogin';
import AuthLayout from '../components/AuthLayout';
import Link from '../../components/Link';
import { requestResetPassword } from '../../utils/api';

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

const ForgotPassword = () => {
  const classes = useStyles();
  const intl = useIntl();
  const { register, handleSubmit, reset } = useForm<{ username: string }>();
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState<boolean>(false);
  const [result, setResult] = useState<Result | undefined>(undefined);
  const closeSnackbar = () => {
    setIsSnackbarOpen(false);
  };
  const forgotPassword = async ({ username }: { username: string }) => {
    setIsFetching(true);

    try {
      await requestResetPassword(username);
      setIsFetching(false);
      setResult(Result.SUCCESS);
      setIsSnackbarOpen(true);
      reset();
    } catch (err) {
      setResult(Result.ERROR);
      setIsSnackbarOpen(true);
      setIsFetching(false);
    }
  };

  useAutoLogin();

  return (
    <AuthLayout>
      <Avatar className={classes.avatar}>
        <LockOpenIcon />
      </Avatar>
      <Typography component="h1" variant="h5" className={classes.title}>
        <FormattedMessage
          id="forgotPassword.forgotPassword?"
          defaultMessage="Forgot Password?"
        />
      </Typography>
      <Typography variant="body2">
        <FormattedMessage
          id="forgotPassword.enterYourUsernameWeWillSendEmail"
          defaultMessage="Enter your username and we’ll send you an email with instructions to reset your password."
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
              id="forgotPassword.resetInstructionsSent"
              defaultMessage="Reset password instructions sent!"
            />
          ) : (
            <FormattedMessage
              id="forgotPassword.failedToSendResetInstructions"
              defaultMessage="Failed to send reset password instructions!"
            />
          )}
        </Alert>
      </Snackbar>
      <form className={classes.form} onSubmit={handleSubmit(forgotPassword)}>
        <TextField
          id="username"
          name="username"
          inputRef={register}
          label={intl.formatMessage({
            id: 'nutri.login.username',
          })}
          margin="normal"
          required
          fullWidth
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
            id="forgotPassword.sendResetInstructions"
            defaultMessage="Send reset password instructions"
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

export default ForgotPassword;
