import mockAxios from 'jest-mock-axios';
import { runSaga } from 'redux-saga';
import * as authSagas from '../authSagas';
import * as actions from '../authActions';
import { AuthActions } from '../authActions';

describe('authSagas', () => {
  const dispatch = (action: AuthActions) => dispatched.push(action);
  const getState = () => ({});
  const mePayload = {
    firstName: 'Test',
    lastName: 'User',
  };
  const successResponse = {
    data: mePayload,
    status: 200,
    statusText: 'OK',
    headers: {},
    config: {},
  };
  let dispatched: AuthActions[] = [];

  beforeEach(() => {
    dispatched = [];
  });

  afterEach(() => {
    mockAxios.reset();
  });

  it('[autoLoginSaga] - dispatches auth/LOGIN_SUCCESS on successful response', () => {
    runSaga({ dispatch, getState }, authSagas.autoLoginSaga).toPromise();
    mockAxios.mockResponseFor({ url: '/dashboard/me/' }, successResponse);
    expect(dispatched).toContainEqual(actions.loginSuccessAction(mePayload));
  });

  it('[autoLoginSaga] - dispatches auth/TRY_AUTO_LOGIN_FAILED on error', () => {
    runSaga({ dispatch, getState }, authSagas.autoLoginSaga).toPromise();
    mockAxios.mockError();
    expect(dispatched).toContainEqual(actions.tryAutoLoginFailedAction());
  });

  it('[loginSaga] - dispatches auth/LOGIN_SUCCESS on successful response', () => {
    runSaga(
      { dispatch, getState },
      authSagas.loginSaga,
      actions.loginInitAction({
        username: 'user',
        password: 'password',
        otp_token: 'otp_token',
      })
    ).toPromise();
    mockAxios.mockResponseFor({ url: '/dashboard/login/' }, successResponse);
    mockAxios.mockResponseFor({ url: '/dashboard/me/' }, successResponse);
    expect(dispatched).toContainEqual(actions.loginSuccessAction(mePayload));
  });

  it('[loginSaga] - dispatches auth/LOGIN_FAILED on error', () => {
    runSaga(
      { dispatch, getState },
      authSagas.loginSaga,
      actions.loginInitAction({
        username: 'user',
        password: 'password',
        otp_token: 'otp_token',
      })
    ).toPromise();
    const err = { name: 'Error', message: 'login failed' };
    mockAxios.mockError(err);
    expect(dispatched).toContainEqual(actions.loginFailedAction(err));
  });

  it('[logoutSaga] - dispatches auth/LOGOUT_SUCCESS on successful response', () => {
    runSaga({ dispatch, getState }, authSagas.logoutSaga).toPromise();
    mockAxios.mockResponse(successResponse);
    expect(dispatched).toContainEqual(actions.logoutSuccessAction());
  });

  it('[logoutSaga] - dispatches auth/LOGOUT_FAILEd on error', () => {
    runSaga({ dispatch, getState }, authSagas.logoutSaga).toPromise();
    const err = { name: 'Error', message: 'logout failed' };
    mockAxios.mockError(err);
    expect(dispatched).toContainEqual(actions.logoutFailedAction(err));
  });

  it('[fetchPatientSaga] - dispatches auth/SELECT_PATIENT_SUCCESS on successful response', () => {
    const user = {
      id: 1,
      nickname: 'tester',
      timezone: 'Europe/Berlin',
      enrolledProgrammes: [],
    };
    runSaga(
      { dispatch, getState },
      authSagas.fetchPatientSaga,
      actions.selectPatientInitAction('user@example.com')
    ).toPromise();
    mockAxios.mockResponse({
      ...successResponse,
      data: user,
    });
    expect(dispatched).toContainEqual(actions.selectPatientSuccessAction(user));
  });

  it('[fetchPatientSaga] - dispatches auth/SELECT_PATIENT_FAILED on error', () => {
    runSaga(
      { dispatch, getState },
      authSagas.fetchPatientSaga,
      actions.selectPatientInitAction('user@example.com')
    ).toPromise();
    const err = { name: 'Error', message: 'user not found' };
    mockAxios.mockError(err);
    expect(dispatched).toContainEqual(actions.selectPatientFailedAction(err));
  });
});
