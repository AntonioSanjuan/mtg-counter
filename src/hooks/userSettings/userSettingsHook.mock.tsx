/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable camelcase */
/* eslint-disable no-promise-executor-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { DocumentData, DocumentSnapshot } from 'firebase/firestore';
import { FirebaseUserDto } from '../../models/dtos/firebaseStore/firebaseUserSettings.model';

const getUserSettingsResponseObj = { 
  id: 'testUserSettingsId',
  data: () => {
    return {
      currentGame: {
        id: 'testCurrentGameId'
      }
    } as Partial<FirebaseUserDto>
} } as DocumentSnapshot<DocumentData>;

let loadingResponseMock: boolean = false;
let errorResponseMock: boolean = false;

export const getUserSettingsSpy = jest.fn();
export const setUserSettingsSpy = jest.fn();
export const updateUserSettingsSpy = jest.fn();
export const setAnonymousUserSettingsSpy = jest.fn();

export const mockUserSettingsMockResponse = {
  getUserSettings: getUserSettingsSpy,
  setUserSettings: setUserSettingsSpy,
  setAnonymousUserSettings: setAnonymousUserSettingsSpy,
  updateUserSettings: updateUserSettingsSpy,
  loading: loadingResponseMock,
  error: errorResponseMock,
}

export const useUserSettingsMock = () => {
  return mockUserSettingsMockResponse;
}

export const initializeMock = () => {
  getUserSettingsSpy.mockResolvedValue(getUserSettingsResponseObj)
  setUserSettingsSpy.mockResolvedValue(getUserSettingsResponseObj)
  setAnonymousUserSettingsSpy.mockResolvedValue(undefined)
  updateUserSettingsSpy.mockResolvedValue(getUserSettingsResponseObj)
}