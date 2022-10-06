import { CounterTypes } from '../../internal/types/CounterTypes.model';
import { Lifes } from '../../internal/types/LifeEnum.model';
import { NumberOfPlayers } from '../../internal/types/NumberOfPlayerEnum.model';

export interface FirebaseCounterDto {
  type: CounterTypes
  value: number
}

export interface FirebasePlayerDto {
  id: string;
  name: string;
  userId: string|null;
  commanderName: string;
  counters: FirebaseCounterDto[];
}

export interface FirebaseBoardDto {
  initialLifes: Lifes;
  numberOfPlayers: NumberOfPlayers;

  players: FirebasePlayerDto[]
}

export interface FirebaseGameDto {
    finished: boolean;

    board: FirebaseBoardDto;
}
