/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable camelcase */
/* eslint-disable no-promise-executor-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { UserCredential } from 'firebase/auth';

const loginResponseMock = {} as UserCredential;
let loadingResponseMock: boolean = false;
let errorResponseMock: boolean = false;

const loginSpy = jest.fn()
const loginWithGoogleSpy = jest.fn()
const signUpSpy = jest.fn()
const logoutSpy = jest.fn();

const mockUserMockResponse = {
  login: loginSpy,
  loginWithGoogle: loginWithGoogleSpy,
  logout: logoutSpy,
  signUp: signUpSpy,
  loading: loadingResponseMock,
  error: errorResponseMock,
}

export const mock = () => {
  return mockUserMockResponse;
}

export const initializeMock = () => {
  loginSpy.mockResolvedValue(loginResponseMock),
  loginWithGoogleSpy.mockResolvedValue(loginResponseMock),
  logoutSpy.mockResolvedValue(undefined),
  signUpSpy.mockResolvedValue(loginResponseMock)
}
