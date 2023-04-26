import { FirebaseBoardDto, FirebasePlayerDto } from '../../models/dtos/firebaseStore/firebaseGame.model';
import { AppRootState } from '../rootState';
import { GameState } from './models/appGame.state';

export const selectGame = (state: AppRootState): GameState => state.game;
export const selectGameBoard = (state: AppRootState): FirebaseBoardDto => state.game.board;
export const selectGamePlayers = (state: AppRootState): FirebasePlayerDto[] => state.game.board.players;
