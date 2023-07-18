import React from 'react';
import { FirebasePlayerDto } from '../../models/dtos/firebaseStore/firebaseGame.model';
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable camelcase */
/* eslint-disable no-promise-executor-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
const temporaryCountMock: number = 0

const addCountersSpy = jest.fn(() => {});
const removeCountersSpy = jest.fn(() => {});
const getCounterOpponentSpy = jest.fn();

const mockCounterMockResponse = {
  temporaryCount: temporaryCountMock,
  addCounters: addCountersSpy,
  removeCounters: removeCountersSpy,
  getCounterOpponent: getCounterOpponentSpy
}

export const mock = () => {
  return mockCounterMockResponse;
}

export const initializeMock = () => {
  addCountersSpy.mockReturnValue()
  removeCountersSpy.mockReturnValue()
  getCounterOpponentSpy.mockReturnValue({})
}