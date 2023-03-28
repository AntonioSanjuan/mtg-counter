import { useState } from 'react';
import { DocumentData, DocumentSnapshot } from 'firebase/firestore';
import { useAppDispatch } from '../state/appStateHook';
import { FirebaseGameDto } from '../../models/dtos/firebaseStore/firebaseGameSettings.model';
import { setGameSettingsAction } from '../../state/game/game.actions';
import { auth } from '../../utils/firebase.util';
import * as gameService from '../../services/firebaseStore/gameSettings/gameSettings.service';
import { getNewGame } from '../../utils/factories/gameFactory/gameFactory';

export function useGameSettings() {
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const getGameSettings = async (gameSettingsId: string): Promise<DocumentSnapshot<DocumentData>> => {
    setLoading(true);
    return gameService.getGameSettings(gameSettingsId)
      .then((gameResp) => {
        const game = gameResp.data() as FirebaseGameDto;
        dispatch(setGameSettingsAction(game));
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
      const gameSettingsOutput = {
        id: game.id,
        ...gameSettings,
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

  const updateGameSettings = async (gameSettings: FirebaseGameDto): Promise<any> => {
    setLoading(true);

    if (auth.currentUser) {
      return gameService.updateGameSettings(gameSettings)
        .then(() => {
          dispatch(setGameSettingsAction(gameSettings));
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
    dispatch(setGameSettingsAction(gameSettings));
    return {};
  };

  const setAnonymousGameSettings = () => {
    dispatch(setGameSettingsAction(getNewGame()));
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
