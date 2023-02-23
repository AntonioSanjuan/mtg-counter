import { useState } from 'react';
import { DocumentData, DocumentSnapshot } from 'firebase/firestore';
import { useAppDispatch } from '../state/appStateHook';
import * as userSettingsService from '../../services/firebaseStore/userSettings/userSettings.service';
import { FirebaseUserDto, FirebaseUserSettingsDto } from '../../models/dtos/firebaseStore/firebaseUserSettings.model';
import { setUserSettingsAction } from '../../state/user/user.actions';
import { Language } from '../../models/internal/types/LanguageEnum.model';
import { auth } from '../../utils/firebase.util';

export function useUserSettings() {
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const getUserSettings = async (): Promise<DocumentSnapshot<DocumentData>> => {
    setLoading(true);
    return userSettingsService.getUserSettings()
      .then((userResp) => {
        console.log('🚀 ~ file: userSettingsHook.tsx:20 ~ .then ~ userResp', userResp);
        const user = userResp.data() as FirebaseUserDto;
        console.log('🚀 ~ file: userSettingsHook.tsx:22 ~ .then ~ user', user);
        dispatch(setUserSettingsAction(user.userSettings));
        setLoading(false);
        setError(false);
        return userResp;
      }).catch((e) => {
        setLoading(false);
        setError(true);
        throw e;
      });
  };

  const setUserSettings = async (userSettings: FirebaseUserSettingsDto, gameId: string): Promise<any> => {
    setLoading(true);
    return userSettingsService.setUserSettings(userSettings, gameId).then(() => {
      dispatch(setUserSettingsAction(userSettings));
      setLoading(false);
      setError(false);
      return userSettings;
    }).catch((e) => {
      setLoading(false);
      setError(true);
      throw e;
    });
  };

  const updateUserSettings = async (settings: FirebaseUserSettingsDto): Promise<any> => {
    setLoading(true);
    if (auth.currentUser) {
      return userSettingsService.updateUserSettings(settings)
        .then(() => {
          dispatch(setUserSettingsAction(settings));
          setLoading(false);
          setError(false);
        }).catch((e) => {
          setLoading(false);
          setError(true);
          throw e;
        });
    }
    setLoading(false);
    setError(false);
    dispatch(setUserSettingsAction(settings));
    return {};
  };

  const setAnonymousUserSettings = (lang: Language, darkMode: boolean) => {
    dispatch(setUserSettingsAction({
      darkMode,
      lang,
    } as FirebaseUserSettingsDto));
  };

  return {
    getUserSettings,
    setUserSettings,
    setAnonymousUserSettings,
    updateUserSettings,
    loading,
    error,
  };
}
