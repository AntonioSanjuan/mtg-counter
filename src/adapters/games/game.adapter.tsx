import { FirebaseGameDto } from '../../models/dtos/firebaseStore/firebaseGame.model';
import { GameState } from '../../state/game/models/appGame.state';

export class GameAdapter {
  static toState(game: FirebaseGameDto, gameId: string|undefined): GameState {
    const output: GameState = {
      ...game,
      id: gameId,
    };
    return output;
  }

  static toDto(game: GameState): FirebaseGameDto {
    const output: FirebaseGameDto = {
      finished: game.finished,
      createdAt: game.createdAt,
      finishAt: game.finishAt,
      board: { ...game.board },
    };
    return output;
  }
}
