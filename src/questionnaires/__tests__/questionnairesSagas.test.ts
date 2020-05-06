import { runSaga } from 'redux-saga';
import mockAxios from 'jest-mock-axios';
import { fetchSumbissionsSaga } from '../questionnairesSagas';
import * as actions from '../questionnairesActions';
import { mockResult } from '../testUtils';

describe('qustionnairesSagas', () => {
  const dispatch = (action: actions.QuestionnairesActions) =>
    dispatched.push(action);
  const getState = () => ({
    auth: { patientId: 1 },
    questionnaires: { limit: 100 },
  });
  const successResponse = {
    data: mockResult,
    status: 200,
    statusText: 'OK',
    headers: {},
    config: {},
  };
  let dispatched: actions.QuestionnairesActions[] = [];

  beforeEach(() => {
    dispatched = [];
  });

  afterEach(() => {
    mockAxios.reset();
  });

  test('[fetchSumbissionsSaga] - dispatches [questionnaires] FETCH_SUBMISSIONS_PAGE_SUCCESS on successful response', () => {
    runSaga(
      { dispatch, getState },
      fetchSumbissionsSaga,
      actions.fetchSubmissionsPageInit(0)
    ).toPromise();
    mockAxios.mockResponse(successResponse);
    expect(dispatched).toContainEqual(
      actions.fetchSubmissionsPageSuccess({
        submissions: mockResult.results,
        count: mockResult.count,
        previous: mockResult.previous,
        next: mockResult.next,
      })
    );
  });

  test('[fetchSumbissionsSaga] - dispatches [questionnaires] FETCH_SUBMISSIONS_PAGE_FAILED if no patientSelected', () => {
    runSaga(
      {
        dispatch,
        getState: () => ({
          auth: { patientId: null },
          questionnaires: { limit: 100 },
        }),
      },
      fetchSumbissionsSaga,
      actions.fetchSubmissionsPageInit(0)
    ).toPromise();
    expect(dispatched).toContainEqual(
      actions.fetchSubmissionsPageFailed(Error('No patient selected'))
    );
  });

  test('[fetchSumbissionsSaga] - dispatches [questionnaires] FETCH_SUBMISSIONS_PAGE_FAILED on error', () => {
    runSaga(
      { dispatch, getState },
      fetchSumbissionsSaga,
      actions.fetchSubmissionsPageInit(0)
    ).toPromise();
    const error = { name: 'Error', message: 'Failed to fetch submissions' };
    mockAxios.mockError(error);
    expect(dispatched).toContainEqual(
      actions.fetchSubmissionsPageFailed(error)
    );
  });
});
