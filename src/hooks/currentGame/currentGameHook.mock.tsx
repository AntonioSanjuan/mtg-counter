/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable camelcase */
/* eslint-disable no-promise-executor-return */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { DocumentData, DocumentSnapshot } from "firebase/firestore";

const getGameResponseObj = { 
  id: 'testGameSettingsId',
  data: () => {} 
} as DocumentSnapshot<DocumentData>;

let loadingResponseMock: boolean = false;
let errorResponseMock: boolean = false;

const getGameSpy = jest.fn();
const setGameSpy = jest.fn();
const updateGameSpy = jest.fn();
const updateGamePlayerSpy = jest.fn()
const setAnonymousGameSpy = jest.fn();

export const mockGameResponse = {
  getGame: getGameSpy,
  setGame: setGameSpy,
  setAnonymousGame: setAnonymousGameSpy,
  updateGame: updateGameSpy,
  updateGamePlayer: updateGamePlayerSpy,
  loading: loadingResponseMock,
  error: errorResponseMock,
}

export const mock = () => {
  return mockGameResponse
};

export const initializeMock = () => {
  getGameSpy.mockResolvedValue(getGameResponseObj)
  setGameSpy.mockResolvedValue(getGameResponseObj)
  setAnonymousGameSpy.mockResolvedValue(undefined)
  updateGameSpy.mockResolvedValue(getGameResponseObj)
  updateGamePlayerSpy.mockResolvedValue(getGameResponseObj)
}