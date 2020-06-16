export enum ThemeActionTypes {
  SET_THEME = 'theme/SET_THEME',
}

export interface SetThemeAction {
  type: ThemeActionTypes.SET_THEME;
  theme: 'dark' | 'light';
}

export const setTheme = (theme: 'dark' | 'light'): SetThemeAction => ({
  type: ThemeActionTypes.SET_THEME,
  theme,
});

export type ThemeActions = SetThemeAction;
