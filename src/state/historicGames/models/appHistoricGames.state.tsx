import { GameState } from '../../game/models/appGame.state';

export interface HistoricGamesState {
    id: string | undefined;
    games: GameState[]
}
