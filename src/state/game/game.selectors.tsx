import { AppRootState } from '../rootState';

export const selectGame = (state: AppRootState) => state.game;
export const selectGameBoard = (state: AppRootState) => state.game.board;
export const selectGamePlayers = (state: AppRootState) => state.game.board.players;
