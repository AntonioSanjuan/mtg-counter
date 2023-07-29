import { Language } from '../../internal/types/LanguageEnum.model';

export interface FirebaseUserSettingsDto {
    lang: Language;
    darkMode: boolean;
}

export interface FirebaseUserDto {
    userSettings: FirebaseUserSettingsDto
    userName: string,
    currentGame: any;
    historicGames: any;
}
