import { useState } from 'react';
import * as userSettingsService from '../../services/firebaseStore/user/user.service';
import * as deckCollectionService from '../../services/firebaseStore/deckCollection/deckCollection.service';
import { FirebaseUserDto } from '../../models/dtos/firebaseStore/firebaseUser.model';
import { FirebaseDeckCollectionDto } from '../../models/dtos/firebaseStore/firebaseDeckCollection.model';
import { DeckCollectionAdapter } from '../../adapters/deckCollection/deckCollection.adapter';
import { DeckCollectionState } from '../../state/deckCollection/models/appDeckCollection.state';

export function useUsers() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const existsUserWithUserName = async (userName: string): Promise<boolean> => {
    setLoading(true);
    return userSettingsService.getUserByUsername(userName)
      .then((userResp) => {
        setLoading(false);
        setError(false);
        return userResp.size > 0;
      }).catch((e) => {
        setLoading(false);
        setError(true);
        throw e;
      });
  };

  const getUserByUserNameDecks = async (userName: string): Promise<DeckCollectionState> => {
    setLoading(true);
    return userSettingsService.getUserByUsername(userName)
      .then((userResp) => {
        const user = userResp.docs[0].data() as FirebaseUserDto;
        return deckCollectionService.getDeckCollection(user.deckCollection.id)
          .then((deckCollection) => DeckCollectionAdapter.toState(
            deckCollection.data() as FirebaseDeckCollectionDto,
            deckCollection.id,
          ));
      }).catch((e) => {
        setLoading(false);
        setError(true);
        throw e;
      });
  };

  return {
    existsUserWithUserName,
    getUserByUserNameDecks,
    loading,
    error,
  };
}
