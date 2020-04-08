export enum AuthActionTypes {
  LOGIN_INIT = 'auth/LOGIN_INIT',
  LOGIN_SUCCESS = 'auth/LOGIN_SUCCESS',
  LOGIN_FAILED = 'auth/LOGIN_FAILED',
  LOGOUT_INIT = 'auth/LOGOUT_INIT',
  LOGOUT_SUCCESS = 'auth/LOGOUT_SUCCESS',
  LOGOUT_FAILED = 'auth/LOGOUT_FAILED',
  SELECT_PATIENT_INIT = 'auth/SELECT_PATIENT_INIT',
  SELECT_PATIENT_SUCCESS = 'auth/SELECT_PATIENT_SUCCESS',
  SELECT_PATIENT_FAILED = 'auth/SELECT_PATIENT_FAILED',
  UNSELECT_PATIENT = 'auth/UNSELECT_PATIENT',
  RESET_ERROR = 'auth/RESET_ERROR',
  TRY_AUTO_LOGIN = 'auth/TRY_AUTO_LOGIN',
  TRY_AUTO_LOGIN_FAILED = 'auth/TRY_AUTO_LOGIN_FAILED',
}

export interface LoginInitAction {
  type: AuthActionTypes.LOGIN_INIT;
  username: string;
  password: string;
}

export const loginInitAction = ({
  username,
  password,
}: {
  username: string;
  password: string;
}): LoginInitAction => ({
  type: AuthActionTypes.LOGIN_INIT,
  username,
  password,
});

export interface LoginSuccessAction {
  type: AuthActionTypes.LOGIN_SUCCESS;
}

export const loginSuccessAction = (): LoginSuccessAction => ({
  type: AuthActionTypes.LOGIN_SUCCESS,
});

export interface LoginFailedAction {
  type: AuthActionTypes.LOGIN_FAILED;
  error: Error;
}

export const loginFailedAction = (error: Error): LoginFailedAction => ({
  type: AuthActionTypes.LOGIN_FAILED,
  error,
});

export interface LogoutInitAction {
  type: AuthActionTypes.LOGOUT_INIT;
}

export const logoutInitAction = (): LogoutInitAction => ({
  type: AuthActionTypes.LOGOUT_INIT,
});

export interface LogoutSuccessAction {
  type: AuthActionTypes.LOGOUT_SUCCESS;
}

export const logoutSuccessAction = (): LogoutSuccessAction => ({
  type: AuthActionTypes.LOGOUT_SUCCESS,
});

export interface LogoutFailedAction {
  type: AuthActionTypes.LOGOUT_FAILED;
  error: Error;
}

export const logoutFailedAction = (error: Error): LogoutFailedAction => ({
  type: AuthActionTypes.LOGOUT_FAILED,
  error,
});

export interface SelectPatientInitAction {
  type: AuthActionTypes.SELECT_PATIENT_INIT;
  email: string;
}

export const selectPatientInitAction = (
  email: string
): SelectPatientInitAction => ({
  type: AuthActionTypes.SELECT_PATIENT_INIT,
  email,
});

export interface SelectPatientSuccessAction {
  type: AuthActionTypes.SELECT_PATIENT_SUCCESS;
  id: number;
  nickname: string;
  timezone: string;
}

export const selectPatientSuccessAction = ({
  id,
  nickname,
  timezone,
}: {
  id: number;
  nickname: string;
  timezone: string;
}): SelectPatientSuccessAction => ({
  type: AuthActionTypes.SELECT_PATIENT_SUCCESS,
  id,
  nickname,
  timezone,
});

export interface SelectPatientFailedAction {
  type: AuthActionTypes.SELECT_PATIENT_FAILED;
  error: Error;
}

export const selectPatientFailedAction = (
  error: Error
): SelectPatientFailedAction => ({
  type: AuthActionTypes.SELECT_PATIENT_FAILED,
  error,
});

export interface UnselectPatientAction {
  type: AuthActionTypes.UNSELECT_PATIENT;
}

export const unselectPatientAction = (): UnselectPatientAction => ({
  type: AuthActionTypes.UNSELECT_PATIENT,
});

export interface ResetErrorAction {
  type: AuthActionTypes.RESET_ERROR;
}

export const resetErrorAction = (): ResetErrorAction => ({
  type: AuthActionTypes.RESET_ERROR,
});

export interface TryAutoLoginAction {
  type: AuthActionTypes.TRY_AUTO_LOGIN;
}

export const tryAutoLoginAction = (): TryAutoLoginAction => ({
  type: AuthActionTypes.TRY_AUTO_LOGIN,
});

export interface TryAutoLoginFailedAction {
  type: AuthActionTypes.TRY_AUTO_LOGIN_FAILED;
}

export const tryAutoLoginFailedAction = (): TryAutoLoginFailedAction => ({
  type: AuthActionTypes.TRY_AUTO_LOGIN_FAILED,
});

export type AuthActions =
  | LoginInitAction
  | LoginSuccessAction
  | LoginFailedAction
  | LogoutInitAction
  | LogoutSuccessAction
  | LogoutFailedAction
  | SelectPatientInitAction
  | SelectPatientSuccessAction
  | SelectPatientFailedAction
  | UnselectPatientAction
  | ResetErrorAction
  | TryAutoLoginAction
  | TryAutoLoginFailedAction;
