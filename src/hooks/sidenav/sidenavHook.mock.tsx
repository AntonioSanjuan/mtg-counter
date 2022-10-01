/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable camelcase */
/* eslint-disable no-promise-executor-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
const useSidenavSwitchSidenavStatusMock = jest.fn(() => {});

export const useSidenavMock = () => ({
  switchSidenavStatus: useSidenavSwitchSidenavStatusMock,
});
