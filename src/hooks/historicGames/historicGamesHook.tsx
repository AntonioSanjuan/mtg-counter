import { useState } from 'react';
import { FirebaseHistoricGamesDto } from '../../models/dtos/firebaseStore/firebaseHistoricGames.model';
import { useAppDispatch } from '../state/appStateHook';
import * as historicGamesService from '../../services/firebaseStore/historicGames/historicGames.service';
import * as gameService from '../../services/firebaseStore/game/game.service';
import { setHistoricGamesAction } from '../../state/historicGames/historicGames.actions';
import { HistoricGamesState } from '../../state/historicGames/models/appHistoricGames.state';
import { auth } from '../../utils/firebase.util';
import { FirebaseGameDto } from '../../models/dtos/firebaseStore/firebaseGame.model';
import { HistoricAdapter } from '../../adapters/historic/historic.adapter';
import { GameState } from '../../state/game/models/appGame.state';
import { GameAdapter } from '../../adapters/games/game.adapter';

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
        const historicGamesData: GameState[] = await Promise.all(historicGames.games.map(async (historicGame) => {
          const data = GameAdapter.toState(await getHistoricGame(historicGame.id), historicGame.id);
          return data;
        }));
        const historicGamesOutput = HistoricAdapter.toState(
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
    const historicGamesOutput = HistoricAdapter.toState(
      [],
      undefined,
    );

    dispatch(setHistoricGamesAction(historicGamesOutput));
    setLoading(false);
    setError(false);
    return {};
  };

  const setHistoric = async (historicGames: HistoricGamesState) : Promise<any> => {
    setLoading(true);

    const historicGamesInput = HistoricAdapter.toDto(historicGames);

    return historicGamesService.setHistoricGames(historicGamesInput).then(async (historic) => {
      const historicGamesOutput = HistoricAdapter.toState(
        historicGames.games,
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
    historicGames: HistoricGamesState,
  ): Promise<any> => {
    setLoading(true);
    if (auth.currentUser) {
      const inputData = HistoricAdapter.toDto(
        historicGames,
      );
      return historicGamesService.updateHistoricGames(historicId as string, inputData)
        .then(() => {
          dispatch(setHistoricGamesAction(historicGames));
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
    dispatch(setHistoricGamesAction(historicGames));
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
