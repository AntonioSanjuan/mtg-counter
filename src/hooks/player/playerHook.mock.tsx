/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable camelcase */
/* eslint-disable no-promise-executor-return */
/* eslint-disable @typescript-eslint/no-explicit-any */

const updatePlayerCounterSpy = jest.fn()
const updatePlayerColorSpy = jest.fn()
const updatePlayerDetailsSpy = jest.fn()

const mockPlayerMockResponse= {
  updatePlayerCounter: updatePlayerCounterSpy,
  updatePlayerColor: updatePlayerColorSpy,
  updatePlayerDetails: updatePlayerDetailsSpy
}
export const mock = () => {
  return mockPlayerMockResponse;
}

export const initializeMock = () => {
  updatePlayerCounterSpy.mockResolvedValue(undefined)
  updatePlayerColorSpy.mockResolvedValue(undefined)
  updatePlayerDetailsSpy.mockResolvedValue(undefined)
}