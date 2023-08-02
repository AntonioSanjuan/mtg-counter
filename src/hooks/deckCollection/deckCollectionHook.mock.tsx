/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable camelcase */
/* eslint-disable no-promise-executor-return */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { DocumentData, DocumentSnapshot } from "firebase/firestore";

const getDeckCollectionResponseObj = { 
  id: 'testDeckCollectionId',
  data: () => {} 
} as DocumentSnapshot<DocumentData>;

let loadingResponseMock: boolean = false;
let errorResponseMock: boolean = false;

const getDeckCollectionSpy = jest.fn();
const setDeckCollectionSpy = jest.fn();
const updateDeckCollectionSpy = jest.fn();
const setAnonymousDeckCollectionSpy = jest.fn()

export const mockHistoricGamesResponse = {
  getDeckCollection: getDeckCollectionSpy,
  setDeckCollection: setDeckCollectionSpy,
  setAnonymousDeckCollection: setAnonymousDeckCollectionSpy,
  updateDeckCollection: updateDeckCollectionSpy,
  loading: loadingResponseMock,
  error: errorResponseMock,
}

export const mock = () => {
  return mockHistoricGamesResponse
};

export const initializeMock = () => {
  getDeckCollectionSpy.mockResolvedValue(getDeckCollectionResponseObj)
  setDeckCollectionSpy.mockResolvedValue(getDeckCollectionResponseObj)
  updateDeckCollectionSpy.mockResolvedValue(getDeckCollectionResponseObj)
  setAnonymousDeckCollectionSpy.mockResolvedValue(getDeckCollectionResponseObj)
}