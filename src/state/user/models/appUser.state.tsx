import { User } from 'firebase/auth';
import { FirebaseUserSettingsDto } from '../../../models/dtos/firebaseStore/firebaseUserSettings.model';

export interface UserState {
  isLogged: boolean;
  isCreating: boolean;
  userData: User | null;
  userSettings: FirebaseUserSettingsDto | undefined;
}
