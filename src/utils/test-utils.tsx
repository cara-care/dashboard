import React from 'react';
import { render } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import configureStore from './store';

export const renderWithReactIntl = (ui: React.ReactElement) => {
  return render(
    <IntlProvider locale="en" messages={require('../locale/en.json')}>
      {ui}
    </IntlProvider>
  );
};

export function renderWithRedux(
  ui: React.ReactElement,
  {
    preloadedState = {},
    store = configureStore({
      preloadedLocale: 'en',
      preloadedTheme: undefined,
      preloadedState,
    }),
    ...renderOptions
  } = {}
) {
  function Wrapper({
    children,
  }: React.PropsWithChildren<{}>): React.ReactElement {
    return <Provider store={store}>{children}</Provider>;
  }
  return render(ui, { wrapper: Wrapper, ...renderOptions });
}
