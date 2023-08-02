import { act, renderHook } from '@testing-library/react-hooks';
import { Dispatch } from '@reduxjs/toolkit';

import { Provider } from 'react-redux';
import { DocumentData, DocumentSnapshot } from 'firebase/firestore';
import * as hooks from '../state/appStateHook';
import * as DeckCollectionServiceMock from '../../services/firebaseStore/deckCollection/deckCollection.service.mock';
import { createTestStore } from '../../utils/testsUtils/createTestStore.util';
import { mockFirebaseAuthUser } from '../../utils/testsUtils/firebaseAuth.util';
import { useDeckCollection } from './deckCollectionHook';
import { FirebaseHistoricGamesDto } from '../../models/dtos/firebaseStore/firebaseHistoricGames.model';
import { setHistoricGamesAction } from '../../state/historicGames/historicGames.actions';
import { User } from 'firebase/auth';
import { HistoricGamesState } from '../../state/historicGames/models/appHistoricGames.state';
import { FirebaseDeckCollectionDto } from '../../models/dtos/firebaseStore/firebaseDeckCollection.model';
import { setDeckCollectionAction } from '../../state/deckCollection/deckCollection.actions';
import { DeckCollectionState } from '../../state/deckCollection/models/appDeckCollection.state';

describe('<usedeckCollection />', () => {
  let usedeckCollectionStore: any;
  let wrapper: any;

  const useAppDispatchMockResponse = jest.fn((action) => {}) as Dispatch<any>;
  const deckCollectionId = 'deckCollectionId'
  beforeEach(() => {
    usedeckCollectionStore = createTestStore();
    wrapper = function ({ children }: { children: any }) {
      return <Provider store={usedeckCollectionStore}>{children}</Provider>;
    };

    jest.spyOn(hooks, 'useAppDispatch')
      .mockReturnValue(useAppDispatchMockResponse);

    DeckCollectionServiceMock.initializeMock();
  });

  afterEach(() => {
    DeckCollectionServiceMock.reset();
  });

  it('should create', () => {
    const { result } = renderHook(() => useDeckCollection(), { wrapper });

    expect(result.current).toBeDefined();
  });

  it('getHistoricGames should request getHistoricGames', async () => {
    expect(DeckCollectionServiceMock.getDeckCollectionSpy).not.toHaveBeenCalled();

    const getHistoricGamesOutput: FirebaseDeckCollectionDto = 
    { 
      decks: []
    }
    DeckCollectionServiceMock.getDeckCollectionSpy.mockResolvedValue(
      {
        id: deckCollectionId,
        data: () => getHistoricGamesOutput as DocumentData,
      } as DocumentSnapshot,
    );
    
    const { result } = renderHook(() => useDeckCollection(), { wrapper });

    await act(async () => {
      await result.current.getDeckCollection('');
    });

    expect(useAppDispatchMockResponse).toHaveBeenCalledWith(setDeckCollectionAction(
      {
        id: deckCollectionId,
        decks: []
      }
    ));
    expect(DeckCollectionServiceMock.getDeckCollectionSpy).toHaveBeenCalled();
  });

  it('setHistoric should request setHistoric', async () => {
    mockFirebaseAuthUser({} as User)
    
    expect(DeckCollectionServiceMock.setDeckCollectionSpy).not.toHaveBeenCalled();
    const inputCollectionDecks = {
      id: deckCollectionId,
      decks: [
        {
          name: 'nameTest0',
          commanderName: 'commanderNameTest0'
        },
        {
          name: 'nameTest1',
          commanderName: 'commanderNameTest1'
        }
      ]
    } as DeckCollectionState;

    const { result } = renderHook(() => useDeckCollection(), { wrapper });

    await act(async () => {
      await result.current.setDeckCollection(inputCollectionDecks);
    });

    expect(DeckCollectionServiceMock.setDeckCollectionSpy).toHaveBeenCalled();
  });


  it('updateUserSettings should request updateUserSettings', async () => {
    mockFirebaseAuthUser({} as User)

    expect(DeckCollectionServiceMock.updateDeckCollectionSpy).not.toHaveBeenCalled();
    const inputCollectionDecks = {
      id: deckCollectionId,
      decks: [
        {
          name: 'nameTest0',
          commanderName: 'commanderNameTest0'
        },
        {
          name: 'nameTest1',
          commanderName: 'commanderNameTest1'
        }
      ]
    } as DeckCollectionState;

    const { result } = renderHook(() => useDeckCollection(), { wrapper });

    await act(async () => {
      await result.current.updateDeckCollection(deckCollectionId, inputCollectionDecks);
    });


    expect(useAppDispatchMockResponse).toHaveBeenCalledWith(setDeckCollectionAction(inputCollectionDecks));
    expect(DeckCollectionServiceMock.updateDeckCollectionSpy).toHaveBeenCalled();
  });

  it('setAnonymousHistoric should not request setDeckCollection', async () => {
    mockFirebaseAuthUser({} as User)
    
    expect(DeckCollectionServiceMock.setDeckCollectionSpy).not.toHaveBeenCalled();

    const { result } = renderHook(() => useDeckCollection(), { wrapper });

    await act(async () => {
      await result.current.setAnonymousDeckCollection();
    });

    const deckCollectionState = {
      id: undefined,
      decks: []
    } as DeckCollectionState;
    
    expect(useAppDispatchMockResponse).toHaveBeenCalledWith(setDeckCollectionAction(deckCollectionState));
    expect(DeckCollectionServiceMock.setDeckCollectionSpy).not.toHaveBeenCalled();
  });
});
