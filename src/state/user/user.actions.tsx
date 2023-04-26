import { User } from 'firebase/auth';
import { FirebaseUserSettingsDto } from '../../models/dtos/firebaseStore/firebaseUser.model';

export enum UserActions {
    setUser = '@action/setUSer',
    setUserSettings = '@action/setUserSettings',
    unsetUser = '@action/unsetUser',
    setUserIsCreating = '@action/setUserIsCreating',
    unsetUserIsCreating = '@action/unsetUserIsCreating'
}

export const setUserSettingsAction = (userSettings: FirebaseUserSettingsDto) => ({
  type: UserActions.setUserSettings,
  payload: userSettings,
});

export const setUserAuthAction = (userData: User|null) => ({
  type: UserActions.setUser,
  payload: userData,
});

export const unsetUserAction = () => ({
  type: UserActions.unsetUser,
});

export const setUserIsCreatingAction = () => ({
  type: UserActions.setUserIsCreating,
});

export const unsetUserIsCreatingAction = () => ({
  type: UserActions.unsetUserIsCreating,
});
