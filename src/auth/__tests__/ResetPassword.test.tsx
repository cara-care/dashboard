import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import user from '@testing-library/user-event';
import { waitFor } from '@testing-library/react';
import withProviders from '../../components/withProviders';
import { renderWithRedux } from '../../utils/test-utils';
import ResetPassword from '../pages/ResetPassword';
import { resetPassword as mockResetPassword } from '../../utils/api';

jest.mock('../../utils/api');

describe('<ResetPassword />', () => {
  const ResetPasswordWithProviders = withProviders(ResetPassword, MemoryRouter);
  const token = 'test-token';

  it("shows a dismissable error alert if submitted passwords don't match", async () => {
    const testData = { password: 'password', confirmPassword: 'passwort' };
    const {
      getByLabelText,
      getByRole,
      getByText,
      queryByRole,
    } = renderWithRedux(
      <ResetPasswordWithProviders location={{ search: `?token=${token}` }} />
    );
    const newPasswordInput = getByLabelText(/^new password/i);
    const confirmNewPasswordInput = getByLabelText(/^confirm new password/i);
    const submitButton = getByRole('button', { name: /reset password/i });
    user.type(newPasswordInput, testData.password);
    user.type(confirmNewPasswordInput, testData.confirmPassword);
    user.click(submitButton);
    await waitFor(() => {
      expect(getByRole('alert')).toBeVisible();
    });
    expect(getByText(/passwords don't match/i)).toBeVisible();
    user.click(getByLabelText(/close/i));
    await waitFor(() => {
      expect(queryByRole('alert')).toBeNull();
    });
  });

  it('shows a dismissable error alert if token is not provided', async () => {
    const testData = { password: 'password', confirmPassword: 'password' };
    const {
      getByLabelText,
      getByRole,
      getByText,
      queryByRole,
    } = renderWithRedux(
      <ResetPasswordWithProviders location={{ search: '' }} />
    );
    const newPasswordInput = getByLabelText(/^new password/i);
    const confirmNewPasswordInput = getByLabelText(/^confirm new password/i);
    const submitButton = getByRole('button', { name: /reset password/i });
    user.type(newPasswordInput, testData.password);
    user.type(confirmNewPasswordInput, testData.confirmPassword);
    user.click(submitButton);
    await waitFor(() => {
      expect(getByRole('alert')).toBeVisible();
    });
    expect(getByText(/token is either invalid or expired/i)).toBeVisible();
    user.click(getByLabelText(/close/i));
    await waitFor(() => {
      expect(queryByRole('alert')).toBeNull();
    });
  });

  it('shows a dismissable success alert after submitting the form', async () => {
    const testData = { password: 'password', confirmPassword: 'password' };
    const {
      getByLabelText,
      getByRole,
      getByText,
      queryByRole,
    } = renderWithRedux(
      <ResetPasswordWithProviders location={{ search: `?token=${token}` }} />
    );
    const newPasswordInput = getByLabelText(/^new password/i);
    const confirmNewPasswordInput = getByLabelText(/^confirm new password/i);
    const submitButton = getByRole('button', { name: /reset password/i });
    user.type(newPasswordInput, testData.password);
    user.type(confirmNewPasswordInput, testData.confirmPassword);
    user.click(submitButton);
    await waitFor(() => {
      expect(mockResetPassword).toBeCalledTimes(1);
    });
    expect(mockResetPassword).toBeCalledWith({
      password: testData.password,
      token,
    });
    expect(getByRole('alert')).toBeVisible();
    expect(getByText(/your password has been updated/i)).toBeVisible();
    user.click(getByLabelText(/close/i));
    await waitFor(() => {
      expect(queryByRole('alert')).toBeNull();
    });
  });
});
