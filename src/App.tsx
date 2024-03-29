import CssBaseline from '@material-ui/core/CssBaseline';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { v1 } from 'uuid';

import { KabelwerkProvider } from './chat/contexts/KabelwerkContext';
import { NotificationsProvider } from './chat/contexts/NotificationsContext';
import Layout from './components/Layout';
import Placeholder from './components/Placeholder';
import withProviders from './components/withProviders';
import routes from './routes';
import PrivateRoute from './routes/PrivateRoute';

export const App = () => (
  <>
    <CssBaseline />
    <Layout>
      <NotificationsProvider>
        <KabelwerkProvider>
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
        </KabelwerkProvider>
      </NotificationsProvider>
    </Layout>
  </>
);

export default withProviders(App);
