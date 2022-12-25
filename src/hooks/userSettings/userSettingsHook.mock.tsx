/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable camelcase */
/* eslint-disable no-promise-executor-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { DocumentData, DocumentSnapshot } from 'firebase/firestore';

const getUserSettingsResponseObj = { data: () => {} } as DocumentSnapshot<DocumentData>;
let loadingResponseMock: boolean;
let errorResponseMock: boolean;

const useUserSettings_GetUserSettings = jest.fn(() => new Promise<DocumentSnapshot<DocumentData>>(
  (resolve) => resolve({} as DocumentSnapshot<DocumentData>),
));
const useUserSettings_SetUserSettings = jest.fn(() => new Promise<any>(
  (resolve) => resolve(getUserSettingsResponseObj),
));
const useUserSettings_UpdateUserSettings = jest.fn(() => new Promise<any>(
  (resolve) => resolve({}),
));
const useUserSettings_SetAnonymousUserSettings = jest.fn(() => {});

export const useUserSettingsMock = () => ({
  getUserSettings: useUserSettings_GetUserSettings,
  setUserSettings: useUserSettings_SetUserSettings,
  setAnonymousUserSettings: useUserSettings_SetAnonymousUserSettings,
  updateUserSettings: useUserSettings_UpdateUserSettings,
  loading: loadingResponseMock,
  error: errorResponseMock,
});
