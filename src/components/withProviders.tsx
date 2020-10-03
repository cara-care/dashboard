import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsAdapter from '@date-io/date-fns';
import { IntlProvider } from 'react-intl';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { RootState } from '../utils/store';
import { lightTheme, darkTheme } from '../theme';
import { getLocale } from '../utils/dateUtils';

const messages = {
  en: require('../locale/en.json'),
  de: require('../locale/de.json'),
};

const withProviders = (
  Component: React.ComponentType,
  Router = BrowserRouter
) => {
  const WithProviders = (props: any) => {
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
    const locale = useSelector<RootState, string>(
      (state) => state.locale.locale
    );
    const preferedTheme = useSelector<
      RootState,
      'dark' | 'light' | null | undefined
    >((state) => state.theme.theme);
    const theme = useMemo(() => {
      if (preferedTheme) {
        return preferedTheme === 'dark' ? darkTheme : lightTheme;
      } else {
        return prefersDarkMode ? darkTheme : lightTheme;
      }
    }, [preferedTheme, prefersDarkMode]);

    return (
      <IntlProvider locale={locale} messages={messages[locale]}>
        <MuiThemeProvider theme={theme}>
          <MuiPickersUtilsProvider
            utils={DateFnsAdapter}
            locale={getLocale(locale)}
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
