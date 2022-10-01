/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable camelcase */
/* eslint-disable no-promise-executor-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { DocumentData, DocumentSnapshot } from 'firebase/firestore';
import * as userSettingsService from './userSettings.service';

export const getUserSettingsResponseObjMock = {
  data: () => {},
} as DocumentSnapshot<DocumentData>;
export const setUserSettingsResponseObjMock = {} as any;
export const updateUserSettingsMock = {} as any;

const getUserSettingsMock = () => new Promise<DocumentSnapshot<DocumentData>>((resolve) => resolve(
  getUserSettingsResponseObjMock,
));
const setUserSettingsMock = () => new Promise<any>((resolve) => resolve(setUserSettingsResponseObjMock));
const deleteUserStoredArticleMock = () => new Promise<any>((resolve) => resolve(updateUserSettingsMock));

export const getUserSettingsSpy = jest.spyOn(userSettingsService, 'getUserSettings');
export const setUserSettingsSpy = jest.spyOn(userSettingsService, 'setUserSettings');
export const updateUserSettingsSpy = jest.spyOn(userSettingsService, 'updateUserSettings');

export const initializeMock = () => {
  getUserSettingsSpy
    .mockImplementation(getUserSettingsMock);
  setUserSettingsSpy
    .mockImplementation(setUserSettingsMock);
  updateUserSettingsSpy
    .mockImplementation(deleteUserStoredArticleMock);
};

export const reset = () => {
  getUserSettingsSpy.mockClear();
  setUserSettingsSpy.mockClear();
  updateUserSettingsSpy.mockClear();
};
