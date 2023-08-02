import { HistoricGamesActions } from './deckCollection.actions';
import { deckCollectionInitialState } from './models/appDeckCollection.initialState';
import { DeckCollectionState } from './models/appDeckCollection.state';

// eslint-disable-next-line default-param-last
const DeckCollectionReducer = (state: DeckCollectionState = deckCollectionInitialState, action: any) => {
  switch (action.type) {
    case HistoricGamesActions.setDeckCollectionAction:
      return {
        ...action.payload
      };
    default:
      return state;
  }
};

export default DeckCollectionReducer ;
