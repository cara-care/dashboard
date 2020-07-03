import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import user from '@testing-library/user-event';
import withProviders from '../../components/withProviders';
import { renderWithRedux } from '../../utils/test-utils';
import Login from '../pages/Login';

describe('<Login />', () => {
  it('toggles password visibility', () => {
    const LoginWithProviders = withProviders(Login, MemoryRouter);
    const { getByLabelText } = renderWithRedux(<LoginWithProviders />);
    const passwordInput = getByLabelText(/^password/i);
    const togglePasswordVisibilityButton = getByLabelText(
      /toggle password visibility/i
    );
    // @ts-ignore
    expect(passwordInput).toHaveAttribute('type', 'password');

    user.click(togglePasswordVisibilityButton);
    // @ts-ignore
    expect(passwordInput).toHaveAttribute('type', 'text');

    user.click(togglePasswordVisibilityButton);
    // @ts-ignore
    expect(passwordInput).toHaveAttribute('type', 'password');
  });
});
