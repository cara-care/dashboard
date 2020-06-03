import 'react-app-polyfill/ie11';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import throttle from 'lodash/throttle';
import * as Sentry from '@sentry/browser';
// @ts-ignore
import browserLocale from 'browser-locale';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { loadLocale, saveLocale } from './locale';
import configureStore from './utils/store';
import { authInitialState } from './auth';
import { chartOverviewInitialState } from './dashboard/chartOverview/redux/chartOverview';
import { questionnairesInitialState } from './questionnaires';
import { trackingOverviewInitalState } from './dashboard/trackingOverview/redux/trackingOverview';

if (process.env.NODE_ENV === 'production') {
  Sentry.init({
    dsn: process.env.REACT_APP_SENTRY_DNS_URL,
  });
}

(async function start() {
  const locale = browserLocale() || 'en';

  try {
    if (!Intl.PluralRules) {
      // @ts-ignore
      await import('@formatjs/intl-pluralrules/polyfill');
      // @ts-ignore
      await import('@formatjs/intl-pluralrules/dist/locale-data/en');
      // @ts-ignore
      await import('@formatjs/intl-pluralrules/dist/locale-data/de');
    }

    // https://github.com/microsoft/TypeScript/pull/36084
    // @ts-ignore
    if (!Intl.RelativeTimeFormat) {
      // @ts-ignore
      await import('@formatjs/intl-relativetimeformat/polyfill');
      // @ts-ignore
      await import('@formatjs/intl-relativetimeformat/dist/locale-data/en');
      // @ts-ignore
      await import('@formatjs/intl-relativetimeformat/dist/locale-data/de');
    }
  } catch (err) {
    Sentry.captureException(err);
  }

  runApp(locale);
})();

function runApp(browserLanguage: string) {
  const persistedLocale = loadLocale();
  let intlLocale = browserLanguage.substr(0, 2);
  if (intlLocale !== 'en' && intlLocale !== 'de') {
    intlLocale = 'en';
  }

  const store = configureStore({
    locale: { locale: persistedLocale || intlLocale },
    auth: authInitialState,
    chartOverview: chartOverviewInitialState,
    questionnaires: questionnairesInitialState,
    trackingOverview: trackingOverviewInitalState,
  });
  store.subscribe(
    throttle(() => {
      saveLocale(store.getState().locale.locale);
    }, 3500)
  );

  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root') as HTMLElement
  );
  // If you want your app to work offline and load faster, you can change
  // unregister() to register() below. Note this comes with some pitfalls.
  // Learn more about service workers: https://bit.ly/CRA-PWA
  serviceWorker.unregister();
  if (process.env.NODE_ENV === 'production') {
    console.log(
      `%c

_____ _____ _____ _____    _____ _____ _____ _____  \n\
|     |  _  | __  |  _  |  |     |  _  | __  |   __| \n\
|   --|     |    -|     |  |   --|     |    -|   __| \n\
|_____|__|__|__|__|__|__|  |_____|__|__|__|__|_____| \n\

🤖Something missing?
See https://github.com/cara-care/dashboard - pull requests are welcome!
`,
      'font-family:SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace;color:#00b3a5;font-size:12px;'
    );
  }
}
