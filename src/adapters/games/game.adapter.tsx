import { FirebaseGameDto } from '../../models/dtos/firebaseStore/firebaseGame.model';
import { GameState } from '../../state/game/models/appGame.state';

export const createGameState = (game: FirebaseGameDto, gameId: string|undefined): GameState => {
  const output: GameState = {
    ...game,
    id: gameId,
  };
  return output;
};
