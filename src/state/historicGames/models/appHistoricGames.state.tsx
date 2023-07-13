import { FirebaseHistoricGamesDto } from '../../../models/dtos/firebaseStore/firebaseHistoricGames.model';
import { GameState } from '../../game/models/appGame.state';

export interface HistoricGamesState extends FirebaseHistoricGamesDto {
    id: string | undefined;
}
