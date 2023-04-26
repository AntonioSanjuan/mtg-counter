import { FirebaseCounterDto, FirebasePlayerDto } from '../../../models/dtos/firebaseStore/firebaseGame.model';
import { PlayerDetailsModel } from '../../../models/internal/models/playerDetails.model';
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

export const mapPlayerDetails = (
  players: FirebasePlayerDto[],
  playerIdToUpdate: string,
  newPlayerDetails: PlayerDetailsModel,
): FirebasePlayerDto[] => players.map((player) => {
  if (player.id === playerIdToUpdate) {
    const targetPlayer = {
      ...player,
      ...newPlayerDetails,
    };
    return targetPlayer;
  }
  return player;
});
export const mapPlayerCounter = (
  players: FirebasePlayerDto[],
  playerIdToUpdate: string,
  counterToUpdate: FirebaseCounterDto,
  counterToUpdateValueModification: number,
): FirebasePlayerDto[] => players.map((player) => {
  if (player.id === playerIdToUpdate) {
    const targetPlayer = player;
    targetPlayer.counters = targetPlayer.counters.map((counter) => {
      if (counter.type === counterToUpdate.type) {
        const targetCounter = {
          ...counter,
          value: counter.value + counterToUpdateValueModification,
        };
        return targetCounter;
      }
      return counter;
    });
    return targetPlayer;
  }
  return player;
});
