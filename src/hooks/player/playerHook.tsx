import {
  FirebaseCounterDto,
  FirebaseGameDto,
  FirebasePlayerDto,
} from '../../models/dtos/firebaseStore/firebaseGameSettings.model';
import { PlayerColors } from '../../models/internal/types/PlayerColorEnum.model';
import { selectGame } from '../../state/game/game.selectors';
import { GameState } from '../../state/game/models/appGame.state';
import { mapPlayerColor, mapPlayerCounter } from '../../utils/mappers/playersMappers/playersMappers';
import { useGameSettings } from '../gameSettings/gameSettingsHook';
import { useAppSelector } from '../state/appStateHook';

export function usePlayer(player: FirebasePlayerDto) {
  const { updateGameSettings } = useGameSettings();
  const gameSettings = useAppSelector<GameState>(selectGame);

  const updatePlayerColor = async (newPlayerColor: PlayerColors) => {
    const newPlayers = mapPlayerColor(
      gameSettings.board.players,
      player.id,
      newPlayerColor,
    );
    await updatePlayers(newPlayers);
  };

  const updatePlayerCounter = async (currentCounter: FirebaseCounterDto, counterValueModification: number) => {
    const newPlayers = mapPlayerCounter(
      gameSettings.board.players,
      player.id,
      currentCounter,
      counterValueModification,
    );
    await updatePlayers(newPlayers);
  };

  const updatePlayers = async (newPlayers: FirebasePlayerDto[]) => {
    const newGameSettings: FirebaseGameDto = {
      ...gameSettings,
      board: {
        ...gameSettings.board,
        players: newPlayers,
      },
    };
    await updateGameSettings(newGameSettings);
  };
  return {
    updatePlayerCounter,
    updatePlayerColor,
  };
}
