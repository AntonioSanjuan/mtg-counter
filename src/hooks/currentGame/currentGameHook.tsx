import { useState } from 'react';
import { DocumentData, DocumentSnapshot } from 'firebase/firestore';
import { useAppDispatch, useAppSelector } from '../state/appStateHook';
import { FirebaseGameDto, FirebasePlayerDto } from '../../models/dtos/firebaseStore/firebaseGame.model';
import { setGameAction, setGamePlayerAction } from '../../state/game/game.actions';
import { auth } from '../../utils/firebase.util';
import * as gameService from '../../services/firebaseStore/game/game.service';
import { getNewGame } from '../../utils/factories/gameFactory/gameFactory';
import { GameState } from '../../state/game/models/appGame.state';
import { GameAdapter } from '../../adapters/games/game.adapter';

export function useCurrentGame() {
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const getGame = async (gameSettingsId: string): Promise<DocumentSnapshot<DocumentData>> => {
    setLoading(true);
    return gameService.getGame(gameSettingsId)
      .then((gameResp) => {
        const game = gameResp.data() as FirebaseGameDto;

        const gameSettingsOutput = GameAdapter.toState(
          game,
          gameResp.id,
        );

        dispatch(setGameAction(gameSettingsOutput));
        setLoading(false);
        setError(false);
        return gameResp;
      }).catch((e) => {
        setLoading(false);
        setError(true);
        throw e;
      });
  };

  const setGame = async (gameSettings: GameState): Promise<GameState> => {
    setLoading(true);

    const gameSettingsInput = GameAdapter.toDto(
      gameSettings,
    );
    return gameService.setGame(gameSettingsInput).then((game) => {
      const gameSettingsOutput: GameState = {
        ...gameSettings,
        id: game.id,
      };
      dispatch(setGameAction(gameSettingsOutput));
      setLoading(false);
      setError(false);
      return gameSettingsOutput;
    }).catch((e) => {
      setLoading(false);
      setError(true);
      throw e;
    });
  };

  const updateGame = async (
    gameSettingsId: string | undefined,
    gameSettings: GameState,
  ): Promise<GameState> => {
    setLoading(true);
    const gameSettingsInput = GameAdapter.toDto(
      gameSettings,
    );
    if (auth.currentUser) {
      return gameService.updateGame(gameSettingsId as string, gameSettingsInput)
        .then(() => {
          dispatch(setGameAction(gameSettings));
          setLoading(false);
          setError(false);
          return gameSettings;
        }).catch((e) => {
          setLoading(false);
          setError(true);
          throw e;
        });
    }
    setLoading(false);
    setError(false);
    dispatch(setGameAction(gameSettings));
    return gameSettings;
  };

  const updateGamePlayer = async (
    gameSettingsId: string | undefined,
    gameSettings: GameState,
    gamePlayerToUpdate: FirebasePlayerDto,
  ): Promise<GameState> => {
    setLoading(true);

    const gameSettingsInput = GameAdapter.toDto(
      gameSettings,
    );

    if (auth.currentUser) {
      return gameService.updateGamePlayer(
        gameSettingsId as string,
        gameSettingsInput,
        gamePlayerToUpdate,
      )
        .then(() => {
          dispatch(setGamePlayerAction(gamePlayerToUpdate));
          setLoading(false);
          setError(false);
          return gameSettings;
        }).catch((e) => {
          setLoading(false);
          setError(true);
          throw e;
        });
    }
    setLoading(false);
    setError(false);
    dispatch(setGamePlayerAction(gamePlayerToUpdate));
    return gameSettings;
  };

  const setAnonymousGame = () => {
    const gameSettingsOutput: GameState = {
      ...getNewGame(),
    };

    dispatch(setGameAction(gameSettingsOutput));
  };

  return {
    getGame,
    setGame,
    setAnonymousGame,
    updateGame,
    updateGamePlayer,
    loading,
    error,
  };
}
