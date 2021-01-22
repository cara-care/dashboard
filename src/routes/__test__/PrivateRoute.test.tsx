import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { authInitialState, AuthStatus } from '../../auth';
import PrivateRoute from '../PrivateRoute';
import { renderWithRedux } from '../../utils/test-utils';

function TestComponent() {
  return (
    <div>
      <span>test</span>
    </div>
  );
}

describe('<PrivateRoute />', () => {
  it('redirects to login page when not authenticated', () => {
    const history = createMemoryHistory();
    renderWithRedux(
      <Router history={history}>
        <PrivateRoute component={TestComponent} />
      </Router>
    );
    expect(history.location.pathname).toBe('/nutri/login');
  });

  it("does not redirect to select patient page when patient isn't selected", () => {
    const history = createMemoryHistory();
    renderWithRedux(
      <Router history={history}>
        <PrivateRoute component={TestComponent} />
      </Router>,
      {
        preloadedState: {
          auth: { ...authInitialState, status: AuthStatus.AUTHENTICATED },
        },
      }
    );
    expect(history.location.pathname).toBe('/');
  });

  it('renders component when authenticated and patient is selected', () => {
    const history = createMemoryHistory();
    const { getByText } = renderWithRedux(
      <Router history={history}>
        <PrivateRoute component={TestComponent} />
      </Router>,
      {
        preloadedState: {
          auth: {
            ...authInitialState,
            status: AuthStatus.AUTHENTICATED,
            patientId: 1,
          },
        },
      }
    );
    expect(history.location.pathname).toBe('/');
    expect(getByText(/test/i)).toHaveTextContent('test');
  });
});
