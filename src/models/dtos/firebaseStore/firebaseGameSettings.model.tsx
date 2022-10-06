import { CounterTypes } from '../../internal/types/CounterTypes.model';
import { Lifes } from '../../internal/types/LifeEnum.model';
import { NumberOfPlayers } from '../../internal/types/NumberOfPlayerEnum.model';

export interface Counter {
  type: CounterTypes
  value: number
}

export interface Player {
  id: string;
  name: string;
  userId?: string;
  commanderName: string;
  counters: Counter[];
}

export interface Board {
  initialLifes: Lifes;
  numberOfPlayers: NumberOfPlayers;

  players: Player[]
}

export interface Game {
    finished: boolean;

    board: Board;
}
