import { AppRootState } from '../rootState';
import { HistoricGamesState } from './models/appHistoricGames.state';

export const selectHistoricGames = (state: AppRootState): HistoricGamesState => state.historicGames;
