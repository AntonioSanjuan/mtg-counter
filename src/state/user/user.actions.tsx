import { User } from 'firebase/auth';
import { FirebaseStoredArticleInternal } from '../../models/dtos/firebaseStore/firebaseStoredArticle.model';
import { FirebaseUserSettingsDto } from '../../models/dtos/firebaseStore/firebaseUserSettings.model';

export enum UserActions {
    setUser = '@action/setUSer',
    setUserSettings = '@action/setUserSettings',
    unsetUser = '@action/unsetUser',
    setStoredArticles = '@action/setUserStoredArticles'
}

export const setUserSettingsAction = (userSettings: FirebaseUserSettingsDto) => ({
  type: UserActions.setUserSettings,
  payload: userSettings,
});

export const setUserStoredArticlesAction = (userStoredArticles: FirebaseStoredArticleInternal[]) => ({
  type: UserActions.setStoredArticles,
  payload: userStoredArticles,
});

export const setUserAction = (userData: User|null) => ({
  type: UserActions.setUser,
  payload: userData,
});

export const unsetUserAction = () => ({
  type: UserActions.unsetUser,
});
