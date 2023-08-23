/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable camelcase */
/* eslint-disable no-promise-executor-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { DocumentData, DocumentSnapshot, QuerySnapshot } from 'firebase/firestore';
import * as userDataService from './user.service';

export const getUserResponseObjMock = {
  data: () => {},
} as DocumentSnapshot<DocumentData>;
export const getUserByUsernameResponseObjMock = {
  docs: [
    {
      data: () => {}
    }
  ],
} as QuerySnapshot<DocumentData>;

export const setUserDataResponseObjMock = {} as any;
export const updateUserDataResponseMock = {} as any;

const getUserMock = () => new Promise<DocumentSnapshot<DocumentData>>((resolve) => resolve(
  getUserResponseObjMock,
));
const setUserMock = () => new Promise<any>((resolve) => resolve(setUserDataResponseObjMock));
const updateUserMock = () => new Promise<any>((resolve) => resolve(updateUserDataResponseMock));
const updateUserCurrentGameSpyMock = () => new Promise<any>((resolve) => resolve(updateUserDataResponseMock));
const getUserByUsernameSpyMock = () => new Promise<any>((resolve) => resolve(getUserByUsernameResponseObjMock));

export const getUserSpy = jest.spyOn(userDataService, 'getUser');
export const setUserSpy = jest.spyOn(userDataService, 'setUser');
export const updateUserSpy = jest.spyOn(userDataService, 'updateUser');
export const updateUserCurrentGameSpy = jest.spyOn(userDataService, 'updateUserCurrentGame')
export const getUserByUsernameSpy = jest.spyOn(userDataService, 'getUserByUsername')

export const initializeMock = () => {
  getUserSpy
    .mockImplementation(getUserMock);
  setUserSpy
    .mockImplementation(setUserMock);
  updateUserSpy
    .mockImplementation(updateUserMock);
  updateUserCurrentGameSpy
    .mockImplementation(updateUserCurrentGameSpyMock)
  getUserByUsernameSpy
    .mockImplementation(getUserByUsernameSpyMock)
};

export const reset = () => {
  getUserSpy.mockClear();
  setUserSpy.mockClear();
  updateUserSpy.mockClear();
  updateUserCurrentGameSpy.mockClear();
  getUserByUsernameSpy.mockClear();
};
