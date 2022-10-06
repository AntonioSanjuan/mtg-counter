import { Board } from '../../models/dtos/firebaseStore/firebaseGameSettings.model';

export enum GameActions {
  setBoardSettings = '@action/setBoardSettings',
}

export const setBoardSettingsAction = (boardSettings: Board) => ({
  type: GameActions.setBoardSettings,
  payload: boardSettings,
});
