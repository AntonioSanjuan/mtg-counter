import { useEffect, useState } from 'react';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { useAppDispatch, useAppSelector } from '../state/appStateHook';
import { selectUserSettings } from '../../state/user/user.selectors';
import { Theme } from '../../models/internal/types/ThemeEnum.model';
import { FirebaseUserSettingsDto } from '../../models/dtos/firebaseStore/firebaseUserSettings.model';
import { auth } from '../../utils/firebase.util';
import { setUserAction, unsetUserAction } from '../../state/user/user.actions';
import { useUserSettings } from '../userSettings/userSettingsHook';
import { Language } from '../../models/internal/types/LanguageEnum.model';
import { TRANSLATIONS_EN } from '../../locales/en';
import { TRANSLATIONS_ES } from '../../locales/es';
import { TRANSLATIONS_FR } from '../../locales/fr';
import { useGameSettings } from '../gameSettings/gameSettingsHook';

const getBrowserTheme = (): Theme => (window
  .matchMedia('(prefers-color-scheme: dark)').matches ? Theme.Dark : Theme.Light);

const getBrowserLanguage = (): Language => {
  const browserLanguage = window.navigator.language;
  return (browserLanguage && browserLanguage.length >= 2
    && Object.values(Language).includes(browserLanguage as Language))
    ? browserLanguage.substring(0, 2) as Language
    : Language.English;
};

const changeTheme = (theme: Theme): void => {
  document.body.setAttribute('data-theme', theme);
};

const changeLanguage = (lang: Language) => {
  i18n.changeLanguage(lang);
};

export function useApp() {
  const dispatch = useAppDispatch();
  const { getUserSettings, setAnonymousUserSettings } = useUserSettings();
  const { getGameSettings, setAnonymousGameSettings } = useGameSettings();

  const userSettings = useAppSelector<FirebaseUserSettingsDto | undefined>(selectUserSettings);

  const [loading, setLoading] = useState<boolean>(true);
  const [theme, setTheme] = useState<Theme>(getBrowserTheme());
  const [language, setLanguage] = useState<Language>(getBrowserLanguage());

  const initializeAthenticatedUser = async () => {
    dispatch(setUserAction(auth.currentUser));
    await getUserSettings();
    await getGameSettings();
  };

  const initializeAnonymousUser = () => {
    dispatch(unsetUserAction());
    setAnonymousUserSettings(getBrowserLanguage(), (getBrowserTheme() === Theme.Dark));
    setAnonymousGameSettings();
  };

  const initializeLanguage = () => {
    i18n
      .use(LanguageDetector)
      .use(initReactI18next)
      .init({
        resources: {
          en: {
            translation: TRANSLATIONS_EN,
          },
          es: {
            translation: TRANSLATIONS_ES,
          },
          fr: {
            translation: TRANSLATIONS_FR,
          },
        },
        supportedLngs: Object.values(Language),
      });
  };

  const initializeTheme = (): void => {
    changeTheme(theme);
  };

  useEffect(() => {
    initializeLanguage();
    initializeTheme();

    auth.onAuthStateChanged(async () => {
      setLoading(true);
      (auth.currentUser)
        ? await initializeAthenticatedUser()
        : initializeAnonymousUser();
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (userSettings) {
      setTheme(userSettings.darkMode ? Theme.Dark : Theme.Light);
      setLanguage(userSettings.lang);
    } else {
      setTheme(getBrowserTheme());
      setLanguage(getBrowserLanguage());
    }
  }, [userSettings]);

  useEffect(() => {
    changeLanguage(language);
  }, [language]);

  useEffect(() => {
    changeTheme(theme);
  }, [theme]);

  return {
    theme,
    language,
    loading,
  };
}
