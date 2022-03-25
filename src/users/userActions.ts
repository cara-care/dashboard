export enum UsersActionTypes {
  REVOKE_USERS_ACCESS_SUCCESS = 'REVOKE_USERS_ACCESS_SUCCESS',
  REVOKE_USERS_ACCESS_FAILED = 'REVOKE_USERS_ACCESS_FAILED',
  FETCH_USER_QR_CODE_SUCCESS = 'FETCH_USER_QR_CODE_SUCCESS',
  FETCH_USER_QR_CODE_FAILED = 'FETCH_USER_QR_CODE_FAILED',
}

export interface RevokeUsersAccessSuccessAction {
  type: UsersActionTypes.REVOKE_USERS_ACCESS_SUCCESS;
  message: string
}

export const RevokeUsersAccessSuccess = ({message}: {
  message: string;
}): RevokeUsersAccessSuccessAction => ({
  type: UsersActionTypes.REVOKE_USERS_ACCESS_SUCCESS,
  message,
});


export interface RevokeUsersAccessFailedAction {
  type: UsersActionTypes.REVOKE_USERS_ACCESS_FAILED;
  error: Error;
}

export const RevokeUsersAccessFailed = (
  error: Error
): RevokeUsersAccessFailedAction => ({
  type: UsersActionTypes.REVOKE_USERS_ACCESS_FAILED,
  error,
});

export interface FetchUsersQrCodeSuccessAction {
  type: UsersActionTypes.FETCH_USER_QR_CODE_SUCCESS;
  url: string
}

export const FetchUsersQrCodeSuccess = ({url}: {
  url: string;
}): FetchUsersQrCodeSuccessAction => ({
  type: UsersActionTypes.FETCH_USER_QR_CODE_SUCCESS,
  url,
});

export interface FetchUsersQrCodeFailedAction {
  type: UsersActionTypes.FETCH_USER_QR_CODE_FAILED;
  error: Error;
}

export const FetchUsersQrCodeFailed = (
  error: Error
): FetchUsersQrCodeFailedAction => ({
  type: UsersActionTypes.FETCH_USER_QR_CODE_FAILED,
  error,
});

export type UsersActions =
  | RevokeUsersAccessSuccessAction
  | RevokeUsersAccessFailedAction
  | FetchUsersQrCodeSuccessAction
  | FetchUsersQrCodeFailedAction;
