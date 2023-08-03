import { GameState } from '../../../state/game/models/appGame.state';
import { mapPlayerUserId } from '../playersMappers/playersMappers';

export const mapGameOwnerPlayerUserName = (game: GameState, userName: string): GameState => {
  const ownerId = game.board.players.find((player) => player.owner === true)?.id;
  const gameSettingsModified: GameState = {
    ...game,
    board: {
      ...game.board,
      players: mapPlayerUserId(game.board.players, ownerId as string, userName),
    },
  };
  return gameSettingsModified;
};
