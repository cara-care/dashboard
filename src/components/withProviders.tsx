import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import { IntlProvider } from 'react-intl';
import moment from 'moment';
import 'moment/locale/de';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { RootState } from '../utils/store';
import { lightTheme, darkTheme } from '../utils/theme';

const messages = {
  en: require('../locale/en.json'),
  de: require('../locale/de.json'),
};

const withProviders = (Component: React.ComponentType) => {
  const WithProviders = (props: any) => {
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
    const locale = useSelector<RootState, string>(
      (state) => state.locale.locale
    );
    const theme = React.useMemo(
      () => (prefersDarkMode ? darkTheme : lightTheme),
      [prefersDarkMode]
    );

    useEffect(() => {
      moment.locale(locale);
    }, [locale]);

    return (
      <IntlProvider locale={locale} messages={messages[locale]}>
        <MuiThemeProvider theme={theme}>
          <MuiPickersUtilsProvider
            libInstance={moment}
            utils={MomentUtils}
            locale={locale}
          >
            <Router>
              <Component {...props} />
            </Router>
          </MuiPickersUtilsProvider>
        </MuiThemeProvider>
      </IntlProvider>
    );
  };

  return WithProviders;
};

export default withProviders;
