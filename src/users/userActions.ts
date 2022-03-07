export enum UsersActionTypes {
  REVOKE_USERS_ACCESS_SUCCESS = 'REVOKE_USERS_ACCESS_SUCCESS',
  REVOKE_USERS_ACCESS_FAILED = 'REVOKE_USERS_ACCESS_FAILED',
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

export type UsersActions =
  | RevokeUsersAccessSuccessAction
  | RevokeUsersAccessFailedAction;
