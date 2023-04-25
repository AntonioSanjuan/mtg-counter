import { Lifes } from '../../../models/internal/types/LifeEnum.model';
import { NumberOfPlayers } from '../../../models/internal/types/NumberOfPlayerEnum.model';
import { GameState } from './appGame.state';

export const gameInitialState: GameState = {
  id: undefined,
  finished: false,
  createdAt: new Date(),
  finishAt: undefined,
  board: {
    initialLifes: Lifes.Fourty,
    numberOfPlayers: NumberOfPlayers.Two,
    players: [],
  },
};
