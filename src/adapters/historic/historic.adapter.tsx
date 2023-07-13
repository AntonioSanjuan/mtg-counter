import { FirebaseHistoricGamesDto } from '../../models/dtos/firebaseStore/firebaseHistoricGames.model';
import { HistoricGamesState } from '../../state/historicGames/models/appHistoricGames.state';

export const createHistoricGamesState = (historic: FirebaseHistoricGamesDto, historicId: string|undefined):
HistoricGamesState => {
  const output: HistoricGamesState = {
    ...historic,
    id: historicId,
  };
  return output;
};
