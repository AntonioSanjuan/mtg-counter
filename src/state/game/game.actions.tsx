import { FirebaseGameDto } from '../../models/dtos/firebaseStore/firebaseGameSettings.model';

export enum GameActions {
  setGameSettings = '@action/setGameSettings',
}

export const setGameSettingsAction = (gameSettings: FirebaseGameDto) => ({
  type: GameActions.setGameSettings,
  payload: gameSettings,
});
