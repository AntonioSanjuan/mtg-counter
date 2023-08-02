import { DeckCollectionState } from './models/appDeckCollection.state';

export enum HistoricGamesActions {
  setDeckCollectionAction = '@action/setDeckCollectionAction',
}

export const setDeckCollectionAction = (deckCollection?: DeckCollectionState) => ({
  type: HistoricGamesActions.setDeckCollectionAction,
  payload: deckCollection,
});
