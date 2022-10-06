/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable camelcase */
/* eslint-disable no-promise-executor-return */
/* eslint-disable @typescript-eslint/no-explicit-any */

let loadingResponseMock: boolean;
let errorResponseMock: boolean;

const useUserSettings_UpdateUserSettings = jest.fn(() => new Promise<any>(
  (resolve) => resolve({}),
));

export const useUserSettingsMock = () => ({
  updateUserSettings: useUserSettings_UpdateUserSettings,
  loading: loadingResponseMock,
  error: errorResponseMock,
});
