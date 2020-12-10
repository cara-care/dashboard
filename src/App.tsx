import React from 'react';
import { Route, Switch } from 'react-router-dom';
// import { ReactQueryDevtools } from 'react-query-devtools';
import CssBaseline from '@material-ui/core/CssBaseline';
import { v1 } from 'uuid';
import Layout from './components/Layout';
import Placeholder from './components/Placeholder';
import withProviders from './components/withProviders';
import PrivateRoute from './routes/PrivateRoute';
import routes from './routes';

export const App = () => (
  <>
    <CssBaseline />
    <Layout>
      <React.Suspense fallback={<Placeholder />}>
        <Switch>
          {routes.map((route) =>
            route.authRequired ? (
              <PrivateRoute
                key={route.path}
                path={route.path}
                component={route.component}
                exact={route.exact}
              />
            ) : (
              <Route
                key={v1()}
                path={route.path}
                component={route.component}
                exact={route.exact}
              />
            )
          )}
        </Switch>
      </React.Suspense>
    </Layout>
    {/* <ReactQueryDevtools
      initialIsOpen={process.env.NODE_ENV === 'development'}
    /> */}
  </>
);

export default withProviders(App);
