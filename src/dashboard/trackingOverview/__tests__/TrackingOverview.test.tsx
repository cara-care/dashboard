import React from 'react';
import user from '@testing-library/user-event';
import { waitFor } from '@testing-library/react';
import { format, subDays } from 'date-fns';
import TrackingOverview from '../TrackingOverview';
import withProviders from '../../../components/withProviders';
import { trackingOverviewInitalState } from '../redux/trackingOverview';
import { renderWithRedux } from '../../../utils/test-utils';
import { getTrackingDataPoints as mockGetTrackingDataPoints } from '../../../utils/api';
import en from '../../../locale/en.json';

jest.mock('../../../utils/api');

describe('<TrackingOverview />', () => {
  const TrackingOverviewWithProviders = withProviders(TrackingOverview);
  const emptyResult = {
    status: 200,
    statusText: 'OK',
    headers: {},
    config: {},
    data: {
      count: 0,
      next: null,
      previous: null,
      results: [],
    },
  };

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

  it('fetches data for previous/next day when clicked on "<" or ">" buttons', async () => {
    // @ts-ignore
    mockGetTrackingDataPoints.mockResolvedValueOnce(emptyResult);
    const screen = renderWithRedux(<TrackingOverviewWithProviders />, {
      preloadedState: {
        auth: { patientId: 1 },
        trackingOverview: {
          date: new Date(),
          isFetching: false,
          inValidToken: false,
          page: 0,
          data: [],
          error: null,
        },
      },
    });
    const [previous, next] = screen.getAllByRole('button');
    const input = screen.getByRole('textbox');
    expect(input).toHaveValue(format(new Date(), 'MM/dd/yyyy'));

    // @ts-ignore
    mockGetTrackingDataPoints.mockResolvedValueOnce(emptyResult);

    user.click(previous);
    expect(mockGetTrackingDataPoints).toHaveBeenCalledTimes(1);
    expect(mockGetTrackingDataPoints).toBeCalledWith({
      userId: 1,
      start: format(subDays(new Date(), 1), 'yyyy-MM-dd'),
      end: format(subDays(new Date(), 1), 'yyyy-MM-dd'),
      limit: 100,
      offset: 0,
    });
    expect(input).toHaveValue(format(subDays(new Date(), 1), 'MM/dd/yyyy'));
    await waitFor(() => {
      expect(
        screen.getByText(en['overview.trackingOverview.noTrackingData'])
      ).toBeVisible();
    });

    // @ts-ignore
    mockGetTrackingDataPoints.mockResolvedValueOnce(emptyResult);

    user.click(next);
    expect(mockGetTrackingDataPoints).toHaveBeenCalledTimes(2);
    expect(input).toHaveValue(format(new Date(), 'MM/dd/yyyy'));
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
