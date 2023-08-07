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
import { IError } from '../../models/internal/commons/error.model';
import { ErrorAdapter } from '../../adapters/error/error.adapter';
import { DeckCollectionState } from '../../state/deckCollection/models/appDeckCollection.state';
import { selectDeckCollection } from '../../state/deckCollection/deckCollection.selectors';
import { useDeckCollection } from '../deckCollection/deckCollectionHook';
import { mapPlayerUserId } from '../../utils/mappers/playersMappers/playersMappers';
import { mapGameOwnerPlayerUserName } from '../../utils/mappers/gameMappers/gameMapper';
import { useUsers } from '../users/usersHook';

export function useAuth() {
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<IError|undefined>(undefined);
  const { existsUserWithUserName } = useUsers();
  const { setUser } = useUser();
  const { setGame } = useCurrentGame();
  const { setHistoric } = useHistoricGames();
  const { setDeckCollection } = useDeckCollection();
  const userSettings = useAppSelector<FirebaseUserSettingsDto | undefined>(selectUserSettings);
  const gameSettings = useAppSelector<GameState>(selectGame);
  const historicGames = useAppSelector<HistoricGamesState>(selectHistoricGames);
  const deckCollection = useAppSelector<DeckCollectionState>(selectDeckCollection);

  const setupInitialDataIfRequired = async (user: UserCredential, userName: string) => {
    const { isNewUser } = getAdditionalUserInfo(user) as AdditionalUserInfo;

    if (isNewUser) {
      const gameSettingsModified: GameState = mapGameOwnerPlayerUserName(gameSettings, userName);

      const newGame = await setGame(gameSettingsModified);
      const newHistoricGames = await setHistoric(historicGames);
      const newDeckCollection = await setDeckCollection(deckCollection);
      await setUser(
        userSettings as FirebaseUserSettingsDto,
        newGame.id as string,
        newHistoricGames.id,
        newDeckCollection.id,
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
        setError(undefined);
        return resp;
      }).catch((e) => {
        setLoading(false);
        setError(ErrorAdapter.newFirebaseError(e));
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
        setError(undefined);
        return resp;
      }).catch((e) => {
        setLoading(false);
        setError(ErrorAdapter.newFirebaseError(e));
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
    return !(userNameAlreadyExists)
      ? firebaseSignUp(userEmail, userPassword)
        .then(async (resp) => {
          await setupInitialDataIfRequired(resp, userName);

          setLoading(false);
          setError(undefined);
          return resp;
        }).catch((e) => {
          setLoading(false);
          setError(ErrorAdapter.newFirebaseError(e));
          throw e;
        }).finally(() => {
          dispatch(unsetUserIsCreatingAction());
        })
      : Promise.reject().catch((e) => {
        setLoading(false);
        setError(ErrorAdapter.newGenericError('InternalError: Error (auth/userName_already_in_use)'));
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
