/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable camelcase */
/* eslint-disable no-promise-executor-return */
/* eslint-disable @typescript-eslint/no-explicit-any */

const usePlayer_UpdatePlayerCounter = jest.fn(() => new Promise<void>(
  (resolve) => resolve(),
));
const usePlayer_UpdatePlayerColor = jest.fn(() => new Promise<void>(
  (resolve) => resolve(),
));

export const usePlayerMock = () => ({
  updatePlayerCounter: usePlayer_UpdatePlayerCounter,
  updatePlayerColor: usePlayer_UpdatePlayerColor,
});
