import React from 'react';
import user from '@testing-library/user-event';
import moment from 'moment';
import TrackingOverview from '../TrackingOverview';
import withProviders from '../../../components/withProviders';
import { trackingOverviewInitalState } from '../redux/trackingOverview';
import { renderWithRedux } from '../../../utils/test-utils';
import en from '../../../locale/en.json';

describe('<TrackingOverview />', () => {
  const TrackingOverviewWithProviders = withProviders(TrackingOverview);

  it('shows a spinner when fetching', () => {
    const screen = renderWithRedux(<TrackingOverviewWithProviders />, {
      preloadedState: {
        trackingOverview: {
          ...trackingOverviewInitalState,
          isFetching: true,
        },
      },
    });
    expect(screen.getByText(en['common.loadingData'])).toBeVisible();
  });

  it("renders a message if there's no data", () => {
    const screen = renderWithRedux(<TrackingOverviewWithProviders />);
    expect(
      screen.getByText(en['overview.trackingOverview.noTrackingData'])
    ).toBeVisible();
  });

  it('renders an error message when the token is invalid and disables next/prev buttons', () => {
    const screen = renderWithRedux(<TrackingOverviewWithProviders />, {
      preloadedState: {
        trackingOverview: {
          ...trackingOverviewInitalState,
          invalidToken: true,
        },
      },
    });
    const buttons = screen.getAllByRole('button');
    buttons.forEach((button) => expect(button).toBeDisabled());
    expect(screen.getByText(en['overview.invalidExportToken'])).toBeVisible();
  });

  it('renders tracking data', () => {
    const screen = renderWithRedux(<TrackingOverviewWithProviders />, {
      preloadedState: {
        trackingOverview: {
          ...trackingOverviewInitalState,
          data: getMockData(),
        },
      },
    });
    expect(screen.getByText(/^bloating$/i)).toBeVisible();
    expect(screen.getByText(/^food$/i)).toBeVisible();
  });

  it('disables ">" button when next day is in the future', () => {
    const screen = renderWithRedux(<TrackingOverviewWithProviders />);
    const [, next] = screen.getAllByRole('button');
    expect(next).toBeDisabled();
  });

  it('shows previous/next day when clicked on "<" or ">" buttons', () => {
    const screen = renderWithRedux(<TrackingOverviewWithProviders />);
    const [previous, next] = screen.getAllByRole('button');
    const input = screen.getByRole('textbox');

    expect(input).toHaveValue(moment().format('L'));

    user.click(previous);
    expect(input).toHaveValue(moment().subtract(1, 'days').format('L'));

    user.click(next);
    expect(input).toHaveValue(moment().format('L'));
  });
});

function getMockData() {
  return [
    {
      type: 'bloating',
      value: 50,
      text: null,
      tags: null,
      timestampTracking: '2019-08-01T20:13:00Z',
      timestampEntry: '2019-08-07T20:13:55.747000Z',
      timestampLastModified: '2019-08-07T20:13:55.747000Z',
      userDateTracking: '2019-08-01',
    },
    {
      type: 'food',
      value: null,
      text: null,
      tags: null,
      timestampTracking: '2019-08-01T20:13:00Z',
      timestampEntry: '2019-08-07T20:13:55.752000Z',
      timestampLastModified: '2019-08-07T20:13:55.749000Z',
      userDateTracking: '2019-08-01',
      mealItems: [
        {
          realmIdString: 'd3f3dc80-b94f-11e9-9e01-d3222086acb1',
          name: 'Crunchy peanut butter',
          foodItems: [
            {
              name_de: 'Zucker (weiss)',
              name_en: 'sugar (white)',
            },
            {
              name_de: 'Salz',
              name_en: 'Salt',
            },
            {
              name_de: 'Erdnüsse',
              name_en: 'Peanut',
            },
          ],
          customFoodItems: [],
          hasImage: true,
        },
      ],
    },
  ];
}
