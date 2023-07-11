import { FirebaseGameDto } from '../../../models/dtos/firebaseStore/firebaseGame.model';
import { Lifes } from '../../../models/internal/types/LifeEnum.model';
import { NumberOfPlayers } from '../../../models/internal/types/NumberOfPlayerEnum.model';
import { GameState } from '../../../state/game/models/appGame.state';
import { getDefaultPlayerCounters, getDefaultPlayers } from '../playerFactory/playerFactory';

export const getNewGame = (
  initialLifes = Lifes.Fourty,
  numberOfPlayers = NumberOfPlayers.Two,
): FirebaseGameDto => ({
  createdAt: new Date(),
  finishAt: undefined,
  finished: false,
  board: {
    initialLifes,
    numberOfPlayers,
    players: getDefaultPlayers(initialLifes, numberOfPlayers),
  },
});

export const getRestartedGame = (
  gameSettings: GameState,
): FirebaseGameDto => ({
  createdAt: new Date(),
  finishAt: undefined,
  finished: false,
  board: {
    ...gameSettings.board,
    players: gameSettings.board.players.map((player) => ({
      ...player,
      counters: getDefaultPlayerCounters(gameSettings.board.initialLifes),
    })),
  },
});
