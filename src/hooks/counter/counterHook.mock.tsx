import React from 'react';
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable camelcase */
/* eslint-disable no-promise-executor-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
const temporaryCountMock: number = 0

const addCountersSpy = jest.fn(() => {});
const removeCountersSpy = jest.fn(() => {});

const mockCounterMockResponse = {
  temporaryCount: temporaryCountMock,
  addCounters: addCountersSpy,
  removeCounters: removeCountersSpy,
}

export const mock = () => {
  return mockCounterMockResponse;
}

export const initializeMock = () => {
  addCountersSpy.mockReturnValue()
  removeCountersSpy.mockReturnValue()
}