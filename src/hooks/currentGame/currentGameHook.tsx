import { useState } from 'react';
import { DocumentData, DocumentSnapshot } from 'firebase/firestore';
import { useAppDispatch, useAppSelector } from '../state/appStateHook';
import { FirebaseGameDto } from '../../models/dtos/firebaseStore/firebaseGame.model';
import { setGameAction } from '../../state/game/game.actions';
import { auth } from '../../utils/firebase.util';
import * as gameService from '../../services/firebaseStore/game/game.service';
import { getNewGame } from '../../utils/factories/gameFactory/gameFactory';
import { GameState } from '../../state/game/models/appGame.state';
import { createGameState } from '../../adapters/games/game.adapter';

export function useCurrentGame() {
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const getGame = async (gameSettingsId: string): Promise<DocumentSnapshot<DocumentData>> => {
    setLoading(true);
    return gameService.getGame(gameSettingsId)
      .then((gameResp) => {
        const game = gameResp.data() as FirebaseGameDto;

        const gameSettingsOutput = createGameState(
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

  const setGame = async (gameSettings: FirebaseGameDto): Promise<any> => {
    setLoading(true);

    return gameService.setGame(gameSettings).then((game) => {
      const gameSettingsOutput = createGameState(
        gameSettings,
        game.id,
      );
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
    gameSettings: FirebaseGameDto,
  ): Promise<any> => {
    setLoading(true);
    const gameSettingsOutput = createGameState(
      gameSettings,
      gameSettingsId,
    );
    if (auth.currentUser) {
      return gameService.updateGame(gameSettingsId as string, gameSettings)
        .then(() => {
          dispatch(setGameAction(gameSettingsOutput));
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
    dispatch(setGameAction(gameSettingsOutput));
    return {};
  };

  const setAnonymousGame = () => {
    const gameSettingsOutput: GameState = {
      id: undefined,
      ...getNewGame(),
    };

    dispatch(setGameAction(gameSettingsOutput));
  };

  return {
    getGame,
    setGame,
    setAnonymousGame,
    updateGame,
    loading,
    error,
  };
}
