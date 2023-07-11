import { useState } from 'react';
import { FirebaseHistoricGamesDto } from '../../models/dtos/firebaseStore/firebaseHistoricGames.model';
import { useAppDispatch, useAppSelector } from '../state/appStateHook';
import * as historicGamesService from '../../services/firebaseStore/historicGames/historicGames.service';
import { setHistoricGamesAction } from '../../state/historicGames/historicGames.actions';
import { HistoricGamesState } from '../../state/historicGames/models/appHistoricGames.state';
import { auth } from '../../utils/firebase.util';

export function useHistoricGames() {
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const createHistoricGamesState = (historic: FirebaseHistoricGamesDto, historicId: string|undefined):
  HistoricGamesState => {
    const output: HistoricGamesState = {
      ...historic,
      id: historicId,
    };
    return output;
  };

  const getHistoric = async (historicId: string) => {
    setLoading(true);

    return historicGamesService.getHistoricGames(historicId)
      .then((historicResp) => {
        const historicGames = historicResp.data() as FirebaseHistoricGamesDto;

        const historicGamesOutput = createHistoricGamesState(
          historicGames,
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

  const setHistoric = async (historicGames: FirebaseHistoricGamesDto) : Promise<any> => {
    setLoading(true);

    if (auth.currentUser) {
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
    }
    const historicGamesOutput = createHistoricGamesState(
      historicGames,
      undefined,
    );

    dispatch(setHistoricGamesAction(historicGamesOutput));
    setLoading(false);
    setError(false);
    return {};
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
    updateHistoric,
    loading,
    error,
  };
}
