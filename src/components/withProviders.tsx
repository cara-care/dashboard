import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import { addLocaleData, IntlProvider } from 'react-intl';
import * as en from 'react-intl/locale-data/en';
import * as de from 'react-intl/locale-data/de';
import moment from 'moment';
import 'moment/locale/de';
import configureStore from '../utils/store';
import { theme } from '../utils/theme';
let locale = require('browser-locale')();

//init moment to locale
moment.locale(locale);

let intlLocale: 'en' | 'de' = locale.substr(0, 2);
if (intlLocale !== 'en' && intlLocale !== 'de') {
  intlLocale = 'en';
}

const messages = {
  en: require('../locale/en.json'),
  de: require('../locale/de.json'),
};

if (process.env.NODE_ENV !== 'test') {
  addLocaleData([...en, ...de]);
}

const store = configureStore();

const withProviders = (Component: React.ComponentType) => {
  const WithProviders = (props: any) => (
    <Provider store={store}>
      <MuiThemeProvider theme={theme}>
        <MuiPickersUtilsProvider
          libInstance={moment}
          utils={MomentUtils}
          locale={locale}
        >
          <IntlProvider locale={intlLocale} messages={messages[intlLocale]}>
            <Router>
              <Component {...props} />
            </Router>
          </IntlProvider>
        </MuiPickersUtilsProvider>
      </MuiThemeProvider>
    </Provider>
  );

  return WithProviders;
};

export default withProviders;
