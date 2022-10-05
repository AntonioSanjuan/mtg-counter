import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';

import { act } from 'react-dom/test-utils';
// eslint-disable-next-line import/no-extraneous-dependencies
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import React from 'react';
import { User } from 'firebase/auth';
import * as hooks from '../../hooks/sidenav/sidenavHook';
import { Topnav } from './Topnav';
import { setUserAction } from '../../state/user/user.actions';
import { createTestStore } from '../../utils/testsUtils/createTestStore.util';
import { useSidenavMock } from '../../hooks/sidenav/sidenavHook.mock';

describe('Topnav', () => {
  let topnavStore: any;
  let history: any;

  const setLoginButtonHiddenMock = jest.fn(() => {});

  beforeEach(() => {
    topnavStore = createTestStore();
    history = createMemoryHistory();

    jest.spyOn(React, 'useState')
      .mockImplementation(() => [undefined, setLoginButtonHiddenMock]);

    jest.spyOn(hooks, 'useSidenavLayer')
      .mockImplementation(useSidenavMock);

    expect(setLoginButtonHiddenMock).toHaveBeenCalledTimes(0);
  });

  it('should create', () => {
    const { container } = render(
      <Provider store={topnavStore}>
        <Router location={history.location} navigator={history}>
          <Topnav
            hideLoginButton={false}
            hideSidenavButton
            hideSearchButton
          />
        </Router>
      </Provider>,
    );

    expect(container).toBeDefined();
  });

  it('Topnav `burguerMenu` button click should trigger switchSidenavStatus', () => {
    render(
      <Provider store={topnavStore}>
        <Router location={history.location} navigator={history}>
          <Topnav hideLoginButton />
        </Router>
      </Provider>,
    );

    expect(useSidenavMock().switchSidenavStatus).not.toHaveBeenCalled();

    fireEvent.click(
      screen.getAllByRole('button', {
        name: /switchSidenavButton/i,
      })[0],
    );

    expect(useSidenavMock().switchSidenavStatus).toHaveBeenCalled();
  });

  it('Topnav `Login` button should appear if !hideLoginButton and user isn`t logged', () => {
    render(
      <Provider store={topnavStore}>
        <Router location={history.location} navigator={history}>
          <Topnav />
        </Router>
      </Provider>,
    );

    expect(screen.getAllByRole('button', {
      name: /login/i,
    })[0]).toBeInTheDocument();
  });

  it('Topnav `Logout` button should appear if !hideLoginButton and user is logged', () => {
    topnavStore.dispatch(
      setUserAction({} as User),
    );

    render(
      <Provider store={topnavStore}>
        <Router location={history.location} navigator={history}>
          <Topnav />
        </Router>
      </Provider>,
    );

    expect(screen.getAllByRole('button', {
      name: /logout/i,
    })[0]).toBeInTheDocument();
  });
});
