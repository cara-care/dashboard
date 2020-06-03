import { Reducer, AnyAction } from 'redux';
import { LocaleActions, LocaleActionTypes } from './localeActions';
import { RootState } from '../utils/store';

export interface LocaleState {
  locale: string;
}

export const localeInitalState = {
  locale: 'en',
};

export const localeReducer: Reducer<LocaleState, AnyAction> = (
  state = localeInitalState,
  action: LocaleActions
) => {
  switch (action.type) {
    case LocaleActionTypes.SET_LOCALE:
      return {
        ...state,
        locale: action.locale,
      };
    default:
      return state;
  }
};

export const getCurrentLocale = (state: RootState) => state.locale.locale;
