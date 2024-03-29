import { FirebaseCounterDto, FirebasePlayerDto } from '../../../models/dtos/firebaseStore/firebaseGame.model';
import { PlayerDetailsModel } from '../../../models/internal/models/playerDetails.model';
import { PlayerColors } from '../../../models/internal/types/PlayerColorEnum.model';

export const mapPlayerColor = (
  players: FirebasePlayerDto[],
  playerIdToUpdate: string,
  newPlayerColor: PlayerColors,
): FirebasePlayerDto => {
  const playerToUpdate = { ...players.filter((player) => player.id === playerIdToUpdate)[0] };
  return {
    ...playerToUpdate,
    color: newPlayerColor,
  };
};

export const mapPlayerOwner = (
  players: FirebasePlayerDto[],
  playerIdToUpdate: string,
): FirebasePlayerDto[] => players.map((player) => {
  const targetPlayer = { ...player };
  targetPlayer.owner = player.id === playerIdToUpdate;
  return targetPlayer;
});

export const mapPlayerUserId = (
  players: FirebasePlayerDto[],
  playerIdToUpdate: string,
  userName: string,
): FirebasePlayerDto[] => players.map((player) => {
  if (player.id === playerIdToUpdate) {
    return {
      ...player,
      userId: userName,
      name: userName,
    };
  } if (player.userId === userName) {
    return {
      ...player,
      userId: null,
      name: '',
    };
  }

  return player;
});

export const mapPlayerWinner = (
  players: FirebasePlayerDto[],
  playerIdToUpdate: string,
): FirebasePlayerDto[] => players.map((player) => {
  const targetPlayer = { ...player };
  targetPlayer.winner = player.id === playerIdToUpdate;
  return targetPlayer;
});

export const mapPlayerDetails = (
  players: FirebasePlayerDto[],
  playerIdToUpdate: string,
  newPlayerDetails: PlayerDetailsModel,
): FirebasePlayerDto => {
  const playerToUpdate = { ...players.filter((player) => player.id === playerIdToUpdate)[0] };
  return {
    ...playerToUpdate,
    ...newPlayerDetails,
  };
};

export const mapPlayerCounter = (
  players: FirebasePlayerDto[],
  playerIdToUpdate: string,
  counterToUpdate: FirebaseCounterDto,
  counterToUpdateValueModification: number,
): FirebasePlayerDto => {
  const playerToUpdate = { ...players.filter((player) => player.id === playerIdToUpdate)[0] };
  playerToUpdate.counters = playerToUpdate?.counters?.map((counter) => {
    switch (counterToUpdate.type) {
      case 'Life':
      case 'Poison':
        if (counter.type === counterToUpdate.type) {
          const targetCounter = {
            ...counter,
            value: counter.value + counterToUpdateValueModification,
          };
          return targetCounter;
        }
        break;
      case 'CommanderDamage':
        if (counter.type === 'Life') {
          const targetCounter = {
            ...counter,
            value: counter.value + counterToUpdateValueModification,
          };
          return targetCounter;
        }
        if (counter.type === 'CommanderDamage' && counter.targetPlayerId === counterToUpdate.targetPlayerId) {
          const targetCounter = {
            ...counter,
            value: counter.value + counterToUpdateValueModification,
          };
          return targetCounter;
        }
        break;
      default:
        return counter;
    }

    return counter;
  });

  return {
    ...playerToUpdate,
    death: playerToUpdate.counters.some((counter) => counter.value <= 0),
  };
};
