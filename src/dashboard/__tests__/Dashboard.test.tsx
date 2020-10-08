import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import Dashboard from '../Dashboard';
import { authInitialState, AuthStatus } from '../../auth/authReducer';
import withProviders from '../../components/withProviders';
import { renderWithRedux } from '../../utils/test-utils';

jest.mock('../../utils/api');

describe('<Dashboard />', () => {
  const history = createMemoryHistory();
  const DashboardWithParams = () => (
    <Dashboard
      history={history}
      location={{
        key: 'test',
        hash: '',
        pathname: '/export/test',
        search: '',
        state: undefined,
      }}
      match={{
        isExact: true,
        path: '',
        url: '',
        params: { token: 'test' },
      }}
    />
  );
  const DashboardWithProviders = withProviders(
    DashboardWithParams,
    MemoryRouter
  );

  beforeAll(() => {
    // FIXME: prevent logging error messages about wrong props (IconButton as a link)
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterAll(() => {
    // @ts-ignore
    console.error.mockRestore();
  });

  it("doesn't render navigation when nutrisionist isn't authenticated", () => {
    const screen = renderWithRedux(<DashboardWithProviders />);
    expect(screen.queryByTestId('nutri-navigation')).not.toBeInTheDocument();
  });

  it('renders navigation when nutrisionist is authenticated', () => {
    const screen = renderWithRedux(<DashboardWithProviders />, {
      preloadedState: {
        auth: {
          ...authInitialState,
          status: AuthStatus.AUTHENTICATED,
        },
      },
    });
    expect(screen.queryByTestId('nutri-navigation')).not.toBeInTheDocument();
  });
});
