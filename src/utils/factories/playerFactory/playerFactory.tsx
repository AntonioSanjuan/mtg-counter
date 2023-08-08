import { v4 as uuidv4 } from 'uuid';
import { FirebaseCounterDto, FirebasePlayerDto } from '../../../models/dtos/firebaseStore/firebaseGame.model';
import { Lifes, MaxCommanderDamage, MaxPoisonCounters } from '../../../models/internal/types/LifeEnum.model';
import { NumberOfPlayers } from '../../../models/internal/types/NumberOfPlayerEnum.model';
import { PlayerColors } from '../../../models/internal/types/PlayerColorEnum.model';

const getDefaultPlayerCounters = (initialLifes: Lifes, opponentsId: string[]): FirebaseCounterDto[] => [
  { type: 'Life', value: initialLifes },
  { type: 'Poison', value: MaxPoisonCounters },
  ...opponentsId.map((opponentId) => getDefaultOpponentCommanderCounter(opponentId)),
];

export const getRestartedPlayerCounters = (
  currentPlayerCounters:FirebaseCounterDto[],
  initialLifes: Lifes,
): FirebaseCounterDto[] => currentPlayerCounters.map((currentPlayerCounter) => {
  switch (currentPlayerCounter.type) {
    case 'Life':
      return {
        ...currentPlayerCounter,
        value: initialLifes,
      };
    case 'Poison':
      return {
        ...currentPlayerCounter,
        value: MaxPoisonCounters,
      };
    case 'CommanderDamage':
      return {
        ...currentPlayerCounter,
        value: MaxCommanderDamage,
      };
    default:
      return currentPlayerCounter;
  }
});

const getDefaultOpponentCommanderCounter = (opponentId: string): FirebaseCounterDto => ({
  targetPlayerId: opponentId,
  type: 'CommanderDamage',
  value: MaxCommanderDamage,
} as FirebaseCounterDto);

const getDefaultPlayer = (
  playerId: string,
  initialLifes: Lifes,
  opponentsId: string[],
  ownerPlayer: boolean,
  ownerUserName?: string,
): FirebasePlayerDto => ({
  id: playerId,
  name: ownerPlayer && ownerUserName ? ownerUserName as string : '',
  userId: ownerPlayer && ownerUserName ? ownerUserName as string : null,
  owner: ownerPlayer,
  winner: false,
  death: false,
  deckName: '',
  counters: getDefaultPlayerCounters(initialLifes, opponentsId),
  color: PlayerColors.default,
});

export const getDefaultPlayers = (
  initialLifes: Lifes,
  numberOfPlayers: NumberOfPlayers,
  ownerUserName?: string,
): FirebasePlayerDto[] => {
  const defaultPlayersId = new Array(numberOfPlayers).fill({}).map(() => uuidv4());
  const defaultPlayers = defaultPlayersId
    .map((targetPlayerId: string, index: number) => {
      const opponentsId = defaultPlayersId.filter((defaultPlayer) => targetPlayerId !== defaultPlayer);
      return getDefaultPlayer(
        targetPlayerId,
        initialLifes,
        opponentsId,
        index === 0,
        ownerUserName,
      );
    });

  return defaultPlayers;
};
