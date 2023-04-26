/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable camelcase */
/* eslint-disable no-promise-executor-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { DocumentData, DocumentSnapshot } from 'firebase/firestore';
import * as gameSettingsService from './game.service';

export const getUserResponseObjMock = {
  data: () => {},
} as DocumentSnapshot<DocumentData>;
export const setGameResponseObjMock = {} as any;
export const updateGameResponseMock = {} as any;

const getGameMock = () => new Promise<DocumentSnapshot<DocumentData>>((resolve) => resolve(
  getUserResponseObjMock,
));
const setGameMock = () => new Promise<any>((resolve) => resolve(setGameResponseObjMock));
const updateGameMock = () => new Promise<any>((resolve) => resolve(updateGameResponseMock));

export const getGameSettingSpy = jest.spyOn(gameSettingsService, 'getGame');
export const setGameSettingsSpy = jest.spyOn(gameSettingsService, 'setGame');
export const updateGameSettingsSpy = jest.spyOn(gameSettingsService, 'updateGame');

export const initializeMock = () => {
  getGameSettingSpy
    .mockImplementation(getGameMock);
  setGameSettingsSpy
    .mockImplementation(setGameMock);
  updateGameSettingsSpy
    .mockImplementation(updateGameMock);
};

export const reset = () => {
  getGameSettingSpy.mockClear();
  setGameSettingsSpy.mockClear();
  updateGameSettingsSpy.mockClear();
};
