import { AdditionalUserInfo, getAdditionalUserInfo } from 'firebase/auth';
import { useCallback, useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { UserCredential } from '@firebase/auth';
import {
  firebaseGoogleLogin, firebaseLogin, firebaseLogout, firebaseSignUp,
} from '../../services/firebaseAuth/firebaseAuth.service';
import { useUser } from '../user/userHook';
import { useAppDispatch, useAppSelector } from '../state/appStateHook';
import { FirebaseUserSettingsDto } from '../../models/dtos/firebaseStore/firebaseUser.model';
import { selectUserSettings } from '../../state/user/user.selectors';
import { selectGame } from '../../state/game/game.selectors';
import { useCurrentGame } from '../currentGame/currentGameHook';
import { setUserIsCreatingAction, unsetUserIsCreatingAction } from '../../state/user/user.actions';
import { GameState } from '../../state/game/models/appGame.state';
import { useHistoricGames } from '../historicGames/historicGamesHook';
import { HistoricGamesState } from '../../state/historicGames/models/appHistoricGames.state';
import { selectHistoricGames } from '../../state/historicGames/historicGames.selectors';

export function useAuth() {
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const { existsUserWithUserName, setUser } = useUser();
  const { setGame } = useCurrentGame();
  const { setHistoric } = useHistoricGames();
  const userSettings = useAppSelector<FirebaseUserSettingsDto | undefined>(selectUserSettings);
  const gameSettings = useAppSelector<GameState>(selectGame);
  const historicGames = useAppSelector<HistoricGamesState>(selectHistoricGames);

  const setupInitialDataIfRequired = async (user: UserCredential, userName: string) => {
    const { isNewUser } = getAdditionalUserInfo(user) as AdditionalUserInfo;

    if (isNewUser) {
      const newGame = await setGame(gameSettings);
      const newHistoricGames = await setHistoric(historicGames);
      await setUser(
        userSettings as FirebaseUserSettingsDto,
        newGame.id as string,
        newHistoricGames.id,
        userName,
      );
    }
  };

  const login = async (
    { userEmail, userPassword }:
    {userEmail: string, userPassword: string},
  ): Promise<UserCredential> => {
    setLoading(true);
    return firebaseLogin(userEmail, userPassword)
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
        await setupInitialDataIfRequired(resp, resp.user.email as string);

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

  const signUp = async (
    { userEmail, userName, userPassword }:
    { userEmail: string, userName: string, userPassword: string},
  ): Promise<UserCredential> => {
    setLoading(true);
    dispatch(setUserIsCreatingAction());
    const userNameAlreadyExists = await existsUserWithUserName(userName);
    return (!(userNameAlreadyExists)
      ? firebaseSignUp(userEmail, userPassword) : Promise.reject())
      .then(async (resp) => {
        await setupInitialDataIfRequired(resp, userName);

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
