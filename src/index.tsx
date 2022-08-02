import 'react-app-polyfill/ie11';
import 'intersection-observer';
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
import { loadTheme, saveTheme } from './theme';
import configureStore from './utils/store';

if (process.env.NODE_ENV === 'production') {
  Sentry.init({
    dsn: process.env.REACT_APP_SENTRY_DNS_URL,
  });
}

(async function start() {
  runApp(browserLocale() || 'en');
})();

function runApp(browserLanguage: string) {
  const persistedLocale = loadLocale();
  const persistedTheme = loadTheme();
  let initalLocale = browserLanguage.substr(0, 2);
  if (initalLocale !== 'en' && initalLocale !== 'de') {
    initalLocale = 'en';
  }

  const store = configureStore({
    preloadedLocale: persistedLocale || initalLocale,
    preloadedTheme: persistedTheme,
  });

  store.subscribe(
    throttle(() => {
      const state = store.getState();
      saveLocale(state.locale.locale);
      if (state.theme.theme) {
        saveTheme(state.theme.theme);
      }
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
