import { takeLatest, put, call } from 'redux-saga/effects';
import {
  tryAutoLoginFailedAction,
  loginSuccessAction,
  loginFailedAction,
  selectPatientSuccessAction,
  selectPatientFailedAction,
  logoutSuccessAction,
  logoutFailedAction,
  AuthActionTypes,
  LoginInitAction,
  SelectPatientInitAction,
} from './authActions';
import { getMe, login, logout, getUserByEmail } from '../utils/api';

export function* rootAuthSaga() {
  yield takeLatest(AuthActionTypes.TRY_AUTO_LOGIN, autoLoginSaga);
  yield takeLatest(AuthActionTypes.LOGIN_INIT, loginSaga);
  yield takeLatest(AuthActionTypes.SELECT_PATIENT_INIT, fetchPatientSaga);
  yield takeLatest(AuthActionTypes.LOGOUT_INIT, logoutSaga);
}

export function* autoLoginSaga() {
  try {
    yield call(getMe);
    yield put(loginSuccessAction());
  } catch (_) {
    yield put(tryAutoLoginFailedAction());
  }
}

export function* loginSaga({ username, password }: LoginInitAction) {
  try {
    yield call(() => login({ username, password }));
    yield put(loginSuccessAction());
  } catch (err) {
    yield put(loginFailedAction(err));
  }
}

export function* logoutSaga() {
  try {
    yield call(logout);
    yield put(logoutSuccessAction());
  } catch (err) {
    yield put(logoutFailedAction(err));
  }
}

export function* fetchPatientSaga({ email, history, route }: SelectPatientInitAction) {
  try {
    const res = yield call(() => getUserByEmail(email));
    yield put(selectPatientSuccessAction(res.data));
    if(history && route) {
      history.push(route)
    }
  } catch (err) {
    yield put(selectPatientFailedAction(err));
  }
}
