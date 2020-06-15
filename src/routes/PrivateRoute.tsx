import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import {
  isAuthenticated as isAuthenticatedSelector,
  hasPatientId,
} from '../auth';

interface Prop extends RouteProps {
  component: React.ComponentType<any>;
}

const PrivateRoute: React.FC<Prop> = ({ component: Component, ...rest }) => {
  const isAuthenticated = useSelector(isAuthenticatedSelector);
  const isPatientSelected = useSelector(hasPatientId);

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          isPatientSelected ? (
            <Component {...props} />
          ) : (
            <Redirect to={{ pathname: '/nutri/select-patient' }} />
          )
        ) : (
          <Redirect to={{ pathname: '/nutri/login' }} />
        )
      }
    />
  );
};

export default PrivateRoute;
