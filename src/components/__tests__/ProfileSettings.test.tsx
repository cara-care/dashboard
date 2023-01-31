import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import ProfileSettings from '../ProfileSettings';
import withProviders from '../withProviders';
import { authInitialState, AuthStatus } from '../../auth';
import en from '../../locale/en.json';
import { renderWithRedux } from '../../utils/test-utils';

describe('<ProfileSettings />', () => {
  const ProfileSettingsWithProviders = withProviders(
    ProfileSettings,
    MemoryRouter
  );

  it('renders change password and logout buttons when authenticated', () => {
    const { getByLabelText } = renderWithRedux(
      <ProfileSettingsWithProviders />,
      {
        preloadedState: {
          auth: {
            ...authInitialState,
            status: AuthStatus.AUTHENTICATED,
          },
        },
      }
    );
    expect(getByLabelText(en['changePassword.changePassword'])).toBeVisible();
  });
});
