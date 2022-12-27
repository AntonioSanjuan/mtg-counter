import React from 'react';
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable camelcase */
/* eslint-disable no-promise-executor-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
const getAlertContentResponseObj = React.createElement('h1') as any;

const useAlert_GetAlertContent = jest.fn(() => getAlertContentResponseObj);
const useAlert_OpenAlert = jest.fn(() => {});
const useAlert_CloseAlert = jest.fn(() => {});

export const useAlertMock = () => ({
  getAlertContent: useAlert_GetAlertContent,
  openAlert: useAlert_OpenAlert,
  closeAlert: useAlert_CloseAlert,
});
