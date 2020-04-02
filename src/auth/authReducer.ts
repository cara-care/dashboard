import { Reducer } from 'redux';
import { AuthActions, AuthActionTypes } from './authActions';
import { RootState } from '../utils/store';

export enum AuthStatus {
  IDLE = 'IDLE',
  FETCHING = 'FETCHING',
  AUTHENTICATED = 'AUTHENTICATED',
  USER_AUTHENTICATED = 'USER_AUTHENTICATED',
  ERROR = 'ERROR',
}

export interface AuthState {
  status: AuthStatus;
  error: Error | null;
  patientId: number | null;
  isSelectingPatient: boolean;
  patientNickname: string | null;
}

export const authInitialState = {
  status: AuthStatus.IDLE,
  isSelectingPatient: false,
  patientId: null,
  patientNickname: null,
  error: null,
};

export const authReducer: Reducer<AuthState, AuthActions> = (
  state = authInitialState,
  action: AuthActions
) => {
  switch (action.type) {
    case AuthActionTypes.LOGIN_INIT:
    case AuthActionTypes.TRY_AUTO_LOGIN:
      return {
        ...state,
        status: AuthStatus.FETCHING,
        error: null,
      };
    case AuthActionTypes.TRY_AUTO_LOGIN_FAILED:
      return {
        ...state,
        status: AuthStatus.IDLE,
      };
    case AuthActionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        status: AuthStatus.AUTHENTICATED,
      };
    case AuthActionTypes.LOGIN_FAILED:
      return {
        ...state,
        status: AuthStatus.ERROR,
        error: action.error,
      };
    case AuthActionTypes.SELECT_PATIENT_INIT:
      return {
        ...state,
        isSelectingPatient: true,
        error: null,
      };
    case AuthActionTypes.SELECT_PATIENT_SUCCESS:
      return {
        ...state,
        isSelectingPatient: false,
        patientId: action.id,
        patientNickname: action.nickname,
      };
    case AuthActionTypes.SELECT_PATIENT_FAILED:
      return {
        ...state,
        isSelectingPatient: false,
        error: action.error,
      };
    case AuthActionTypes.UNSELECT_PATIENT:
      return {
        ...state,
        patientId: null,
        patientNickname: null,
      };
    case AuthActionTypes.RESET_ERROR:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const isAuthenticating = (state: RootState) =>
  state.auth.status === AuthStatus.FETCHING;

export const isAuthenticated = (state: RootState) =>
  state.auth.status === AuthStatus.AUTHENTICATED;

export const getPatientId = (state: RootState) => state.auth.patientId;

export const hasPatientId = (state: RootState) => !!state.auth.patientId;

export const isSelectingPatient = (state: RootState) =>
  state.auth.isSelectingPatient;

export const hasError = (state: RootState) => !!state.auth.error;

export const getPatientNickname = (state: RootState) =>
  state.auth.patientNickname;
