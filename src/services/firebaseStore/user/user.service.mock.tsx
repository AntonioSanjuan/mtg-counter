/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable camelcase */
/* eslint-disable no-promise-executor-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { DocumentData, DocumentSnapshot } from 'firebase/firestore';
import * as userDataService from './user.service';

export const getUserResponseObjMock = {
  data: () => {},
} as DocumentSnapshot<DocumentData>;

export const setUserDataResponseObjMock = {} as any;
export const updateUserDataResponseMock = {} as any;

const getUserMock = () => new Promise<DocumentSnapshot<DocumentData>>((resolve) => resolve(
  getUserResponseObjMock,
));
const setUserMock = () => new Promise<any>((resolve) => resolve(setUserDataResponseObjMock));
const updateUserMock = () => new Promise<any>((resolve) => resolve(updateUserDataResponseMock));
const updateUserCurrentGameSpyMock = () => new Promise<any>((resolve) => resolve(updateUserDataResponseMock));

export const getUserSpy = jest.spyOn(userDataService, 'getUser');
export const setUserSpy = jest.spyOn(userDataService, 'setUser');
export const updateUserSpy = jest.spyOn(userDataService, 'updateUser');
export const updateUserCurrentGameSpy = jest.spyOn(userDataService, 'updateUserCurrentGame')

export const initializeMock = () => {
  getUserSpy
    .mockImplementation(getUserMock);
  setUserSpy
    .mockImplementation(setUserMock);
  updateUserSpy
    .mockImplementation(updateUserMock);
  updateUserCurrentGameSpy
  .mockImplementation(updateUserCurrentGameSpyMock)
};

export const reset = () => {
  getUserSpy.mockClear();
  setUserSpy.mockClear();
  updateUserSpy.mockClear();
  updateUserCurrentGameSpy.mockClear();
};
