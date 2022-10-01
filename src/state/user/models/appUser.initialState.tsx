import { auth } from '../../../utils/firebase.util';
import { UserState } from './appUser.state';

export const userInitialState: UserState = {
  isLogged: false,
  userSettings: undefined,
  userData: auth.currentUser,
  userStoredArticles: undefined,
};
