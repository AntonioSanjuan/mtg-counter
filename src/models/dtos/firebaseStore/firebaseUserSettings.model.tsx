import { Language } from '../../internal/types/LanguageEnum.model';

export interface FirebaseUserSettingsDto {
    lang: Language;
    darkMode: boolean;
}
