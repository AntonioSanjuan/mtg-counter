/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable camelcase */
/* eslint-disable no-promise-executor-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as gameSettingsService from './gameSettings.service';

export const setGameSettingsResponseObjMock = {} as any;
export const updateGameSettingsResponseMock = {} as any;

const setGameSettingsMock = () => new Promise<any>((resolve) => resolve(setGameSettingsResponseObjMock));
const updateGameSettingsMock = () => new Promise<any>((resolve) => resolve(updateGameSettingsResponseMock));

export const setGameSettingsSpy = jest.spyOn(gameSettingsService, 'setGameSettings');
export const updateGameSettingsSpy = jest.spyOn(gameSettingsService, 'updateGameSettings');

export const initializeMock = () => {
  setGameSettingsSpy
    .mockImplementation(setGameSettingsMock);
  updateGameSettingsSpy
    .mockImplementation(updateGameSettingsMock);
};

export const reset = () => {
  setGameSettingsSpy.mockClear();
  updateGameSettingsSpy.mockClear();
};
