import { GameState } from './models/appGame.state';
import { GameActions } from './game.actions';
import { gameInitialState } from './models/appGame.initialState';

// eslint-disable-next-line default-param-last
const gameReducer = (state: GameState = gameInitialState, action: any): GameState => {
  switch (action.type) {
    case GameActions.setGame:
      return {
        ...action.payload
      };
    case GameActions.setGamePlayer:
      return {
        ...state,
        board: {
          ...state.board,
          players: state.board.players.map((player) => {
            return player.id === action.payload.id ? action.payload : player
          })
        }
      };
    default:
      return state;
  }
};

export default gameReducer ;
