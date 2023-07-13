import { useState } from 'react';
import { FirebaseHistoricGamesDto } from '../../models/dtos/firebaseStore/firebaseHistoricGames.model';
import { useAppDispatch, useAppSelector } from '../state/appStateHook';
import * as historicGamesService from '../../services/firebaseStore/historicGames/historicGames.service';
import * as gameService from '../../services/firebaseStore/game/game.service';
import { setHistoricGamesAction } from '../../state/historicGames/historicGames.actions';
import { HistoricGamesState } from '../../state/historicGames/models/appHistoricGames.state';
import { auth } from '../../utils/firebase.util';
import { useCurrentGame } from '../currentGame/currentGameHook';
import { FirebaseGameDto } from '../../models/dtos/firebaseStore/firebaseGame.model';
import { createHistoricGamesState } from '../../adapters/historic/historic.adapter';
import { createGameState } from '../../adapters/games/game.adapter';
import { GameState } from '../../state/game/models/appGame.state';

export function useHistoricGames() {
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const getHistoricGame = async (historicGameId: string) => gameService.getGame(historicGameId)
    .then((gameResp) => {
      const game = gameResp.data() as FirebaseGameDto;
      return game;
    }).catch((e) => {
      throw e;
    });

  const getHistoric = async (historicId: string) => {
    setLoading(true);

    return historicGamesService.getHistoricGames(historicId)
      .then(async (historicResp) => {
        const historicGames = historicResp.data() as FirebaseHistoricGamesDto;

        // to-do
        const historicGamesData: GameState[] = await Promise.all(historicGames.games.map(async (gameId) => {
          const data = createGameState(await getHistoricGame(gameId), gameId);
          return data;
        }));
        const historicGamesOutput = createHistoricGamesState(
          historicGamesData,
          historicResp.id,
        );

        dispatch(setHistoricGamesAction(historicGamesOutput));
        setLoading(false);
        setError(false);
        return historicResp;
      }).catch((e) => {
        setLoading(false);
        setError(true);
        throw e;
      });
  };

  const setAnonymousHistoric = () => {
    const historicGamesOutput = createHistoricGamesState(
      { games: [] },
      undefined,
    );

    dispatch(setHistoricGamesAction(historicGamesOutput));
    setLoading(false);
    setError(false);
    return {};
  };

  const setHistoric = async (historicGames: FirebaseHistoricGamesDto) : Promise<any> => {
    setLoading(true);

    return historicGamesService.setHistoricGames(historicGames).then((historic) => {
      const historicGamesOutput = createHistoricGamesState(
        historicGames,
        historic.id,
      );
      dispatch(setHistoricGamesAction(historicGamesOutput));
      setLoading(false);
      setError(false);
      return historicGamesOutput;
    }).catch((e) => {
      setLoading(false);
      setError(true);
      throw e;
    });
  };

  const updateHistoric = async (
    historicId: string | undefined,
    historicGames: FirebaseHistoricGamesDto,
  ): Promise<any> => {
    setLoading(true);
    const historicGamesOutput = createHistoricGamesState(
      historicGames,
      historicId,
    );
    if (auth.currentUser) {
      return historicGamesService.updateHistoricGames(historicId as string, historicGames)
        .then(() => {
          dispatch(setHistoricGamesAction(historicGamesOutput));
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
    dispatch(setHistoricGamesAction(historicGamesOutput));
    return {};
  };

  return {
    getHistoric,
    setHistoric,
    setAnonymousHistoric,
    updateHistoric,
    loading,
    error,
  };
}
