/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable camelcase */
/* eslint-disable no-promise-executor-return */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { DocumentData, DocumentSnapshot } from "firebase/firestore";

const getHistoricGamesResponseObj = { 
  id: 'testHistoricGamesId',
  data: () => {} 
} as DocumentSnapshot<DocumentData>;

let loadingResponseMock: boolean = false;
let errorResponseMock: boolean = false;

const getHistoricSpy = jest.fn();
const setHistoricSpy = jest.fn();
const setAnonymousHistoricSpy = jest.fn();
const updateHistoricSpy = jest.fn();

export const mockHistoricGamesResponse = {
  getHistoric: getHistoricSpy,
  setHistoric: setHistoricSpy,
  setAnonymousHistoric: setAnonymousHistoricSpy,
  updateHistoric: updateHistoricSpy,
  loading: loadingResponseMock,
  error: errorResponseMock,
}

export const mock = () => {
  return mockHistoricGamesResponse
};

export const initializeMock = () => {
  getHistoricSpy.mockResolvedValue(getHistoricGamesResponseObj)
  setHistoricSpy.mockResolvedValue(getHistoricGamesResponseObj)
  setAnonymousHistoricSpy.mockResolvedValue(getHistoricGamesResponseObj)
  updateHistoricSpy.mockResolvedValue(getHistoricGamesResponseObj)
}