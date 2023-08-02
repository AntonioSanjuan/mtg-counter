import { useState } from 'react';
import { useAppDispatch } from '../state/appStateHook';
import * as deckCollectionService from '../../services/firebaseStore/deckCollection/deckCollection.service';
import { DeckCollectionAdapter } from '../../adapters/deckCollection/deckCollection.adapter';
import { FirebaseDeckCollectionDto } from '../../models/dtos/firebaseStore/firebaseDeckCollection.model';
import { setDeckCollectionAction } from '../../state/deckCollection/deckCollection.actions';
import { DeckCollectionState } from '../../state/deckCollection/models/appDeckCollection.state';

export function useDeckCollection() {
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const getDeckCollection = async (historicId: string) => {
    setLoading(true);

    return deckCollectionService.getDeckCollection(historicId)
      .then(async (deckCollectionResp) => {
        const deckCollectionData = deckCollectionResp.data() as FirebaseDeckCollectionDto;

        const deckCollectionOutput = DeckCollectionAdapter.toState(
          deckCollectionData,
          deckCollectionResp.id,
        );

        dispatch(setDeckCollectionAction(deckCollectionOutput));
        setLoading(false);
        setError(false);
        return deckCollectionResp;
      }).catch((e) => {
        setLoading(false);
        setError(true);
        throw e;
      });
  };

  const setDeckCollection = async (deckCollection: DeckCollectionState) : Promise<any> => {
    setLoading(true);

    const historicGamesInput = DeckCollectionAdapter.toDto(deckCollection);

    return deckCollectionService.setDeckCollection(historicGamesInput).then(async (deckCollectionResp) => {
      const deckCollectionOutput = DeckCollectionAdapter.toState(
        deckCollection,
        deckCollectionResp.id,
      );

      dispatch(setDeckCollectionAction(deckCollectionOutput));
      setLoading(false);
      setError(false);
      return deckCollectionOutput;
    }).catch((e) => {
      setLoading(false);
      setError(true);
      throw e;
    });
  };

  const setAnonymousDeckCollection = () => {
    const historicGamesOutput = DeckCollectionAdapter.toState(
      {
        decks: [],
      },
      undefined,
    );

    dispatch(setDeckCollectionAction(historicGamesOutput));
    setLoading(false);
    setError(false);
  };
  const updateDeckCollection = async (
    deckCollectionId: string | undefined,
    deckCollection: DeckCollectionState,
  ): Promise<any> => {
    setLoading(true);
    const inputData = DeckCollectionAdapter.toDto(
      deckCollection,
    );
    return deckCollectionService.updateDeckCollection(deckCollectionId as string, inputData)
      .then(() => {
        dispatch(setDeckCollectionAction(deckCollection));
        setLoading(false);
        setError(false);
        return deckCollection;
      }).catch((e) => {
        setLoading(false);
        setError(true);
        throw e;
      });
  };

  return {
    getDeckCollection,
    setDeckCollection,
    updateDeckCollection,
    setAnonymousDeckCollection,
    loading,
    error,
  };
}
