/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable camelcase */
/* eslint-disable no-promise-executor-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { UserCredential } from 'firebase/auth';

const loginResponseMock = {} as UserCredential;
let loadingResponseMock: boolean;
let startUpLoadingResponseMock: boolean;
let errorResponseMock: boolean;

const useUser_LoginMock = jest.fn(() => new Promise<UserCredential>((resolve) => resolve(
  loginResponseMock as UserCredential,
)));
const useUser_LoginWithGoogleMock = jest.fn(() => new Promise<UserCredential>((resolve) => resolve(
  loginResponseMock as UserCredential,
)));
const useUser_SignUpMock = jest.fn(() => new Promise<UserCredential>((resolve) => resolve(
  loginResponseMock as UserCredential,
)));
const useUser_LogoutMock = jest.fn(() => new Promise<void>((resolve) => resolve()));
const useUser_KeepUserLoggedMock = jest.fn(() => new Promise<void>((resolve) => resolve()));

export const useUserMock = () => ({
  login: useUser_LoginMock,
  loginWithGoogle: useUser_LoginWithGoogleMock,
  logout: useUser_LogoutMock,
  signUp: useUser_SignUpMock,
  keepUserStateUpdated: useUser_KeepUserLoggedMock,
  loading: loadingResponseMock,
  startUpLoading: startUpLoadingResponseMock,
  error: errorResponseMock,
});
