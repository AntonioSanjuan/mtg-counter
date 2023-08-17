import { FirebasePlayerDto } from '../../models/dtos/firebaseStore/firebaseGame.model';
import { GameState } from '../game/models/appGame.state';
import { AppRootState } from '../rootState';
import { HistoricGamesState } from './models/appHistoricGames.state';

export const selectHistoricGames = (state: AppRootState): HistoricGamesState => state.historicGames;

export const selectHistoricGamesByDeck = (deckName: string) => (
  state: AppRootState,
): GameState[] => state.historicGames.games.filter((game: GameState) => game.board.players
  .some((player: FirebasePlayerDto) => player.userId === state.user.userName && player.deckName === deckName));

export const selectHistoricGamesWinnedByDeck = (deckName: string) => (
  state: AppRootState,
): GameState[] => state.historicGames.games.filter((game: GameState) => game.board.players
  .some((player: FirebasePlayerDto) => player.userId === state.user.userName
   && player.deckName === deckName
   && player.winner === true));
