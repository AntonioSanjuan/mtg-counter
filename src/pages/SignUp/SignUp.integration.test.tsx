import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
// eslint-disable-next-line import/no-extraneous-dependencies
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import * as authHooks from '../../hooks/auth/authHook';
import SignUp from './SignUp';
import { createTestStore } from '../../utils/testsUtils/createTestStore.util';
import * as mock_useAuth from '../../hooks/auth/authHook.mock';

describe('SignUp', () => {
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
          <SignUp />
        </Router>
      </Provider>,
    );

    expect(container).toBeDefined();
  });


  it('Login on submit should not be possible if password is not defined', async () => {
    const username = 'myUser';
    const userName = 'username';
    render(
      <Provider store={loginStore}>
        <Router location={history.location} navigator={history}>
          <SignUp />
        </Router>
      </Provider>,
    );
    const usernameInput = screen.getByPlaceholderText(/email@example.com/i);
    fireEvent.change(usernameInput, { target: { value: username } });

    const loginButton = screen.getByRole('button', { name: 'Sign Up' });

    await act(async () => {
      fireEvent.click(loginButton);
    });

    expect(loginButton).toBeDisabled();
  });

  it('SignUp should not be possible if username is not in email format', async () => {
    const userEmail = 'username';
    const userName = 'username';
    const password = 'password';
    render(
      <Provider store={loginStore}>
        <Router location={history.location} navigator={history}>
          <SignUp />
        </Router>
      </Provider>,
    );

    expect(mock_useAuth.mock().signUp).not.toHaveBeenCalled();
    const userEmailInput = screen.getByPlaceholderText(/email@example.com/i);
    const passwordInput = screen.getByPlaceholderText('****');
    const userNameInput = screen.getByPlaceholderText('user name');

    await act(async () => {
      fireEvent.change(userEmailInput, { target: { value: userEmail } });
      fireEvent.change(passwordInput, { target: { value: password } });
      fireEvent.change(userNameInput, { target: { value: userName } });
    });

    const registerButton = screen.getByRole('button', { name: "Sign Up" });
    expect(registerButton).toBeDisabled();
  });

  it('SignUp should request to signUp useUser function', async () => {
    const userEmail = 'myUser@asdas.com';
    const userName = 'username';
    const userPassword = 'password';

    render(
      <Provider store={loginStore}>
        <Router location={history.location} navigator={history}>
          <SignUp />
        </Router>
      </Provider>,
    );

    expect(mock_useAuth.mock().signUp).not.toHaveBeenCalled();
    const userEmailInput = screen.getByPlaceholderText(/email@example.com/i);
    const passwordInput = screen.getByPlaceholderText('****');
    const userNameInput = screen.getByPlaceholderText('user name');
    fireEvent.change(userEmailInput, { target: { value: userEmail } });
    fireEvent.change(userNameInput, { target: { value: userName } });
    fireEvent.change(passwordInput, { target: { value: userPassword } });

    const registerButton = screen.getByRole('button', { name: "Sign Up" });

    expect(registerButton).not.toBeDisabled();

    await act(async () => {
      fireEvent.click(registerButton);
    });

    expect(mock_useAuth.mock().signUp).toHaveBeenCalledWith({ userEmail, userName, userPassword });
  });
});
