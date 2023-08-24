import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';

import { act } from 'react-dom/test-utils';
// eslint-disable-next-line import/no-extraneous-dependencies
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import React from 'react';
import { User } from 'firebase/auth';
import * as sidenavhooks from '../../hooks/sidenav/sidenavHook';
import * as alerthooks from '../../hooks/alert/alertHook';
import * as userHook from '../../hooks/auth/authHook';
import { Topnav } from './Topnav';
import { setUserAuthAction } from '../../state/user/user.actions';
import { createTestStore } from '../../utils/testsUtils/createTestStore.util';
import * as mock_useSidenavLayer from '../../hooks/sidenav/sidenavHook.mock';
import * as mock_useAuth from '../../hooks/auth/authHook.mock';
import * as mock_useAlert from '../../hooks/alert/alertHook.mock';

describe('Topnav', () => {
  let topnavStore: any;
  let history: any;

  const setLoginButtonHiddenMock = jest.fn(() => {});

  beforeEach(() => {
    topnavStore = createTestStore();
    history = createMemoryHistory();

    jest.spyOn(userHook, 'useAuth')
      .mockImplementation(mock_useAuth.mock);

    jest.spyOn(React, 'useState')
      .mockImplementation(() => [undefined, setLoginButtonHiddenMock]);

    jest.spyOn(sidenavhooks, 'useSidenavLayer')
      .mockImplementation(mock_useSidenavLayer.mock);

    jest.spyOn(alerthooks, 'useAlert')
      .mockImplementation(mock_useAlert.mock);

    mock_useSidenavLayer.initializeMock();
    mock_useAlert.initializeMock()
    mock_useAuth.initializeMock()
    expect(setLoginButtonHiddenMock).toHaveBeenCalledTimes(0);
  });

  it('should create', () => {
    const { container } = render(
      <Provider store={topnavStore}>
        <Router location={history.location} navigator={history}>
          <Topnav
            hideLoginButton={false}
            hideSidenavButton
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

    expect(mock_useSidenavLayer.mock().switchSidenavStatus).not.toHaveBeenCalled();

    fireEvent.click(
      screen.getAllByRole('button', {
        name: /switchSidenavButton/i,
      })[0],
    );

    expect(mock_useSidenavLayer.mock().switchSidenavStatus).toHaveBeenCalled();
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
      setUserAuthAction({} as User),
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

  it('Topnav `Login` button click should navigate /Login', () => {
    render(
      <Provider store={topnavStore}>
        <Router location={history.location} navigator={history}>
          <Topnav />
        </Router>
      </Provider>,
    );
    fireEvent.click(
      screen.getAllByRole('button', {
        name: /login/i,
      })[0]
    )
      
    expect(history.location.pathname).toEqual('/Login');
  });
  
  it('Topnav `Logout` button click should request useUser logout', () => {
    topnavStore.dispatch(
      setUserAuthAction({} as User),
    );

    render(
      <Provider store={topnavStore}>
        <Router location={history.location} navigator={history}>
          <Topnav />
        </Router>
      </Provider>,
    );
    fireEvent.click(
      screen.getAllByRole('button', {
        name: /logout/i,
      })[0]
    )
      
    expect(mock_useAlert.mock().openAlert).toHaveBeenCalled();
  });

});
