/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable camelcase */
/* eslint-disable no-promise-executor-return */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { DocumentData, DocumentSnapshot } from "firebase/firestore";

const getGameSettingsResponseObj = { 
  id: 'testGameSettingsId',
  data: () => {} 
} as DocumentSnapshot<DocumentData>;

let loadingResponseMock: boolean = false;
let errorResponseMock: boolean = false;

export const getGameSettingsSpy = jest.fn();
export const setGameSettingsSpy = jest.fn();
export const updateGameSettingsSpy = jest.fn();
export const setAnonymousGameSettingsSpy = jest.fn();

export const mockGameSettingsResponse = {
  getGameSettings: getGameSettingsSpy.mockResolvedValue(getGameSettingsResponseObj),
  setGameSettings: setGameSettingsSpy.mockResolvedValue(getGameSettingsResponseObj),
  setAnonymousGameSettings: setAnonymousGameSettingsSpy.mockResolvedValue(getGameSettingsResponseObj),
  updateGameSettings: updateGameSettingsSpy.mockResolvedValue(getGameSettingsResponseObj),
  loading: loadingResponseMock,
  error: errorResponseMock,
}

export const useGameSettingsMock = jest.fn(() => {
  return mockGameSettingsResponse
});

export const initializeMock = () => {
  getGameSettingsSpy.mockResolvedValue(getGameSettingsResponseObj)
  setGameSettingsSpy.mockResolvedValue(getGameSettingsResponseObj)
  setAnonymousGameSettingsSpy.mockResolvedValue(getGameSettingsResponseObj)
  updateGameSettingsSpy.mockResolvedValue(getGameSettingsResponseObj)
}