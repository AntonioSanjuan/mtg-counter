import { User } from 'firebase/auth';
import { FirebaseStoredArticleInternal } from '../../../models/dtos/firebaseStore/firebaseStoredArticle.model';
import { FirebaseUserSettingsDto } from '../../../models/dtos/firebaseStore/firebaseUserSettings.model';

export interface UserState {
  isLogged: boolean;
  userData: User | null;
  userSettings: FirebaseUserSettingsDto | undefined;
  userStoredArticles: FirebaseStoredArticleInternal[] | undefined;
}
