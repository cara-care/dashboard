import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { App } from './App';
import withProviders from './components/withProviders';
import { renderWithRedux } from './utils/test-utils';
import { NOT_FOUND_TEXT_ID } from './utils/test-helpers';
import en from './locale/en.json';

describe('<App />', () => {
  it('landing on a bad page shows 404 page', () => {
    const AppWithProviders = withProviders(App, MemoryRouter);
    const { getByTestId } = renderWithRedux(<AppWithProviders />);
    // @ts-ignore
    expect(getByTestId(NOT_FOUND_TEXT_ID)).toHaveTextContent(
      en['404.invalidUrlGoToCara']
    );
  });
});
