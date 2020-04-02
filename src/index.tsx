import 'react-app-polyfill/ie11';
import React from 'react';
import ReactDOM from 'react-dom';
import * as Sentry from '@sentry/browser';
import App from './App';
import * as serviceWorker from './serviceWorker';

if (process.env.NODE_ENV === 'production') {
  Sentry.init({
    dsn: process.env.REACT_APP_SENTRY_DNS_URL,
  });
}

if (!window.Intl) {
  import('intl')
    .then(() =>
      Promise.all([
        // @ts-ignore
        import('intl/locale-data/jsonp/en.js'),
        // @ts-ignore
        import('intl/locale-data/jsonp/de.js'),
      ])
    )
    .then(() => {
      runApp();
    })
    .catch((err) => {
      Sentry.captureException(err);
      runApp();
    });
} else {
  runApp();
}

function runApp() {
  ReactDOM.render(<App />, document.getElementById('root') as HTMLElement);
  // If you want your app to work offline and load faster, you can change
  // unregister() to register() below. Note this comes with some pitfalls.
  // Learn more about service workers: https://bit.ly/CRA-PWA
  serviceWorker.unregister();
}
