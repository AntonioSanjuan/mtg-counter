/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable camelcase */
/* eslint-disable no-promise-executor-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { DocumentData, DocumentSnapshot } from 'firebase/firestore';
import * as historicGamesService from './deckCollection.service';

export const getDeckCollectionObjMock = {
  data: () => {},
} as DocumentSnapshot<DocumentData>;
export const setHistoricGamesObjMock = {} as any;
export const updateHistoricGamesObjMock = {} as any;

const getDeckCollectionMock = () => new Promise<DocumentSnapshot<DocumentData>>((resolve) => resolve(
  getDeckCollectionObjMock,
));
const setDeckCollectionMock = () => new Promise<any>((resolve) => resolve(setHistoricGamesObjMock));
const updateDeckCollectionMock = () => new Promise<any>((resolve) => resolve(updateHistoricGamesObjMock));

export const getDeckCollectionSpy = jest.spyOn(historicGamesService, "getDeckCollection");
export const setDeckCollectionSpy = jest.spyOn(historicGamesService, "setDeckCollection");
export const updateDeckCollectionSpy = jest.spyOn(historicGamesService, "updateDeckCollection");

export const initializeMock = () => {
  getDeckCollectionSpy
    .mockImplementation(getDeckCollectionMock);
  setDeckCollectionSpy
    .mockImplementation(setDeckCollectionMock);
  updateDeckCollectionSpy
    .mockImplementation(updateDeckCollectionMock);
};

export const reset = () => {
  getDeckCollectionSpy.mockClear();
  setDeckCollectionSpy.mockClear();
  updateDeckCollectionSpy.mockClear();
};
