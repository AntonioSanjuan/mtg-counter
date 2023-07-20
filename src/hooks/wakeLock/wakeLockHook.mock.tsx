/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable camelcase */
/* eslint-disable no-promise-executor-return */
/* eslint-disable @typescript-eslint/no-explicit-any */

let loadingResponseMock: boolean = false;
let errorResponseMock: boolean = false;
let isAvailableMock: boolean = false;

const lockScreenSpy = jest.fn();
const releaseLockScreenSpy = jest.fn();

const mockUserMockResponse = {
  lockScreen: lockScreenSpy,
  releaseLockScreen: releaseLockScreenSpy,
  isAvailable: isAvailableMock,
  loading: loadingResponseMock,
  error: errorResponseMock,
}

export const mock = () => {
  return mockUserMockResponse;
}

export const initializeMock = () => {
  lockScreenSpy.mockReturnValue({})
  releaseLockScreenSpy.mockReturnValue({})
}