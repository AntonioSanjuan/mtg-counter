import { useState } from 'react';
import { DocumentData, DocumentSnapshot } from 'firebase/firestore';
import { useAppDispatch } from '../state/appStateHook';
import { FirebaseGameDto } from '../../models/dtos/firebaseStore/firebaseGameSettings.model';
import { setGameSettingsAction } from '../../state/game/game.actions';
import { getDefaultPlayers } from '../../utils/playerFactory/playerFactory';
import { auth } from '../../utils/firebase.util';
import * as userSettingsService from '../../services/firebaseStore/userSettings/userSettings.service';
import * as gameService from '../../services/firebaseStore/gameSettings/gameSettings.service';
import { FirebaseUserDto } from '../../models/dtos/firebaseStore/firebaseUserSettings.model';
import { Lifes } from '../../models/internal/types/LifeEnum.model';
import { NumberOfPlayers } from '../../models/internal/types/NumberOfPlayerEnum.model';

export function useGameSettings() {
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const getGameSettings = async (): Promise<DocumentSnapshot<DocumentData>> => {
    setLoading(true);
    return userSettingsService.getUserSettings()
      .then((userResp) => {
        const user = userResp.data() as FirebaseUserDto;
        dispatch(setGameSettingsAction(user.game));
        setLoading(false);
        setError(false);
        return userResp;
      }).catch((e) => {
        setLoading(false);
        setError(true);
        throw e;
      });
  };

  const setGameSettings = async (gameSettings: FirebaseGameDto): Promise<any> => {
    setLoading(true);
    return gameService.setGameSettings(gameSettings).then(() => {
      dispatch(setGameSettingsAction(gameSettings));
      setLoading(false);
      setError(false);
      return gameSettings;
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
    dispatch(setGameSettingsAction({
      finished: false,
      board: {
        initialLifes: Lifes.Fourty,
        numberOfPlayers: NumberOfPlayers.Two,
        players: getDefaultPlayers(Lifes.Fourty, NumberOfPlayers.Two),
      },
    }));
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
