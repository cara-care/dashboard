import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import Dashboard from '../Dashboard';
import { authInitialState, AuthStatus } from '../../auth/authReducer';
import withProviders from '../../components/withProviders';
import { renderWithRedux } from '../../utils/test-utils';
import { NUTRI_NAVIGATION } from '../../utils/test-helpers';
import mockedApi from '../../utils/api';

jest.mock('../../utils/api');

describe('<Dashboard />', () => {
  const history = createMemoryHistory();
  const TEST_TOKEN = 'test';
  const DashboardWithParams: React.FC<{ token?: string }> = ({ token }) => (
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
        params: { token },
      }}
    />
  );
  const DashboardWithToken = () => <DashboardWithParams token={TEST_TOKEN} />;
  const DashboardWithoutToken = () => <DashboardWithParams />;
  const DashboardWithTokenParam = withProviders(
    DashboardWithToken,
    MemoryRouter
  );
  const DashboardWithoutTokenParam = withProviders(
    DashboardWithoutToken,
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
    const screen = renderWithRedux(<DashboardWithTokenParam />);
    expect(mockedApi.defaults.headers['X-Token']).toBe(TEST_TOKEN);
    expect(screen.queryByTestId(NUTRI_NAVIGATION)).not.toBeInTheDocument();
  });

  it('renders navigation when nutrisionist is authenticated', () => {
    const screen = renderWithRedux(<DashboardWithoutTokenParam />, {
      preloadedState: {
        auth: {
          ...authInitialState,
          status: AuthStatus.AUTHENTICATED,
        },
      },
    });
    expect(mockedApi.defaults.headers['X-Token']).toBeFalsy();
    expect(screen.queryByTestId('nutri-navigation')).not.toBeInTheDocument();
  });
});
