import { Reducer } from 'redux';
import { ThemeActions, ThemeActionTypes } from './themeActions';

export interface ThemeState {
  theme: 'dark' | 'light' | undefined | null;
}

export const themeInitalState = {
  theme: undefined,
};

export const themeReducer: Reducer<ThemeState, ThemeActions> = (
  state = themeInitalState,
  action: ThemeActions
) => {
  switch (action.type) {
    case ThemeActionTypes.SET_THEME:
      return {
        ...state,
        theme: action.theme,
      };
    default:
      return state;
  }
};
