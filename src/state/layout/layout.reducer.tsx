import { LayoutActions } from './layout.actions';
import { layoutInitialState } from './models/appLayout.initialState';
import { LayoutState } from './models/appLayout.state';

const layoutReducer = (state: LayoutState = layoutInitialState, action: any) => {
  switch (action.type) {
    case LayoutActions.switchSidenavStatus:
      return {
        ...state,
        isSidenavOpened: !state.isSidenavOpened,
      };
    case LayoutActions.openAlert:
      return {
        ...state,
        alert: {
          ...state.alert,
          isAlertOpened: true,
          alertContent: action.payload,
        },
      };
    case LayoutActions.closeAlert:
      return {
        ...state,
        alert: {
          ...state.alert,
          isAlertOpened: false,
          alertContent: undefined,
        },
      };
    default:
      return state;
  }
};

export { layoutReducer };
