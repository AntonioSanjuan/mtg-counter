import { v4 as uuidv4 } from 'uuid';
import { FirebaseCounterDto, FirebasePlayerDto } from '../../../models/dtos/firebaseStore/firebaseGame.model';
import { Lifes, MaxCommanderDamage, MaxPoisonCounters } from '../../../models/internal/types/LifeEnum.model';
import { NumberOfPlayers } from '../../../models/internal/types/NumberOfPlayerEnum.model';
import { PlayerColors } from '../../../models/internal/types/PlayerColorEnum.model';

export const getDefaultPlayerCounters = (initialLifes: Lifes): FirebaseCounterDto[] => [
  { type: 'Life', value: initialLifes },
  { type: 'Poison', value: MaxPoisonCounters },
  { type: 'CommanderDamage', value: MaxCommanderDamage },
];

const getDefaultPlayer = (
  initialLifes: Lifes,
  firstPlayer: boolean,
): FirebasePlayerDto => ({
  id: uuidv4(),
  name: '',
  userId: null,
  owner: firstPlayer,
  winner: false,
  deckName: '',
  counters: getDefaultPlayerCounters(initialLifes),
  color: PlayerColors.default,
});

export const getDefaultPlayers = (
  initialLifes: Lifes,
  numberOfPlayers: NumberOfPlayers,
): FirebasePlayerDto[] => {
  const players = new Array(numberOfPlayers).fill({}).map((player, index) => getDefaultPlayer(initialLifes, index === 0));
  // players.fill(getDefaultPlayer(
  //   initialLifes,
  // ));
  return players;
};
