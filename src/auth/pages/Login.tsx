import React, { useCallback, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  FormattedMessage,
  injectIntl,
  WrappedComponentProps,
} from 'react-intl';
import { useForm } from 'react-hook-form';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import {
  isAuthenticating,
  isAuthenticated as isAuthenticatedSelector,
} from '../authReducer';
import { loginInitAction, tryAutoLoginAction } from '../authActions';
import AuthLayout from '../components/AuthLayout';
import { RootState } from '../../utils/store';

interface FormData {
  username: string;
  password: string;
}

type Props = WrappedComponentProps;

const useStyles = makeStyles((theme) => ({
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(),
  },
  submit: {
    marginTop: theme.spacing(3),
  },
}));

const Login: React.FC<Props> = ({ intl }) => {
  const classes = useStyles();
  const { register, handleSubmit } = useForm<FormData>();
  const isFetching = useSelector(isAuthenticating);
  const isAuthenticated = useSelector(isAuthenticatedSelector);
  const authenticationErrorMessage = useSelector<RootState, string>(
    (state) => state.auth.error?.message || ''
  );
  const dispatch = useDispatch();
  const login = useCallback(
    (data: FormData) => {
      dispatch(loginInitAction(data));
    },
    [dispatch]
  );
  const tryAutoLogin = useCallback(() => {
    dispatch(tryAutoLoginAction());
  }, [dispatch]);

  useEffect(() => {
    tryAutoLogin();
  }, [tryAutoLogin]);

  if (isAuthenticated) {
    return <Redirect to="/nutri/select-patient" />;
  }

  return (
    <AuthLayout>
      <Typography component="h1" variant="h5">
        <FormattedMessage id="nutri.login.signIn" />
      </Typography>
      <form className={classes.form} onSubmit={handleSubmit(login)}>
        <Typography>{authenticationErrorMessage}</Typography>
        <TextField
          name="username"
          inputRef={register}
          label={intl.formatMessage({
            id: 'nutri.login.username',
          })}
          margin="normal"
          required
          fullWidth
        />
        <TextField
          name="password"
          inputRef={register}
          label={intl.formatMessage({
            id: 'nutri.login.password',
          })}
          type="password"
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
          <FormattedMessage id="nutri.login.button" />
        </Button>
      </form>
    </AuthLayout>
  );
};

export default injectIntl(Login);
