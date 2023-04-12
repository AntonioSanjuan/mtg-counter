import { AdditionalUserInfo, getAdditionalUserInfo } from 'firebase/auth';
import { useCallback, useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { UserCredential } from '@firebase/auth';
import {
  firebaseGoogleLogin, firebaseLogin, firebaseLogout, firebaseSignUp,
} from '../../services/firebaseAuth/firebaseAuth.service';
import { useUserSettings } from '../userSettings/userSettingsHook';
import { useAppDispatch, useAppSelector } from '../state/appStateHook';
import { FirebaseUserSettingsDto } from '../../models/dtos/firebaseStore/firebaseUserSettings.model';
import { selectUserSettings } from '../../state/user/user.selectors';
import { FirebaseGameDto } from '../../models/dtos/firebaseStore/firebaseGameSettings.model';
import { selectGame } from '../../state/game/game.selectors';
import { useGameSettings } from '../gameSettings/gameSettingsHook';
import { setUserIsCreatingAction, unsetUserIsCreatingAction } from '../../state/user/user.actions';
import { GameState } from '../../state/game/models/appGame.state';

export function useUser() {
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const { setUserSettings } = useUserSettings();
  const { setGameSettings } = useGameSettings();
  const userSettings = useAppSelector<FirebaseUserSettingsDto | undefined>(selectUserSettings);
  const gameSettings = useAppSelector<GameState>(selectGame);

  const setupInitialDataIfRequired = async (user: UserCredential) => {
    const { isNewUser } = getAdditionalUserInfo(user) as AdditionalUserInfo;

    if (isNewUser) {
      const newGameSettings = await setGameSettings(gameSettings as FirebaseGameDto);
      await setUserSettings(userSettings as FirebaseUserSettingsDto, newGameSettings.id);
    }
  };

  const login = async ({ username, password }: {username: string, password: string}): Promise<UserCredential> => {
    setLoading(true);
    return firebaseLogin(username, password)
      .then((resp) => {
        setLoading(false);
        setError(false);
        return resp;
      }).catch((e) => {
        setLoading(false);
        setError(true);
        throw e;
      });
  };

  const loginWithGoogle = async (): Promise<UserCredential> => {
    setLoading(true);
    dispatch(setUserIsCreatingAction());

    return firebaseGoogleLogin()
      .then(async (resp) => {
        await setupInitialDataIfRequired(resp);

        setLoading(false);
        setError(false);
        return resp;
      }).catch((e) => {
        setLoading(false);
        setError(true);
        throw e;
      }).finally(() => {
        dispatch(unsetUserIsCreatingAction());
      });
  };

  const signUp = async ({ username, password }: { username: string, password: string}): Promise<UserCredential> => {
    setLoading(true);
    dispatch(setUserIsCreatingAction());

    return firebaseSignUp(username, password)
      .then(async (resp) => {
        await setupInitialDataIfRequired(resp);

        setLoading(false);
        setError(false);
        return resp;
      }).catch((e) => {
        setLoading(false);
        setError(true);
        throw e;
      }).finally(() => {
        dispatch(unsetUserIsCreatingAction());
      });
  };

  const logout = useCallback(async (): Promise<void> => {
    await firebaseLogout();
  }, []);

  return {
    login,
    loginWithGoogle,
    logout,
    signUp,
    loading,
    error,
  };
}
