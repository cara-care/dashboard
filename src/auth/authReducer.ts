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

export interface MePayload {
  firstName: string;
  lastName: string;
  groups: any | null;
}

export interface AuthState {
  status: AuthStatus;
  nutriName: string;
  groups: any | null;
  error: any | null;
  patientId: number | null;
  isSelectingPatient: boolean;
  patientNickname: string | null;
  patientTimezone: string | null;
  patientEnrolledPrograms: EnrolledProgram[];
}

export interface EnrolledProgram {
  id: number;
  type: 'programme';
  title: string;
  image: string;
  duration: string;
  started: string;
  video: string;
  videoDuration: number;
  videoCaptions: string;
}

export const authInitialState = {
  status: AuthStatus.IDLE,
  nutriName: '',
  groups: [],
  isSelectingPatient: false,
  patientId: null,
  patientNickname: null,
  patientTimezone: null,
  patientEnrolledPrograms: [],
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
    case AuthActionTypes.LOGOUT_INIT:
      return {
        ...state,
        error: null,
      };
    case AuthActionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        status: AuthStatus.AUTHENTICATED,
        nutriName: `${action.payload.firstName} ${action.payload.lastName}`,
        groups: action.payload.groups,
      };
    case AuthActionTypes.LOGIN_FAILED:
    case AuthActionTypes.LOGOUT_FAILED:
      return {
        ...state,
        status: AuthStatus.ERROR,
        error: action.error,
      };
    case AuthActionTypes.TRY_AUTO_LOGIN_FAILED:
    case AuthActionTypes.LOGOUT_SUCCESS:
      return authInitialState;
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
        patientTimezone: action.timezone,
        patientEnrolledPrograms: action.enrolledProgrammes,
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
        patientTimezone: null,
        patientEnrolledPrograms: [],
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

export const getNutriName = (state: RootState) => state.auth.nutriName;
export const getUserGroups = (state: RootState) => state.auth.groups;

export const getPatientId = (state: RootState) => state.auth.patientId;

export const hasPatientId = (state: RootState) => !!state.auth.patientId;

export const isSelectingPatient = (state: RootState) =>
  state.auth.isSelectingPatient;

export const hasError = (state: RootState) => !!state.auth.error;

export const getPatientNickname = (state: RootState) =>
  state.auth.patientNickname;

export const getPatientTimezone = (state: RootState) =>
  state.auth.patientTimezone;

export const getPatientEnrolledPrograms = (state: RootState) =>
  state.auth.patientEnrolledPrograms;
