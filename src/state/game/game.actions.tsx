import { FirebasePlayerDto } from '../../models/dtos/firebaseStore/firebaseGame.model';
import { GameState } from './models/appGame.state';

export enum GameActions {
  setGame = '@action/setGame',
  setGamePlayer = '@action/setGamePlayer',
}

export const setGameAction = (gameSettings: GameState) => ({
  type: GameActions.setGame,
  payload: gameSettings,
});

export const setGamePlayerAction = (gamePlayer: FirebasePlayerDto) => ({
  type: GameActions.setGamePlayer,
  payload: gamePlayer,
});
