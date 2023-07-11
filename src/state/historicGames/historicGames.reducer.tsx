import { HistoricGamesActions } from './historicGames.actions';
import { historicGamesInitialState } from './models/appHistoricGames.initialState';
import { HistoricGamesState } from './models/appHistoricGames.state';

// eslint-disable-next-line default-param-last
const historicGamesReducer = (state: HistoricGamesState = historicGamesInitialState, action: any) => {
  switch (action.type) {
    case HistoricGamesActions.setHistoricGamesAction:
      return {
        ...action.payload
      };
    default:
      return state;
  }
};

export default historicGamesReducer ;
