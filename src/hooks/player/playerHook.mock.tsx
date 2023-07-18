/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable camelcase */
/* eslint-disable no-promise-executor-return */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { FirebasePlayerDto } from "../../models/dtos/firebaseStore/firebaseGame.model"

const playerOpponentsResponseObject: FirebasePlayerDto[] = []

const updatePlayerCounterSpy = jest.fn()
const updatePlayerColorSpy = jest.fn()
const updatePlayerDetailsSpy = jest.fn()
const updatePlayerOwnerSpy = jest.fn()
const updatePlayerWinnerSpy = jest.fn()

const mockPlayerMockResponse= {
  updatePlayerCounter: updatePlayerCounterSpy,
  updatePlayerColor: updatePlayerColorSpy,
  updatePlayerDetails: updatePlayerDetailsSpy,
  updatePlayerOwner: updatePlayerOwnerSpy,
  updatePlayerWinner: updatePlayerWinnerSpy,
  playerOpponents: playerOpponentsResponseObject
}
export const mock = () => {
  return mockPlayerMockResponse;
}

export const initializeMock = () => {
  updatePlayerCounterSpy.mockResolvedValue(undefined)
  updatePlayerColorSpy.mockResolvedValue(undefined)
  updatePlayerDetailsSpy.mockResolvedValue(undefined)
  updatePlayerOwnerSpy.mockResolvedValue(undefined)
  updatePlayerWinnerSpy.mockResolvedValue(undefined)
}