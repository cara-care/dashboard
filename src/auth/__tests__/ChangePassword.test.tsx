import React from 'react';
import { MemoryRouter, Redirect as MockRedirect } from 'react-router-dom';
import user from '@testing-library/user-event';
import { waitFor } from '@testing-library/react';
import { authInitialState, AuthStatus } from '../authReducer';
import withProviders from '../../components/withProviders';
import { renderWithRedux } from '../../utils/test-utils';
import ChangePassword from '../pages/ChangePassword';
import { changePassword as mockChangePassword } from '../../utils/api';

jest.mock('../../utils/api');
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  Redirect: jest.fn(() => null),
}));

describe('<ChangePassword />', () => {
  const ChangePasswordWithProviders = withProviders(
    ChangePassword,
    MemoryRouter
  );

  it('redirects to login page if not authenticated', () => {
    renderWithRedux(<ChangePasswordWithProviders />);
    expect(MockRedirect).toHaveBeenCalledWith({ to: '/nutri/login' }, {});
  });

  it('shows a dismissable success alert after submitting the form', async () => {
    const testData = {
      currentPassword: 'password',
      newPassword: 'new-password',
    };
    const {
      getByLabelText,
      getByText,
      getByRole,
      queryByRole,
    } = renderWithRedux(<ChangePasswordWithProviders />, {
      preloadedState: {
        auth: {
          ...authInitialState,
          status: AuthStatus.AUTHENTICATED,
        },
      },
    });
    const currentPasswordInput = getByLabelText(/^current password/i);
    const newPasswordInput = getByLabelText(/^new password/i);
    const submitButton = getByRole('button', { name: 'Change Password' });
    user.type(currentPasswordInput, testData.currentPassword);
    user.type(newPasswordInput, testData.newPassword);
    user.click(submitButton);
    await waitFor(() => {
      expect(mockChangePassword).toHaveBeenCalledTimes(1);
    });
    expect(mockChangePassword).toBeCalledWith(testData);
    expect(getByRole('alert')).toBeVisible();
    expect(getByText(/your password has been updated/i)).toBeVisible();
    user.click(getByLabelText(/close/i));
    await waitFor(() => {
      expect(queryByRole('alert')).toBeNull();
    });
  });
});
