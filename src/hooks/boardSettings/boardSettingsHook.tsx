import { useState } from 'react';
import { useAppDispatch } from '../state/appStateHook';
import { Board } from '../../models/dtos/firebaseStore/firebaseGameSettings.model';
import { setBoardSettingsAction } from '../../state/game/game.actions';
import { getDefaultPlayers } from '../../utils/playerFactory/playerFactory';

export function useBoardSettings() {
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const updateBoardSettings = async (boardSettings: Board): Promise<any> => {
    setLoading(true);

    setLoading(false);
    setError(false);

    const auxSettings = { ...boardSettings };
    auxSettings.players = getDefaultPlayers(boardSettings);

    dispatch(setBoardSettingsAction(auxSettings));
    return auxSettings;
  };

  return {
    updateBoardSettings,
    loading,
    error,
  };
}
