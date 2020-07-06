import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import user from '@testing-library/user-event';
import { waitFor } from '@testing-library/react';
import withProviders from '../../components/withProviders';
import { renderWithRedux } from '../../utils/test-utils';
import ForgotPassword from '../pages/ForgotPassword';
import { requestResetPassword as mockRequestResetPassword } from '../../utils/api';

jest.mock('../../utils/api');

describe('<ForgotPassword />', () => {
  it('shows a dismissable success alert after submitting the form', async () => {
    const testData = { username: 'test' };
    const ForgotPasswordWithProviders = withProviders(
      ForgotPassword,
      MemoryRouter
    );
    const {
      getByLabelText,
      getByRole,
      getByText,
      queryByRole,
    } = renderWithRedux(<ForgotPasswordWithProviders />);
    const usernameInput = getByLabelText(/^username/i);
    const submitButton = getByRole('button', {
      name: /send reset password instructions/i,
    });
    user.type(usernameInput, testData.username);
    user.click(submitButton);
    await waitFor(() => {
      expect(mockRequestResetPassword).toHaveBeenCalledTimes(1);
    });
    expect(mockRequestResetPassword).toBeCalledWith(testData.username);
    expect(getByRole('alert')).toBeVisible();
    expect(getByText(/reset password instructions sent/i)).toBeVisible();
    user.click(getByLabelText(/close/i));
    await waitFor(() => {
      expect(queryByRole('alert')).toBeNull();
    });
  });

  it.todo('shows a dismissable error aler after submitting the form');
});
