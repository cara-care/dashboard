export enum LocaleActionTypes {
  SET_LOCALE = 'locale/SET_LOCALE',
}

export interface SetLocaleAction {
  type: LocaleActionTypes.SET_LOCALE;
  locale: string;
}

export const setLocale = (locale: string): SetLocaleAction => ({
  type: LocaleActionTypes.SET_LOCALE,
  locale,
});

export type LocaleActions = SetLocaleAction;
