import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import NavBar from '../NavBar';
import withProviders from '../withProviders';
import { authInitialState, AuthStatus } from '../../auth';
import en from '../../locale/en.json';
import { renderWithRedux } from '../../utils/test-utils';

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
});
