import { act, renderHook } from '@testing-library/react-hooks';
import { Dispatch } from '@reduxjs/toolkit';

import { Provider } from 'react-redux';
import { DocumentData, DocumentSnapshot, QuerySnapshot } from 'firebase/firestore';
import * as hooks from '../state/appStateHook';
import * as userServiceMock from '../../services/firebaseStore/user/user.service.mock';
import * as deckCollectionServiceMock from '../../services/firebaseStore/deckCollection/deckCollection.service.mock';
import { createTestStore } from '../../utils/testsUtils/createTestStore.util';
import { setUserSettingsAction } from '../../state/user/user.actions';
import { FirebaseUserDto, FirebaseUserSettingsDto } from '../../models/dtos/firebaseStore/firebaseUser.model';
import { Language } from '../../models/internal/types/LanguageEnum.model';
import { mockFirebaseAuthUser } from '../../utils/testsUtils/firebaseAuth.util';
import { User } from 'firebase/auth';
import { getNewGame } from '../../utils/factories/gameFactory/gameFactory';
import { useUsers } from './usersHook';
import { FirebaseDeckCollectionDto } from '../../models/dtos/firebaseStore/firebaseDeckCollection.model';

describe('<useUsers />', () => {
  let useUsersStore: any;
  let wrapper: any;

  const useAppDispatchMockResponse = jest.fn((action) => {}) as Dispatch<any>;

  beforeEach(() => {
    useUsersStore = createTestStore();
    wrapper = function ({ children }: { children: any }) {
      return <Provider store={useUsersStore}>{children}</Provider>;
    };

    jest.spyOn(hooks, 'useAppDispatch')
      .mockReturnValue(useAppDispatchMockResponse);

    userServiceMock.initializeMock();
    deckCollectionServiceMock.initializeMock();
  });

  afterEach(() => {
    userServiceMock.reset();
    deckCollectionServiceMock.reset();

    mockFirebaseAuthUser(undefined)
  });

  it('should create', () => {
    const { result } = renderHook(() => useUsers(), { wrapper });

    expect(result.current).toBeDefined();
  });

  it('existsUserWithUserName should request getUserByUsername', async () => {
    const userNameSut = 'userNameTest'
    expect(userServiceMock.getUserByUsernameSpy).not.toHaveBeenCalled();

    const { result } = renderHook(() => useUsers(), { wrapper });

    await act(async () => {
      await result.current.existsUserWithUserName(userNameSut);
    });

    expect(userServiceMock.getUserByUsernameSpy).toHaveBeenCalledWith(userNameSut);
  });

  it('existsUserWithUserName should return true if size is bigger than 0', async () => {
    const userNameSut = 'userNameTest'
    userServiceMock.getUserByUsernameSpy.mockResolvedValue(
      {
        size: 1
      } as QuerySnapshot<DocumentData>,
    );
    const { result } = renderHook(() => useUsers(), { wrapper });

    await act(async () => {
      result.current.existsUserWithUserName(userNameSut).then((resp) => {
        expect(resp).toBeTruthy()
      });
    });
  });

  it('existsUserWithUserName should return false if size is equal to 0', async () => {
    const userNameSut = 'userNameTest'
    userServiceMock.getUserByUsernameSpy.mockResolvedValue(
      {
        size: 0
      } as QuerySnapshot<DocumentData>,
    );
    const { result } = renderHook(() => useUsers(), { wrapper });

    await act(async () => {
      result.current.existsUserWithUserName(userNameSut).then((resp) => {
        expect(resp).toBeFalsy()
      });
    });
  });

  it('getUserByUserNameDecks should request getUserByUsername and for the first result, getDeckCollection', async () => {
    const userNameSut = 'userNameTest'
    const deckCollectionIdSut = 'deckCollectionIdTest'
    expect(userServiceMock.getUserByUsernameSpy).not.toHaveBeenCalled();
    expect(deckCollectionServiceMock.getDeckCollectionSpy).not.toHaveBeenCalled();
    userServiceMock.getUserByUsernameSpy.mockResolvedValue(
      {
        docs: [{
          id:  'asdasd',
          data: () => { return { deckCollection: { 
            id: deckCollectionIdSut,
          }} as Partial<FirebaseUserDto>}
        }]
      } as QuerySnapshot<DocumentData>,
    );
    deckCollectionServiceMock.getDeckCollectionSpy.mockResolvedValue(
      {
        id: deckCollectionIdSut,
        data: () => { return {
            id: deckCollectionIdSut,
            decks: []
          } as Partial<FirebaseDeckCollectionDto>;
        }
      } as DocumentSnapshot<DocumentData>,
    );
    
    const { result } = renderHook(() => useUsers(), { wrapper });

    await act(async () => {
      await result.current.getUserByUserNameDecks(userNameSut)
    });

    expect(userServiceMock.getUserByUsernameSpy).toHaveBeenCalledWith(userNameSut);
    expect(deckCollectionServiceMock.getDeckCollectionSpy).toHaveBeenCalledWith(deckCollectionIdSut);
  });
});
