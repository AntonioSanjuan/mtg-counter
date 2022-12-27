import React from 'react';
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable camelcase */
/* eslint-disable no-promise-executor-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
let stateTransitionResponseMock: boolean;


export const useAnimationByStateTransitionMock = () => ({
  stateTransition: stateTransitionResponseMock
});
