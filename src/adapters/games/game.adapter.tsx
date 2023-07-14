import { Timestamp } from 'firebase/firestore';
import { FirebaseGameDto } from '../../models/dtos/firebaseStore/firebaseGame.model';
import { GameState } from '../../state/game/models/appGame.state';

export class GameAdapter {
  static toState(game: FirebaseGameDto, gameId: string|undefined): GameState {
    const output: GameState = {
      ...game,
      id: gameId,
      finished: game?.finished,
      board: game?.board,
      createdAt: game?.createdAt.toDate(),
      finishAt: game?.finishAt?.toDate(),
    };
    return output;
  }

  static toDto(game: GameState): FirebaseGameDto {
    const output: FirebaseGameDto = {
      finished: game.finished,
      createdAt: Timestamp.fromDate(game.createdAt),
      finishAt: game.finishAt ? Timestamp.fromDate(game.finishAt) : undefined,
      board: { ...game.board },
    };
    return output;
  }
}
