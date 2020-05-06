import mockAxios from 'jest-mock-axios';
import { runSaga } from 'redux-saga';
import * as authSagas from '../authSagas';
import * as actions from '../authActions';
import { AuthActions } from '../authActions';

describe('authSagas', () => {
  const dispatch = (action: AuthActions) => dispatched.push(action);
  const getState = () => ({});
  const successResponse = {
    data: {},
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
    expect(dispatched).toContainEqual(actions.loginSuccessAction());
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
      })
    ).toPromise();
    mockAxios.mockResponse(successResponse);
    expect(dispatched).toContainEqual(actions.loginSuccessAction());
  });

  it('[loginSaga] - dispatches auth/LOGIN_FAILED on error', () => {
    runSaga(
      { dispatch, getState },
      authSagas.loginSaga,
      actions.loginInitAction({
        username: 'user',
        password: 'password',
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
});
