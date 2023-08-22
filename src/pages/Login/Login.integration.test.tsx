import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
// eslint-disable-next-line import/no-extraneous-dependencies
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import * as authHooks from '../../hooks/auth/authHook';
import Login from './Login';
import { createTestStore } from '../../utils/testsUtils/createTestStore.util';
import * as mock_useAuth from '../../hooks/auth/authHook.mock';

describe('Login', () => {
  let loginStore: any;
  let history: any;

  beforeEach(() => {
    loginStore = createTestStore();
    history = createMemoryHistory();

    jest.spyOn(authHooks, 'useAuth')
      .mockImplementation(mock_useAuth.mock);

    mock_useAuth.initializeMock()
  });

  it('should create', () => {
    const { container } = render(
      <Provider store={loginStore}>
        <Router location={history.location} navigator={history}>
          <Login />
        </Router>
      </Provider>,
    );

    expect(container).toBeDefined();
  });

  it('Login on submit should request to useUser login and navigate to /', async () => {
    const userEmail = 'myUser@myUser.com';
    const userPassword = 'pass1234';
    render(
      <Provider store={loginStore}>
        <Router location={history.location} navigator={history}>
          <Login />
        </Router>
      </Provider>,
    );

    expect(mock_useAuth.mock().login).not.toHaveBeenCalled();
    const usernameInput = screen.getByLabelText('userEmail');
    fireEvent.change(usernameInput, { target: { value: userEmail } });
    const passwordInput = screen.getByLabelText('password');
    fireEvent.change(passwordInput, { target: { value: userPassword } });
    const loginButton = screen.getByLabelText('LoginButton');
    expect(loginButton).not.toBeDisabled();

    await act(async () => {
      fireEvent.click(loginButton);
    });

    expect(mock_useAuth.mock().login).toHaveBeenCalledWith({ userEmail, userPassword });
    expect(history.location.pathname).toEqual('/');
  });

  it('Login on submit should not be possible if password is not defined', async () => {
    const username = 'myUser';
    render(
      <Provider store={loginStore}>
        <Router location={history.location} navigator={history}>
          <Login />
        </Router>
      </Provider>,
    );
    const usernameInput = screen.getByLabelText('userEmail');
    fireEvent.change(usernameInput, { target: { value: username } });

    const loginButton = screen.getByLabelText('LoginButton' );

    await act(async () => {
      fireEvent.click(loginButton);
    });

    expect(loginButton).toBeDisabled();
  });

  it('Login should not be possible if username is not in email format', async () => {
    const userEmail = 'myUser@myUser.com';
    const userPassword = 'password';
    render(
      <Provider store={loginStore}>
        <Router location={history.location} navigator={history}>
          <Login />
        </Router>
      </Provider>,
    );

    expect(mock_useAuth.mock().signUp).not.toHaveBeenCalled();
    const usernameInput = screen.getByLabelText('userEmail');
    const passwordInput = screen.getByLabelText('password');

    await act(async () => {
      fireEvent.change(usernameInput, { target: { value: userEmail } });
      fireEvent.change(passwordInput, { target: { value: userPassword } });
    });

    const loginButton = screen.getByLabelText('LoginButton' );
    expect(loginButton).toBeDisabled();
  });

  it('Login should request to login useUser function', async () => {
    const userEmail = 'myUser@asdas.com';
    const userPassword = 'password';

    render(
      <Provider store={loginStore}>
        <Router location={history.location} navigator={history}>
          <Login />
        </Router>
      </Provider>,
    );

    expect(mock_useAuth.mock().signUp).not.toHaveBeenCalled();
    const usernameInput = screen.getByLabelText('userEmail');
    const passwordInput = screen.getByLabelText('password');
    fireEvent.change(usernameInput, { target: { value: userEmail } });
    fireEvent.change(passwordInput, { target: { value: userPassword } });

    const loginButton = screen.getByLabelText('LoginButton');

    expect(loginButton).not.toBeDisabled();

    await act(async () => {
      fireEvent.click(loginButton);
    });

    expect(mock_useAuth.mock().login).toHaveBeenCalledWith({  userEmail, userPassword });
  });
});
