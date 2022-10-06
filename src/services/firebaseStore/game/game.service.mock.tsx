/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable camelcase */
/* eslint-disable no-promise-executor-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as userService from './game.service';

export const setGameSettingsResponseObjMock = {} as any;
export const updateGameSettingsResponseMock = {} as any;

const setGameSettingsMock = () => new Promise<any>((resolve) => resolve(setGameSettingsResponseObjMock));
const updateGameSettingsMock = () => new Promise<any>((resolve) => resolve(updateGameSettingsResponseMock));

export const setGameSettingsSpy = jest.spyOn(userService, 'setGameSettings');
export const updateUserSettingsSpy = jest.spyOn(userService, 'updateGameSettings');

export const initializeMock = () => {
  setGameSettingsSpy
    .mockImplementation(setGameSettingsMock);
  updateUserSettingsSpy
    .mockImplementation(updateGameSettingsMock);
};

export const reset = () => {
  setGameSettingsSpy.mockClear();
  updateUserSettingsSpy.mockClear();
};
