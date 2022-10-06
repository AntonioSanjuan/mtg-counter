import { Language } from '../../internal/types/LanguageEnum.model';
import { FirebaseGameDto } from './firebaseGameSettings.model';

export interface FirebaseUserSettingsDto {
    lang: Language;
    darkMode: boolean;
}

export interface FirebaseUserDto {
    userSettings: FirebaseUserSettingsDto
    game: FirebaseGameDto
}
