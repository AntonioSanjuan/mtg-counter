import { FirebaseCounterDto, FirebasePlayerDto } from '../../../models/dtos/firebaseStore/firebaseGameSettings.model';
import { PlayerColors } from '../../../models/internal/types/PlayerColorEnum.model';

export const mapPlayerColor = (
  players: FirebasePlayerDto[],
  playerIdToUpdate: string,
  newPlayerColor: PlayerColors,
): FirebasePlayerDto[] => players.map((player) => {
  if (player.id === playerIdToUpdate) {
    const targetPlayer = { ...player };
    targetPlayer.color = newPlayerColor;
    return targetPlayer;
  }
  return player;
});

export const mapPlayerCounter = (
  players: FirebasePlayerDto[],
  playerIdToUpdate: string,
  counterToUpdate: FirebaseCounterDto,
  counterToUpdateValueModification: number,
) => players.map((player) => {
  if (player.id === playerIdToUpdate) {
    const targetPlayer = player;
    targetPlayer.counters = targetPlayer.counters.map((counter) => {
      if (counter.type === counterToUpdate.type) {
        const targetCounter = counter;
        targetCounter.value = counterToUpdate.value + counterToUpdateValueModification;
        return targetCounter;
      }
      return counter;
    });
    return targetPlayer;
  }
  return player;
});