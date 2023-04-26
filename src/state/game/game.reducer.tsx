import { GameState } from './models/appGame.state';
import { GameActions } from './game.actions';
import { gameInitialState } from './models/appGame.initialState';

// eslint-disable-next-line default-param-last
const gameReducer = (state: GameState = gameInitialState, action: any) => {
  switch (action.type) {
    case GameActions.setGame:
      return {
        ...action.payload
      };
    default:
      return state;
  }
};

export default gameReducer ;
