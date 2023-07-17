import { Lifes } from '../../../models/internal/types/LifeEnum.model';
import { NumberOfPlayers } from '../../../models/internal/types/NumberOfPlayerEnum.model';
import { GameState } from '../../../state/game/models/appGame.state';
import { getDefaultPlayerCounters, getDefaultPlayers } from '../playerFactory/playerFactory';

export const getNewGame = (
  initialLifes: Lifes = Lifes.Fourty,
  numberOfPlayers: NumberOfPlayers = NumberOfPlayers.Two,
): GameState => ({
  id: undefined,
  createdAt: new Date(),
  name: undefined,
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
): GameState => ({
  id: gameSettings.id,
  createdAt: new Date(),
  name: undefined,
  finishAt: undefined,
  finished: false,
  board: {
    ...gameSettings.board,
    players: gameSettings.board.players.map((player) => ({
      ...player,
      winner: false,
      counters: getDefaultPlayerCounters(gameSettings.board.initialLifes),
    })),
  },
});

export const getResizedGame = (
  gameSettings: GameState,
  initialLifes: Lifes,
  numberOfPlayers: NumberOfPlayers,
): GameState => ({
  id: gameSettings.id,
  createdAt: new Date(),
  name: undefined,
  finishAt: undefined,
  finished: false,
  board: {
    initialLifes,
    numberOfPlayers,
    players: getDefaultPlayers(initialLifes, numberOfPlayers),
  },
});

export const getFinishedGame = (game: GameState): GameState => ({
  ...game,
  finished: true,
  finishAt: new Date(),
});

export const getNamedGame = (game: GameState, gameName?: string): GameState => ({
  ...game,
  name: gameName,
});
