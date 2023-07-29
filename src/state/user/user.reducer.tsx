import { userInitialState } from './models/appUser.initialState';
import { UserState } from './models/appUser.state';
import { UserActions } from './user.actions';

// eslint-disable-next-line default-param-last
const userReducer = (state: UserState = userInitialState, action: any) => {
  switch (action.type) {
    case UserActions.setUser:
      return {
        ...state,
        isLogged: true,
        isCreating: false,
        userData: action.payload,
      };
    case UserActions.setUserSettings:
      return {
        ...state,
        userSettings: action.payload.userSettings,
        userName: action.payload.userName
      };
    case UserActions.unsetUser:
      return {
        ...state,
        isLogged: false,
        userData: undefined,
        userSettings: undefined,
      };
    case UserActions.setUserIsCreating:
      return {
        ...state,
        isCreating: true,
      }
    case UserActions.unsetUserIsCreating:
      return {
        ...state,
        isCreating: false,
      }
    default:
      return state;
  }
};

export { userReducer };
