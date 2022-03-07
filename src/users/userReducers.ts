import {Reducer} from "redux";
import {UsersActions, UsersActionTypes} from "./userActions";

export const revokeAccessInitialState = {
  error: null,
  message: '',
};

export interface RevokeAccessState {
  error: Error | null;
  message: string,
}

export const revokeAccessReducer: Reducer<
  RevokeAccessState,
  UsersActions
  > = (state = revokeAccessInitialState, action) => {
  switch (action.type) {
    case UsersActionTypes.REVOKE_USERS_ACCESS_SUCCESS:
      return {
        ...state,
        error: null,
        message: action.message,
      };
    case UsersActionTypes.REVOKE_USERS_ACCESS_FAILED:
      return {
        ...state,
        error: action.error,
      };
    default:
      return state;
  }
};
