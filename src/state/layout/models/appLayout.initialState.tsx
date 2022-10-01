import { LayoutState } from './appLayout.state';

export const layoutInitialState: LayoutState = {
  isSidenavOpened: false,
  alert: {
    isAlertOpened: false,
    alertContent: undefined,
  },
};
