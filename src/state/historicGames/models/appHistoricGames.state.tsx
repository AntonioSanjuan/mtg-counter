import { FirebaseHistoricGamesDto } from '../../../models/dtos/firebaseStore/firebaseHistoricGames.model';

export interface HistoricGamesState extends FirebaseHistoricGamesDto {
    id: string | undefined;
}
