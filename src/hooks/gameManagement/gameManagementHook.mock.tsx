/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable camelcase */
/* eslint-disable no-promise-executor-return */
/* eslint-disable @typescript-eslint/no-explicit-any */

let loadingResponseMock: boolean = false;
let errorResponseMock: boolean = false;

const restartGameSpy = jest.fn();
const saveAndRestartGameSpy = jest.fn();
const startNewGameSpy = jest.fn();
const resizeGameSpy = jest.fn();

export const mockGameManagementResponse = {
  restartGame: restartGameSpy,
  saveAndRestartGame: saveAndRestartGameSpy,
  startNewGame: startNewGameSpy,
  resizeGame: resizeGameSpy,
  loading: loadingResponseMock,
  error: errorResponseMock,
}

export const mock = () => {
  return mockGameManagementResponse
};

export const initializeMock = () => {
  restartGameSpy.mockResolvedValue(undefined)
  saveAndRestartGameSpy.mockResolvedValue(undefined)
  startNewGameSpy.mockResolvedValue(undefined)
  resizeGameSpy.mockResolvedValue(undefined)
}