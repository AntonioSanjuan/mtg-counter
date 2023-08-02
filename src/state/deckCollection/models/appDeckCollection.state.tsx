import { FirebaseDeckDto } from '../../../models/dtos/firebaseStore/firebaseDeckCollection.model';

export interface DeckCollectionState {
    id: string | undefined;
    decks: FirebaseDeckDto[];
}
