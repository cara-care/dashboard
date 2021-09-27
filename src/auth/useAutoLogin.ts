import { useCallback, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { isAuthenticated as isAuthenticatedSelector } from './authReducer';
import { tryAutoLoginAction } from './authActions';

const useAutoLogin = () => {
  const isAuthenticated = useSelector(isAuthenticatedSelector);
  const history = useHistory();
  const dispatch = useDispatch();

  const tryAutoLogin = useCallback(() => {
    dispatch(tryAutoLoginAction());
  }, [dispatch]);

  useEffect(() => {
    tryAutoLogin();
  }, [tryAutoLogin]);

  useEffect(() => {
    if (isAuthenticated) {
      history.push(
        process.env.REACT_APP_LOCATION === 'EU'
          ? '/nutri/inbox'
          : '/nutri/select-patient'
      );
    }
  }, [isAuthenticated, history]);
};

export default useAutoLogin;
