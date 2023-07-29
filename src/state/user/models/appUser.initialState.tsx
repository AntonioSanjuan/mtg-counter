import { auth } from '../../../utils/firebase.util';
import { UserState } from './appUser.state';

export const userInitialState: UserState = {
  isLogged: false,
  isCreating: false,
  userSettings: undefined,
  userName: '',
  userData: auth.currentUser,
};
