import { useState } from 'react';
import { DocumentData, DocumentSnapshot } from 'firebase/firestore';
import { useAppDispatch } from '../state/appStateHook';
import * as userService from '../../services/firebaseStore/user/user.service';
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
    return userService.getUser()
      .then((userResp) => {
        const user = userResp.data() as FirebaseUserDto;
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

  const setUserSettings = async (userSettings: FirebaseUserSettingsDto): Promise<any> => {
    setLoading(true);
    return userService.setUserSettings(userSettings).then(() => {
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
      return userService.updateUserSettings(settings)
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
