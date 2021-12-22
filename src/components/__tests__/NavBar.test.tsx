import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import user from '@testing-library/user-event';
import NavBar from '../NavBar';
import withProviders from '../withProviders';
import { authInitialState, AuthStatus } from '../../auth';
import en from '../../locale/en.json';
import { renderWithRedux } from '../../utils/test-utils';
import {
  LANGUAGE_MENU_BUTTON,
  DARK_MODE_ICON,
  LIGHT_MODE_ICON,
} from '../../utils/test-helpers';

describe('<NavBar />', () => {
  const NavBarWithProviders = withProviders(NavBar, MemoryRouter);

  it("doesn't render change password, logout and select patient buttons when not authenticated", () => {
    const { queryByLabelText, queryByText } = renderWithRedux(
      <NavBarWithProviders />
    );
    expect(queryByLabelText(en['changePassword.changePassword'])).toBeNull();
    expect(queryByLabelText(en['_.common.logout'])).toBeNull();
    expect(queryByText(en['navbar.selectDifferentPatient'])).toBeNull();
  });

  it('renders change password and logout buttons when authenticated', () => {
    const { getByLabelText } = renderWithRedux(<NavBarWithProviders />, {
      preloadedState: {
        auth: {
          ...authInitialState,
          status: AuthStatus.AUTHENTICATED,
        },
      },
    });
    expect(getByLabelText(en['changePassword.changePassword'])).toBeVisible();
    expect(getByLabelText(en['_.common.logout'])).toBeVisible();
  });

  it('renders select different patient button when patient is selected', () => {
    if (process.env.REACT_APP_LOCATION === 'GLOBAL') {
      const { getByText } = renderWithRedux(<NavBarWithProviders />, {
        preloadedState: {
          auth: {
            ...authInitialState,
            status: AuthStatus.AUTHENTICATED,
            patientId: 1,
          },
        },
      });
      expect(
        getByText(new RegExp(en['navbar.selectDifferentPatient'], 'i'))
      ).toBeVisible();
    }
  });

  it('changes language when selecting a diffrent language in menu', () => {
    const { getByTestId, getByText } = renderWithRedux(<NavBarWithProviders />);
    const languageMenuButton = getByTestId(LANGUAGE_MENU_BUTTON);
    user.click(languageMenuButton);
    user.click(getByText(/deutsch/i));
    expect(languageMenuButton).toHaveTextContent(/deutsch/i);
  });

  it('toggles dark / light mode', () => {
    const { getByLabelText, getByTestId } = renderWithRedux(
      <NavBarWithProviders />
    );
    const toggleThemeButton = getByLabelText(en['navbar.toggleTheme']);
    expect(getByTestId(LIGHT_MODE_ICON)).toBeVisible();
    user.click(toggleThemeButton);
    expect(getByTestId(DARK_MODE_ICON)).toBeVisible();
    user.click(toggleThemeButton);
    expect(getByTestId(LIGHT_MODE_ICON)).toBeVisible();
  });
});
