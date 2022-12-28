import React from 'react';
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable camelcase */
/* eslint-disable no-promise-executor-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
const temporaryCountResponseObj: number = 0

const useCounter_AddCounters = jest.fn(() => {});
const useCounter_RemoveCounters = jest.fn(() => {});

export const useCounterMock = () => ({
  temporaryCount: temporaryCountResponseObj,
  addCounters: useCounter_AddCounters,
  removeCounters: useCounter_RemoveCounters,
});
