import React, { useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useIntl, FormattedMessage } from 'react-intl';
import { useForm } from 'react-hook-form';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
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

const Login: React.FC = () => {
  const classes = useStyles();
  const intl = useIntl();
  const { register, handleSubmit } = useForm<FormData>();
  const isFetching = useSelector(isAuthenticating);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const authenticationErrorMessage = useSelector<RootState, string>(
    (state) => state.auth.error?.message || ''
  );
  const dispatch = useDispatch();
  const login = useCallback(
    (data: FormData) => {
      dispatch(
        loginInitAction({
          username: data.username.toLowerCase(),
          password: data.password,
        })
      );
    },
    [dispatch]
  );
  const toggleIsPasswordVisible = useCallback(() => {
    setIsPasswordVisible((isVisible) => !isVisible);
  }, []);

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
        <TextField
          id="password"
          name="password"
          inputRef={register}
          label={intl.formatMessage({
            id: 'nutri.login.password',
          })}
          type={isPasswordVisible ? 'text' : 'password'}
          margin="normal"
          required
          fullWidth
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={toggleIsPasswordVisible}
                >
                  {isPasswordVisible ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
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

export default Login;
