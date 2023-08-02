import { AppRootState } from '../rootState';
import { DeckCollectionState } from './models/appDeckCollection.state';

export const selectDeckCollection = (state: AppRootState): DeckCollectionState => state.deckCollection;
