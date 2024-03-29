import { Timestamp } from 'firebase/firestore';
import { CounterTypes } from '../../internal/types/CounterTypes.model';
import { Lifes } from '../../internal/types/LifeEnum.model';
import { NumberOfPlayers } from '../../internal/types/NumberOfPlayerEnum.model';
import { PlayerColors } from '../../internal/types/PlayerColorEnum.model';

export interface FirebaseCounterDto {
  type: CounterTypes
  targetPlayerId?: string
  value: number
}

export interface FirebasePlayerDto {
  id: string;
  name: string;
  userId: string|null;
  owner: boolean;
  winner: boolean;
  deckName: string;
  counters: FirebaseCounterDto[];
  color: PlayerColors;
  death: boolean;
}

export interface FirebaseBoardDto {
  initialLifes: Lifes;
  numberOfPlayers: NumberOfPlayers;
  players: FirebasePlayerDto[]
}

export interface FirebaseGameDto {
    name?: string;
    finished: boolean;
    board: FirebaseBoardDto;
    createdAt: Timestamp;
    finishAt?: Timestamp;
}
