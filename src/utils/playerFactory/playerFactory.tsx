import { FirebaseCounterDto, FirebasePlayerDto } from '../../models/dtos/firebaseStore/firebaseGameSettings.model';
import { Lifes, MaxCommanderDamage, MaxPoisonCounters } from '../../models/internal/types/LifeEnum.model';
import { NumberOfPlayers } from '../../models/internal/types/NumberOfPlayerEnum.model';

const getDefaultPlayerCounters = (initialLifes: Lifes): FirebaseCounterDto[] => [
  { type: 'Life', value: initialLifes },
  { type: 'Poison', value: MaxPoisonCounters },
  { type: 'CommanderDamage', value: MaxCommanderDamage },
];

const getDefaultPlayer = (
  initialLifes: Lifes,
): FirebasePlayerDto => ({
  id: '',
  name: '',
  userId: null,
  commanderName: '',
  counters: getDefaultPlayerCounters(initialLifes),
});

export const getDefaultPlayers = (
  initialLifes: Lifes,
  numberOfPlayers: NumberOfPlayers,
): FirebasePlayerDto[] => {
  const players = new Array(numberOfPlayers);
  players.fill(getDefaultPlayer(
    initialLifes,
  ));
  return players;
};
