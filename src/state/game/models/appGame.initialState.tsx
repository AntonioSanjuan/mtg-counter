import { Lifes } from '../../../models/internal/types/LifeEnum.model';
import { NumberOfPlayers } from '../../../models/internal/types/NumberOfPlayerEnum.model';
import { GameState } from './appGame.state';

export const gameInitialState: GameState = {
  finished: false,
  board: {
    initialLifes: Lifes.Fourty,
    numberOfPlayers: NumberOfPlayers.Two,
    players: [],
  },
};
