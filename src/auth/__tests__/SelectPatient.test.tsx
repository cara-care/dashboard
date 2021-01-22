import React from 'react';
import { MemoryRouter, Redirect as MockRedirect } from 'react-router-dom';
import { authInitialState, AuthStatus } from '../authReducer';
import withProviders from '../../components/withProviders';
import SelectPatient from '../pages/SelectPatient';
import { renderWithRedux } from '../../utils/test-utils';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  Redirect: jest.fn(() => null),
}));

describe('<SelectPatient />', () => {
  const SelectPatientWithProviders = withProviders(SelectPatient, MemoryRouter);

  beforeEach(() => {
    // @ts-ignore
    MockRedirect.mockClear();
  });

  it('redirect to login page if not authenticated', () => {
    renderWithRedux(<SelectPatientWithProviders />);
    expect(MockRedirect).toBeCalledWith({ to: '/nutri/login' }, {});
  });
});
