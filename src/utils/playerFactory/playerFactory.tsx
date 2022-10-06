import { Board, Counter, Player } from '../../models/dtos/firebaseStore/firebaseGameSettings.model';
import { Lifes, MaxCommanderDamage, MaxPoisonCounters } from '../../models/internal/types/LifeEnum.model';

const getDefaultPlayerCounters = (initialLifes: Lifes): Counter[] => [
  { type: 'Life', value: initialLifes },
  { type: 'Poison', value: MaxPoisonCounters },
  { type: 'CommanderDamage', value: MaxCommanderDamage },
];

const getDefaultPlayer = (boardSettings: Board): Player => ({
  id: '',
  name: '',
  userId: undefined,
  commanderName: '',
  counters: getDefaultPlayerCounters(boardSettings.initialLifes),
});

export const getDefaultPlayers = (boardSettings: Board): Player[] => {
  const players = new Array(boardSettings.numberOfPlayers);
  players.fill(getDefaultPlayer(boardSettings));
  return players;
};
