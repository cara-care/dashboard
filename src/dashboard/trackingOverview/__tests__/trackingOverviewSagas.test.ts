import mockAxios from 'jest-mock-axios';
import { runSaga } from 'redux-saga';
import * as trackingSagas from '../redux/trackingOverviewSagas';
import * as actions from '../redux/trackingOverviewActions';

describe('trackingOverviewSagas', () => {
  let dispatched: actions.TrackingOverviewActions[] = [];
  const dispatch = (action: actions.TrackingOverviewActions) =>
    dispatched.push(action);

  beforeEach(() => {
    dispatched = [];
  });

  afterEach(() => {
    mockAxios.reset();
  });

  it('[fetchTrackingDataPageSaga] - dispatches FETCH_TRACKING_DATA_PAGE_SUCCESS with next page', () => {
    runSaga(
      {
        dispatch,
        getState: () => ({
          auth: { userId: 1 },
          trackingOverview: {
            date: new Date(),
            page: 0,
          },
        }),
      },
      trackingSagas.fetchTrackingDataPageSaga
    ).toPromise();
    const successResponse = {
      data: {
        next: 'https://example.com/api/?page=2',
        results: [],
      },
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {},
    };
    mockAxios.mockResponse(successResponse);
    expect(dispatched).toContainEqual(
      actions.fetchTrackingDataPageSuccess({
        data: successResponse.data.results,
        next: 1,
      })
    );
  });

  it('[fetchTrackingDataPageSaga] - dispatches FETCH_TRACKING_DATA_PAGE_SUCCESS without next page', () => {
    runSaga(
      {
        dispatch,
        getState: () => ({
          auth: { userId: 1 },
          trackingOverview: {
            date: new Date(),
            page: 0,
          },
        }),
      },
      trackingSagas.fetchTrackingDataPageSaga
    ).toPromise();
    const successResponse = {
      data: {
        next: null,
        results: [],
      },
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {},
    };
    mockAxios.mockResponse(successResponse);
    expect(dispatched).toContainEqual(
      actions.fetchTrackingDataPageSuccess({
        data: successResponse.data.results,
        next: null,
      })
    );
  });

  it('[fetchTrackingDataPageSaga] - dispatches FETCH_TRACKING_DATA_FAILED if page is null', () => {
    runSaga(
      {
        dispatch,
        getState: () => ({
          auth: { userId: 1 },
          trackingOverview: {
            date: new Date(),
            page: null,
          },
        }),
      },
      trackingSagas.fetchTrackingDataPageSaga
    )
      .toPromise()
      .then(() => {
        expect(dispatched).toContainEqual(
          actions.fetchTrackingDataInvalidToken()
        );
      })
      .catch((err) => {});
  });

  it('[fetchTrackingDataPageSaga] - dispatches FETCH_TRACKING_INVALID_TOKEN on 401', () => {
    runSaga(
      {
        dispatch,
        getState: () => ({
          auth: { userId: 1 },
          trackingOverview: {
            date: new Date(),
            page: 0,
          },
        }),
      },
      trackingSagas.fetchTrackingDataPageSaga
    ).toPromise();
    const err = {
      response: { status: 401, name: 'Error', message: 'unauthorized' },
    };
    mockAxios.mockError(err);
    expect(dispatched).toContainEqual(
      actions.fetchTrackingDataInvalidToken(err as any)
    );
  });

  it('[fetchTrackingDataPageSaga] - dispatches FETCH_TRACKING_DATA_FAILED on error', () => {
    runSaga(
      {
        dispatch,
        getState: () => ({
          auth: { userId: 1 },
          trackingOverview: {
            date: new Date(),
            page: 0,
          },
        }),
      },
      trackingSagas.fetchTrackingDataPageSaga
    ).toPromise();
    const err = {
      response: { status: 400, name: 'Error', message: 'failed to fetch' },
    };
    mockAxios.mockError(err);
    expect(dispatched).toContainEqual(
      actions.fetchTrackingDataFailed(err as any)
    );
  });
});
