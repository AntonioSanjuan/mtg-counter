import { useState } from 'react';
import { DocumentData, DocumentSnapshot } from 'firebase/firestore';
import { useAppDispatch, useAppSelector } from '../state/appStateHook';
import { FirebaseGameDto } from '../../models/dtos/firebaseStore/firebaseGameSettings.model';
import { setGameSettingsAction } from '../../state/game/game.actions';
import { auth } from '../../utils/firebase.util';
import * as gameService from '../../services/firebaseStore/gameSettings/gameSettings.service';
import { getNewGame } from '../../utils/factories/gameFactory/gameFactory';
import { GameState } from '../../state/game/models/appGame.state';
import { selectGame } from '../../state/game/game.selectors';

export function useGameSettings() {
  const dispatch = useAppDispatch();

  const gameSettingsState = useAppSelector<GameState>(selectGame);

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const getGameSettings = async (gameSettingsId: string): Promise<DocumentSnapshot<DocumentData>> => {
    setLoading(true);
    return gameService.getGameSettings(gameSettingsId)
      .then((gameResp) => {
        const game = gameResp.data() as FirebaseGameDto;
        const gameSettingsOutput: GameState = {
          ...game,
          id: gameResp.id,
        };

        dispatch(setGameSettingsAction(gameSettingsOutput));
        setLoading(false);
        setError(false);
        return gameResp;
      }).catch((e) => {
        setLoading(false);
        setError(true);
        throw e;
      });
  };

  const setGameSettings = async (gameSettings: FirebaseGameDto): Promise<any> => {
    setLoading(true);

    return gameService.setGameSettings(gameSettings).then((game) => {
      const gameSettingsOutput: GameState = {
        ...gameSettings,
        id: game.id,
      };
      dispatch(setGameSettingsAction(gameSettingsOutput));
      setLoading(false);
      setError(false);
      return gameSettingsOutput;
    }).catch((e) => {
      setLoading(false);
      setError(true);
      throw e;
    });
  };

  const updateGameSettings = async (
    gameSettingsId: string | undefined,
    gameSettings: FirebaseGameDto,
  ): Promise<any> => {
    setLoading(true);
    const gameSettingsOutput: GameState = {
      id: gameSettingsId,
      ...gameSettings,
    };
    if (auth.currentUser) {
      return gameService.updateGameSettings(gameSettingsId as string, gameSettings)
        .then(() => {
          dispatch(setGameSettingsAction(gameSettingsOutput));
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
    dispatch(setGameSettingsAction(gameSettingsOutput));
    return {};
  };

  const setAnonymousGameSettings = () => {
    const gameSettingsOutput: GameState = {
      id: undefined,
      ...getNewGame(),
    };

    dispatch(setGameSettingsAction(gameSettingsOutput));
  };

  return {
    getGameSettings,
    setGameSettings,
    setAnonymousGameSettings,
    updateGameSettings,
    loading,
    error,
  };
}
