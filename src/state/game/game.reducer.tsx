import { GameState } from './models/appGame.state';
import { GameActions } from './game.actions';
import { gameInitialState } from './models/appGame.initialState';

// eslint-disable-next-line default-param-last
const gameReducer = (state: GameState = gameInitialState, action: any) => {
  console.log("payload", action.payload)
  switch (action.type) {
    case GameActions.setGameSettings:
      return {
        ...state,
        board: action.payload.board
      };
    default:
      return state;
  }
};

export default gameReducer ;
