/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable camelcase */
/* eslint-disable no-promise-executor-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { DocumentData, DocumentSnapshot } from 'firebase/firestore';
import * as historicGamesService from './historicGames.service';

export const getHistoricGamesObjMock = {
  data: () => {},
} as DocumentSnapshot<DocumentData>;
export const setHistoricGamesObjMock = {} as any;
export const updateHistoricGamesObjMock = {} as any;

const getHistoricGamesMock = () => new Promise<DocumentSnapshot<DocumentData>>((resolve) => resolve(
  getHistoricGamesObjMock,
));
const setHistoricGamesMock = () => new Promise<any>((resolve) => resolve(setHistoricGamesObjMock));
const updateHistoricGamesMock = () => new Promise<any>((resolve) => resolve(updateHistoricGamesObjMock));

export const getHistoricGamesSpy = jest.spyOn(historicGamesService, 'getHistoricGames');
export const setHistoricGamesSpy = jest.spyOn(historicGamesService, 'setHistoricGames');
export const updateHistoricGamesSpy = jest.spyOn(historicGamesService, 'updateHistoricGames');

export const initializeMock = () => {
  getHistoricGamesSpy
    .mockImplementation(getHistoricGamesMock);
  setHistoricGamesSpy
    .mockImplementation(setHistoricGamesMock);
  updateHistoricGamesSpy
    .mockImplementation(updateHistoricGamesMock);
};

export const reset = () => {
  getHistoricGamesSpy.mockClear();
  setHistoricGamesSpy.mockClear();
  updateHistoricGamesSpy.mockClear();
};
