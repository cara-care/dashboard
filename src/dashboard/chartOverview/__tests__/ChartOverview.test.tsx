import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import ChartOverview from '../ChartOverview';
import { chartOverviewInitialState } from '../redux/chartOverview';
import withProviders from '../../../components/withProviders';
import { renderWithRedux } from '../../../utils/test-utils';
import { EXPORT_TOKEN_INVALID } from '../../../utils/test-helpers';
import en from '../../../locale/en.json';

describe('<ChartOverview />', () => {
  const ChartOverviewWithProviders = withProviders(ChartOverview, MemoryRouter);

  it('renders a spinner when fetching data', () => {
    const screen = renderWithRedux(<ChartOverviewWithProviders />, {
      preloadedState: {
        chartOverview: {
          ...chartOverviewInitialState,
          isFetching: true,
        },
      },
    });
    expect(screen.getByText(en['common.loadingData'])).toBeVisible();
  });

  it('renders an error message if the token is invalid', () => {
    const screen = renderWithRedux(<ChartOverviewWithProviders />, {
      preloadedState: {
        chartOverview: {
          ...chartOverviewInitialState,
          invalidToken: true,
        },
      },
    });
    expect(screen.getByTestId(EXPORT_TOKEN_INVALID)).toBeVisible();
  });
});
