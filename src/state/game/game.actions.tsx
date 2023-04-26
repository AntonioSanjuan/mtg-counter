import { GameState } from './models/appGame.state';

export enum GameActions {
  setGame = '@action/setGame',
}

export const setGameAction = (gameSettings: GameState) => ({
  type: GameActions.setGame,
  payload: gameSettings,
});
