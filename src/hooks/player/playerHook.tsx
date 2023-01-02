import {
  FirebaseCounterDto,
  FirebaseGameDto,
  FirebasePlayerDto,
} from '../../models/dtos/firebaseStore/firebaseGameSettings.model';
import { PlayerColors } from '../../models/internal/types/PlayerColorEnum.model';
import { selectGame } from '../../state/game/game.selectors';
import { useGameSettings } from '../gameSettings/gameSettingsHook';
import { useAppSelector } from '../state/appStateHook';

export function usePlayer(player: FirebasePlayerDto) {
  const { updateGameSettings } = useGameSettings();
  const gameSettings = useAppSelector<FirebaseGameDto>(selectGame);

  const updatePlayerColor = async (newPlayerColor: PlayerColors) => {
    const newPlayers = gameSettings.board.players.map((boardPlayer) => {
      if (player.id === boardPlayer.id) {
        const targetPlayer = player;
        targetPlayer.color = newPlayerColor;
        return targetPlayer;
      }
      return boardPlayer;
    });
    await updatePlayers(newPlayers);
  };

  const updatePlayerCounter = async (currentCounter: FirebaseCounterDto, counterValueModification: number) => {
    const newPlayers = gameSettings.board.players.map((boardPlayer) => {
      if (player.id === boardPlayer.id) {
        const targetPlayer = player;
        targetPlayer.counters = targetPlayer.counters.map((counter) => {
          if (counter.type === currentCounter.type) {
            const targetCounter = counter;
            targetCounter.value = currentCounter.value + counterValueModification;
            return targetCounter;
          }
          return counter;
        });
        return targetPlayer;
      }
      return boardPlayer;
    });
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
