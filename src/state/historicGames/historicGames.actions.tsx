import { HistoricGamesState } from './models/appHistoricGames.state';

export enum HistoricGamesActions {
  setHistoricGamesAction = '@action/setHistoricGamesAction',
}

export const setHistoricGamesAction = (gameSettings?: HistoricGamesState) => ({
  type: HistoricGamesActions.setHistoricGamesAction,
  payload: gameSettings,
});
