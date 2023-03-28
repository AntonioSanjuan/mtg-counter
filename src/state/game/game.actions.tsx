import { FirebaseGameDto } from '../../models/dtos/firebaseStore/firebaseGameSettings.model';
import { GameState } from './models/appGame.state';

export enum GameActions {
  setGameSettings = '@action/setGameSettings',
}

export const setGameSettingsAction = (gameSettings: GameState) => ({
  type: GameActions.setGameSettings,
  payload: gameSettings,
});
