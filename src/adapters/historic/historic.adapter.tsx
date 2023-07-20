import {
  FirebaseHistoricGameDto,
  FirebaseHistoricGamesDto,
} from '../../models/dtos/firebaseStore/firebaseHistoricGames.model';
import { GameState } from '../../state/game/models/appGame.state';
import { HistoricGamesState } from '../../state/historicGames/models/appHistoricGames.state';

export class HistoricAdapter {
  static toState(historicGames: GameState[], historicId: string|undefined): HistoricGamesState {
    const output: HistoricGamesState = {
      id: historicId,
      games: historicGames,
    };
    return output;
  }

  static toDto(historicGames: HistoricGamesState): FirebaseHistoricGamesDto {
    const output: FirebaseHistoricGamesDto = {
      games: historicGames.games.map((historicGame): FirebaseHistoricGameDto => ({ id: historicGame.id as string })),
    };
    return output;
  }
}
