import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import withProviders from '../../../components/withProviders';
import { renderWithRedux } from '../../../utils/test-utils';
import TrackingOverviewHeader from '../components/TrackingOverviewHeader';

describe('<TrackingOverviewHeader/>', () => {
  it.skip('works', () => {
    const TrackingOverviewHeaderWithProviders = withProviders(
      // @ts-ignore
      TrackingOverviewHeader,
      MemoryRouter
    );
    const { debug } = renderWithRedux(<TrackingOverviewHeaderWithProviders />);
    debug();
  });
});
