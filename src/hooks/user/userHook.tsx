import { useState } from 'react';
import { DocumentData, DocumentSnapshot } from 'firebase/firestore';
import { useAppDispatch } from '../state/appStateHook';
import * as userSettingsService from '../../services/firebaseStore/user/user.service';
import { FirebaseUserDto, FirebaseUserSettingsDto } from '../../models/dtos/firebaseStore/firebaseUser.model';
import { setUserSettingsAction } from '../../state/user/user.actions';
import { Language } from '../../models/internal/types/LanguageEnum.model';
import { auth } from '../../utils/firebase.util';

export function useUser() {
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const getUser = async (): Promise<DocumentSnapshot<DocumentData>> => {
    setLoading(true);
    return userSettingsService.getUser()
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

  const setUser = async (userSettings: FirebaseUserSettingsDto, gameId: string, historicId: string): Promise<any> => {
    setLoading(true);
    return userSettingsService.setUser(userSettings, gameId, historicId).then(() => {
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

  const updateUser = async (settings: FirebaseUserSettingsDto): Promise<any> => {
    setLoading(true);
    if (auth.currentUser) {
      return userSettingsService.updateUser(settings)
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

  const updateUserCurrentGame = async (gameId: string): Promise<any> => {
    setLoading(true);
    if (auth.currentUser) {
      return userSettingsService.updateUserCurrentGame(gameId)
        .then(() => {
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
    return {};
  };

  const setAnonymousUser = (lang: Language, darkMode: boolean) => {
    dispatch(setUserSettingsAction({
      darkMode,
      lang,
    } as FirebaseUserSettingsDto));
  };

  return {
    getUser,
    setUser,
    setAnonymousUser,
    updateUser,
    updateUserCurrentGame,
    loading,
    error,
  };
}
