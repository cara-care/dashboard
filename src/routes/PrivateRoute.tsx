import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { isAuthenticated as isAuthenticatedSelector } from '../auth';

interface Prop extends RouteProps {
  component: React.ComponentType<any>;
}

const PrivateRoute: React.FC<Prop> = ({ component: Component, ...rest }) => {
  const isAuthenticated = useSelector(isAuthenticatedSelector);

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/nutri/login' }} />
        )
      }
    />
  );
};

export default PrivateRoute;
