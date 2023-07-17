import React from 'react';
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable camelcase */
/* eslint-disable no-promise-executor-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
const getAlertContentResponseObj = React.createElement('h1') as any;
const canBeClosedResponseObj: boolean = true

const getAlertContentSpy = jest.fn();
const openAlertSpy = jest.fn();
const closeAlertSpy = jest.fn();
const canBeClosed = canBeClosedResponseObj

export const mockAlertResponse = {
  getAlertContent: getAlertContentSpy,
  openAlert: openAlertSpy,
  closeAlert: closeAlertSpy,
  canBeClosed
}
export const mock = () => {
  return mockAlertResponse;
};

export const initializeMock = () => {
  getAlertContentSpy.mockReturnValue(getAlertContentResponseObj)
  openAlertSpy.mockReturnValue(undefined)
  closeAlertSpy.mockReturnValue(undefined)
}