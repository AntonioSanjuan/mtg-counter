/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable camelcase */
/* eslint-disable no-promise-executor-return */
/* eslint-disable @typescript-eslint/no-explicit-any */

const updatePlayerCounterSpy = jest.fn(() => new Promise<void>(
  (resolve) => resolve(),
));
const updatePlayerColorSpy = jest.fn(() => new Promise<void>(
  (resolve) => resolve(),
));

const mockPlayerMockResponse= {
  updatePlayerCounter: updatePlayerCounterSpy,
  updatePlayerColor: updatePlayerColorSpy,
}
export const mock = () => {
  return mockPlayerMockResponse;
}

export const initializeMock = () => {
  updatePlayerCounterSpy.mockResolvedValue()
  updatePlayerColorSpy.mockResolvedValue()
}