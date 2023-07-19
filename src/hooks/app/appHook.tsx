import { useCallback, useEffect, useState } from 'react';
import i18n, { FormatFunction } from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { useAppDispatch, useAppSelector } from '../state/appStateHook';
import { selectUserIsCreating, selectUserSettings } from '../../state/user/user.selectors';
import { Theme } from '../../models/internal/types/ThemeEnum.model';
import { FirebaseUserDto, FirebaseUserSettingsDto } from '../../models/dtos/firebaseStore/firebaseUser.model';
import { auth } from '../../utils/firebase.util';
import { setUserAuthAction, unsetUserAction } from '../../state/user/user.actions';
import { useUser } from '../user/userHook';
import { Language } from '../../models/internal/types/LanguageEnum.model';
import { TRANSLATIONS_EN } from '../../locales/en';
import { TRANSLATIONS_ES } from '../../locales/es';
import { TRANSLATIONS_FR } from '../../locales/fr';
import { useCurrentGame } from '../currentGame/currentGameHook';
import { useHistoricGames } from '../historicGames/historicGamesHook';
import { useWakeLock } from '../useWakeLock/wakeLockHook';

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
  const { getUser, setAnonymousUser } = useUser();
  const { getGame, setAnonymousGame } = useCurrentGame();
  const { getHistoric, setAnonymousHistoric } = useHistoricGames();
  const { isAvailable: isWakeLockAvailable, lockScreen } = useWakeLock();

  const userSettings = useAppSelector<FirebaseUserSettingsDto | undefined>(selectUserSettings);
  const userIsCreating = useAppSelector<boolean>(selectUserIsCreating);

  const [authStateChanged, setAuthStateChanged] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [theme, setTheme] = useState<Theme>(getBrowserTheme());
  const [language, setLanguage] = useState<Language>(getBrowserLanguage());

  const initializeLockScreen = async () => {
    if (isWakeLockAvailable) {
      await lockScreen();
    }
  };
  const initializeUser = async () => {
    setLoading(true);
    (auth.currentUser)
      ? await initializeAthenticatedUser()
      : initializeAnonymousUser();
    setLoading(false);
  };

  const initializeAthenticatedUser = async () => {
    dispatch(setUserAuthAction(auth.currentUser));
    const settings = await getUser();
    const user = settings.data() as FirebaseUserDto;
    await getGame(user.currentGame.id);
    await getHistoric(user.historicGames.id);
  };

  const initializeAnonymousUser = () => {
    dispatch(unsetUserAction());
    setAnonymousUser(getBrowserLanguage(), (getBrowserTheme() === Theme.Dark));
    setAnonymousGame();
    setAnonymousHistoric();
  };

  const formatterClb: FormatFunction | undefined = (value, format, lng): string => {
    if (format === 'date') {
      return new Intl.DateTimeFormat(lng).format(value);
    }
    if (format === 'datetime') {
      return new Intl.DateTimeFormat(lng, {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
      }).format(value);
    }
    return value;
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
        interpolation: {
          format: formatterClb,
          escapeValue: false,
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

    initializeLockScreen();

    auth.onAuthStateChanged(async () => {
      setAuthStateChanged(true);
    });
  }, []);

  useEffect(() => {
    if (authStateChanged && !userIsCreating) {
      initializeUser().then(() => {
        setAuthStateChanged(false);
      });
    }
  }, [userIsCreating, authStateChanged]);

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
    isWakeLockAvailable,
    language,
    loading,
  };
}
