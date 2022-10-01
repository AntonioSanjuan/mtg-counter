/* eslint-disable no-promise-executor-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { UserCredential } from 'firebase/auth';
import * as firebaseAuthService from './firebaseAuth.service';

export const firebaseResponseObjMock = {
  user: { uid: 'test_uid' },
} as UserCredential;

const firebaseSignUpMock = () => new Promise<UserCredential>((resolve) => resolve(firebaseResponseObjMock));
const firebaseLoginMock = () => new Promise<UserCredential>((resolve) => resolve(firebaseResponseObjMock));
const firebaseLogoutMock = () => new Promise<void>((resolve) => resolve());

export const firebaseSignUpSpy = jest.spyOn(firebaseAuthService, 'firebaseSignUp');
export const firebaseLoginSpy = jest.spyOn(firebaseAuthService, 'firebaseLogin');
export const firebaseLogoutSpy = jest.spyOn(firebaseAuthService, 'firebaseLogout');

//
export const initializeMock = () => {
  firebaseSignUpSpy
    .mockImplementation(firebaseSignUpMock);
  firebaseLoginSpy
    .mockImplementation(firebaseLoginMock);
  firebaseLogoutSpy
    .mockImplementation(firebaseLogoutMock);
};

export const reset = () => {
  firebaseSignUpSpy.mockClear();
  firebaseLoginSpy.mockClear();
  firebaseLogoutSpy.mockClear();
};
