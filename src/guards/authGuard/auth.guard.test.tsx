import { act, render } from '@testing-library/react';
import { Route, Router, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
// eslint-disable-next-line import/no-extraneous-dependencies
import { createMemoryHistory } from 'history';

import { User } from 'firebase/auth';
import { AuthRouteGuard } from './auth.guard';
import { setUserAction } from '../../state/user/user.actions';
import { createTestStore } from '../../utils/testsUtils/createTestStore.util';

describe('AuthRouteGuard', () => {
  let authGuardStore: any;
  let history: any;

  beforeEach(() => {
    authGuardStore = createTestStore();
    history = createMemoryHistory();
  });

  it('should create', () => {
    const { container } = render(
      <Provider store={authGuardStore}>
        <Router location={history.location} navigator={history}>
          <Routes>
            <Route
              path="/"
              element={
                <p> view ! </p>
                            }
            />
            <Route
              path="/testUri"
              element={(
                <AuthRouteGuard>
                  <p> view ! </p>
                </AuthRouteGuard>
                              )}
            />
          </Routes>
        </Router>
      </Provider>,
    );

    expect(container).toBeDefined();
  });

  it('if !userIsLogged, guard should redirect to default route', () => {
    history.push('/testUri');
    render(
      <Provider store={authGuardStore}>
        <Router location={history.location} navigator={history}>
          <Routes>
            <Route
              path="/"
              element={
                <p>  default view! </p>
                            }
            />
            <Route
              path="/testUri"
              element={(
                <AuthRouteGuard>
                  <p>  target view! </p>
                </AuthRouteGuard>
                              )}
            />
          </Routes>
        </Router>
      </Provider>,
    );

    expect(history.location.pathname).toEqual('/');
  });

  it('if userIsLogged, guard should allow children view', async () => {
    await act(async () => {
      authGuardStore.dispatch(setUserAction({} as User));
    });

    history.push('/testUri');
    render(
      <Provider store={authGuardStore}>
        <Router location={history.location} navigator={history}>
          <Routes>
            <Route
              path="/"
              element={
                <p>  target view! </p>
                            }
            />
            <Route
              path="/testUri"
              element={(
                <AuthRouteGuard>
                  <p>  default view! </p>
                </AuthRouteGuard>
                              )}
            />
          </Routes>
        </Router>
      </Provider>,
    );

    expect(history.location.pathname).toEqual('/testUri');
  });
});
