/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable camelcase */
/* eslint-disable no-promise-executor-return */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { DocumentData, DocumentSnapshot } from "firebase/firestore";
// import * as gameSettingsHook from './gameSettingsHook';

const getGameSettingsResponseObj = { 
  id: 'testGameSettingsId',
  data: () => {} 
} as DocumentSnapshot<DocumentData>;

let loadingResponseMock: boolean;
let errorResponseMock: boolean;


export const useGameSettingsMock = () => {
  const useGameSettings_GetGameSettings = jest.fn(() => new Promise<any>(
    (resolve) => resolve({...getGameSettingsResponseObj}),
  ));
  const useGameSettings_SetGameSettings = jest.fn(() => new Promise<any>(
    (resolve) => resolve({...getGameSettingsResponseObj}),
  ));
  const useGameSettings_UpdateGameSettings = jest.fn(() => new Promise<any>(
    (resolve) => resolve({}),
  ));
  const useGameSettings_SetAnonymousGameSettings = jest.fn(() => {});

  return {
    getGameSettings: useGameSettings_GetGameSettings,
    setGameSettings: useGameSettings_SetGameSettings,
    setAnonymousGameSettings: useGameSettings_SetAnonymousGameSettings,
    updateGameSettings: useGameSettings_UpdateGameSettings,
    loading: loadingResponseMock,
    error: errorResponseMock,
  }
};


