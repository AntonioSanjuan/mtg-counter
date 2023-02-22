/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable camelcase */
/* eslint-disable no-promise-executor-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { DocumentData, DocumentSnapshot } from 'firebase/firestore';
import * as gameSettingsService from './gameSettings.service';

export const getUserResponseObjMock = {
  data: () => {},
} as DocumentSnapshot<DocumentData>;
export const setGameSettingsResponseObjMock = {} as any;
export const updateGameSettingsResponseMock = {} as any;

const getGameSettingsMock = () => new Promise<DocumentSnapshot<DocumentData>>((resolve) => resolve(
  getUserResponseObjMock,
));
const setGameSettingsMock = () => new Promise<any>((resolve) => resolve(setGameSettingsResponseObjMock));
const updateGameSettingsMock = () => new Promise<any>((resolve) => resolve(updateGameSettingsResponseMock));

export const getGameSettingSpy = jest.spyOn(gameSettingsService, 'getGameSettings');
export const setGameSettingsSpy = jest.spyOn(gameSettingsService, 'setGameSettings');
export const updateGameSettingsSpy = jest.spyOn(gameSettingsService, 'updateGameSettings');

export const initializeMock = () => {
  getGameSettingSpy
    .mockImplementation(getGameSettingsMock);
  setGameSettingsSpy
    .mockImplementation(setGameSettingsMock);
  updateGameSettingsSpy
    .mockImplementation(updateGameSettingsMock);
};

export const reset = () => {
  getGameSettingSpy.mockClear();
  setGameSettingsSpy.mockClear();
  updateGameSettingsSpy.mockClear();
};
