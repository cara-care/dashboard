import React, { useCallback } from 'react';
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
import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import { isAuthenticating } from '../authReducer';
import { loginInitAction } from '../authActions';
import AuthLayout from '../components/AuthLayout';
import Link from '../../components/Link';
import { RootState } from '../../utils/store';
import useAutoLogin from '../useAutoLogin';

interface FormData {
  username: string;
  password: string;
}

type Props = WrappedComponentProps;

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
  },
}));

const Login: React.FC<Props> = ({ intl }) => {
  const classes = useStyles();
  const { register, handleSubmit } = useForm<FormData>();
  const isFetching = useSelector(isAuthenticating);
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

  useAutoLogin();

  return (
    <AuthLayout>
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
      </Avatar>
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
        <Link to="/nutri/forgot-password/" className={classes.link}>
          Forgot password?
        </Link>
      </form>
    </AuthLayout>
  );
};

export default injectIntl(Login);
