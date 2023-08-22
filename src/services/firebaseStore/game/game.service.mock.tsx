/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable camelcase */
/* eslint-disable no-promise-executor-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { DocumentData, DocumentSnapshot } from 'firebase/firestore';
import * as gameSettingsService from './game.service';


export const getGameResponseObjMock = {
  data: () => { } ,
} as DocumentSnapshot<DocumentData>;
export const setGameResponseObjMock = {} as any;
export const updateGameResponseMock = {} as any;

const getGameMock = () => new Promise<DocumentSnapshot<DocumentData>>((resolve) => resolve(
  getGameResponseObjMock,
));
const setGameMock = () => new Promise<any>((resolve) => resolve(setGameResponseObjMock));
const updateGameMock = () => new Promise<any>((resolve) => resolve(updateGameResponseMock));
const updateGamePlayerMock = () => new Promise<void>((resolve) => resolve());

export const getGameSpy = jest.spyOn(gameSettingsService, 'getGame');
export const setGameSpy = jest.spyOn(gameSettingsService, 'setGame');
export const updateGameSpy = jest.spyOn(gameSettingsService, 'updateGame');
export const updateGamePlayerSpy = jest.spyOn(gameSettingsService, 'updateGamePlayer')

export const initializeMock = () => {
  getGameSpy
    .mockImplementation(getGameMock);
  setGameSpy
    .mockImplementation(setGameMock);
  updateGameSpy
    .mockImplementation(updateGameMock);
  updateGamePlayerSpy
    .mockImplementation(updateGamePlayerMock);
};

export const reset = () => {
  getGameSpy.mockClear();
  setGameSpy.mockClear();
  updateGameSpy.mockClear();
  updateGamePlayerSpy.mockClear();
};
