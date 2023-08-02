import { combineReducers, createStore } from '@reduxjs/toolkit';
import { composeWithDevTools } from 'redux-devtools-extension';
import gameReducer from './game/game.reducer';
import { GameState } from './game/models/appGame.state';
import historicGamesReducer from './historicGames/historicGames.reducer';
import { HistoricGamesState } from './historicGames/models/appHistoricGames.state';
import { layoutReducer } from './layout/layout.reducer';
import { LayoutState } from './layout/models/appLayout.state';
import { UserState } from './user/models/appUser.state';
import { userReducer } from './user/user.reducer';
import DeckCollectionReducer from './deckCollection/deckCollection.reducer';
import { DeckCollectionState } from './deckCollection/models/appDeckCollection.state';

export interface AppRootState {
    user: UserState;
    layout: LayoutState;
    game: GameState;
    historicGames: HistoricGamesState;
    deckCollection: DeckCollectionState;
}

export const combinedReducers = combineReducers({
  user: userReducer,
  layout: layoutReducer,
  game: gameReducer,
  historicGames: historicGamesReducer,
  deckCollection: DeckCollectionReducer,

});

export const store = createStore(
  combinedReducers,
  composeWithDevTools(),
);

// Inferred type: {user: UserState}
export type AppDispatch = typeof store.dispatch
