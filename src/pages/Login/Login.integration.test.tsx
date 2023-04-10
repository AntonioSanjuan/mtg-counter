import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
// eslint-disable-next-line import/no-extraneous-dependencies
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import * as userHooks from '../../hooks/user/userHook';
import Login from './Login';
import { createTestStore } from '../../utils/testsUtils/createTestStore.util';
import * as mock_useUser from '../../hooks/user/userHook.mock';

describe('Login', () => {
  let loginStore: any;
  let history: any;

  beforeEach(() => {
    loginStore = createTestStore();
    history = createMemoryHistory();

    jest.spyOn(userHooks, 'useUser')
      .mockImplementation(mock_useUser.mock);

    mock_useUser.initializeMock()
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
    const username = 'myUser@myUser.com';
    const password = 'pass1234';
    render(
      <Provider store={loginStore}>
        <Router location={history.location} navigator={history}>
          <Login />
        </Router>
      </Provider>,
    );

    expect(mock_useUser.mock().login).not.toHaveBeenCalled();
    const usernameInput = screen.getByPlaceholderText(/name@example.com/i);
    fireEvent.change(usernameInput, { target: { value: username } });
    const passwordInput = screen.getByPlaceholderText('****');
    fireEvent.change(passwordInput, { target: { value: password } });
    const loginButton = screen.getByRole('button', { name: 'Login' });
    expect(loginButton).not.toBeDisabled();

    await act(async () => {
      fireEvent.click(loginButton);
    });

    expect(mock_useUser.mock().login).toHaveBeenCalledWith({ username, password });
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
    const usernameInput = screen.getByPlaceholderText(/name@example.com/i);
    fireEvent.change(usernameInput, { target: { value: username } });

    const loginButton = screen.getByRole('button', { name: 'Login' });

    await act(async () => {
      fireEvent.click(loginButton);
    });

    expect(loginButton).toBeDisabled();
  });

  it('Login signUp should not be possible if username is not in email format', async () => {
    const username = 'myUser';
    const password = 'password';
    render(
      <Provider store={loginStore}>
        <Router location={history.location} navigator={history}>
          <Login />
        </Router>
      </Provider>,
    );

    expect(mock_useUser.mock().signUp).not.toHaveBeenCalled();
    const usernameInput = screen.getByPlaceholderText(/name@example.com/i);
    const passwordInput = screen.getByPlaceholderText('****');

    await act(async () => {
      fireEvent.change(usernameInput, { target: { value: username } });
      fireEvent.change(passwordInput, { target: { value: password } });
    });

    const registerButton = screen.getByRole('button', { name: /Sign Up/i });
    expect(registerButton).toBeDisabled();
  });

  it('Login signUp should request to signUp useUser function', async () => {
    const username = 'myUser@asdas.com';
    const password = 'password';

    render(
      <Provider store={loginStore}>
        <Router location={history.location} navigator={history}>
          <Login />
        </Router>
      </Provider>,
    );

    expect(mock_useUser.mock().signUp).not.toHaveBeenCalled();
    const usernameInput = screen.getByPlaceholderText(/name@example.com/i);
    const passwordInput = screen.getByPlaceholderText('****');
    fireEvent.change(usernameInput, { target: { value: username } });
    fireEvent.change(passwordInput, { target: { value: password } });

    const registerButton = screen.getByRole('button', { name: /Sign Up/i });

    expect(registerButton).not.toBeDisabled();

    await act(async () => {
      fireEvent.click(registerButton);
    });

    expect(mock_useUser.mock().signUp).toHaveBeenCalledWith({ username, password });
  });
});
