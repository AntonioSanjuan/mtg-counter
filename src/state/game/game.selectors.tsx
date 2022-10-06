import { AppRootState } from '../rootState';

export const selectGame = (state: AppRootState) => state.game;
export const selectGameBoard = (state: AppRootState) => state.game.currentGame.board;
export const selectGamePlayers = (state: AppRootState) => state.game.currentGame.board.players;
