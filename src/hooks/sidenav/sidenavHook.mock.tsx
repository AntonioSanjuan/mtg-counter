/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable camelcase */
/* eslint-disable no-promise-executor-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
const switchSidenavStatusSpy = jest.fn();

const mockSidenavMockResponse = {
  switchSidenavStatus: switchSidenavStatusSpy,
}
export const mock = () => {
  return mockSidenavMockResponse;
}

export const initializeMock = () => {
}
