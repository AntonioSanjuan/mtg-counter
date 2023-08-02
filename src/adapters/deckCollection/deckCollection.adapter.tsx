import { FirebaseDeckCollectionDto } from '../../models/dtos/firebaseStore/firebaseDeckCollection.model';
import { DeckCollectionState } from '../../state/deckCollection/models/appDeckCollection.state';

export class DeckCollectionAdapter {
  static toState(deckCollection: FirebaseDeckCollectionDto, deckCollectionId: string|undefined): DeckCollectionState {
    const output: DeckCollectionState = {
      id: deckCollectionId,
      decks: deckCollection.decks,
    };
    return output;
  }

  static toDto(deckCollection: DeckCollectionState): FirebaseDeckCollectionDto {
    const output: FirebaseDeckCollectionDto = {
      decks: deckCollection.decks,
    };
    return output;
  }
}
