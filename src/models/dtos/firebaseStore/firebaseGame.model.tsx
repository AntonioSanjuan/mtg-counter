import { Timestamp } from 'firebase/firestore';
import { CounterTypes } from '../../internal/types/CounterTypes.model';
import { Lifes } from '../../internal/types/LifeEnum.model';
import { NumberOfPlayers } from '../../internal/types/NumberOfPlayerEnum.model';
import { PlayerColors } from '../../internal/types/PlayerColorEnum.model';

export interface FirebaseCounterDto {
  type: CounterTypes
  value: number
}

export interface FirebasePlayerDto {
  id: string;
  name: string;
  userId: string|null;
  deckName: string;
  counters: FirebaseCounterDto[];
  color: PlayerColors;
}

export interface FirebaseBoardDto {
  initialLifes: Lifes;
  numberOfPlayers: NumberOfPlayers;
  players: FirebasePlayerDto[]
}

export interface FirebaseGameDto {
    finished: boolean;
    board: FirebaseBoardDto;
    createdAt: Timestamp;
    finishAt?: Timestamp;
}
