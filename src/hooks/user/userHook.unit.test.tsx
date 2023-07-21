import { act, renderHook } from '@testing-library/react-hooks';
import { Dispatch } from '@reduxjs/toolkit';

import { Provider } from 'react-redux';
import { DocumentData, DocumentSnapshot } from 'firebase/firestore';
import { useUser } from './userHook';
import * as hooks from '../state/appStateHook';
import * as userServiceMock from '../../services/firebaseStore/user/user.service.mock';
import { createTestStore } from '../../utils/testsUtils/createTestStore.util';
import { setUserSettingsAction } from '../../state/user/user.actions';
import { FirebaseUserDto, FirebaseUserSettingsDto } from '../../models/dtos/firebaseStore/firebaseUser.model';
import { Language } from '../../models/internal/types/LanguageEnum.model';
import { mockFirebaseAuthUser } from '../../utils/testsUtils/firebaseAuth.util';
import { User } from 'firebase/auth';
import { getNewGame } from '../../utils/factories/gameFactory/gameFactory';

describe('<useUser />', () => {
  let useUserStore: any;
  let wrapper: any;

  const useAppDispatchMockResponse = jest.fn((action) => {}) as Dispatch<any>;

  beforeEach(() => {
    useUserStore = createTestStore();
    wrapper = function ({ children }: { children: any }) {
      return <Provider store={useUserStore}>{children}</Provider>;
    };

    jest.spyOn(hooks, 'useAppDispatch')
      .mockReturnValue(useAppDispatchMockResponse);

    userServiceMock.initializeMock();
  });

  afterEach(() => {
    userServiceMock.reset();
    mockFirebaseAuthUser(undefined)
  });

  it('should create', () => {
    const { result } = renderHook(() => useUser(), { wrapper });

    expect(result.current).toBeDefined();
  });

  it('getUserSettings should request getUserSettings', async () => {
    expect(userServiceMock.getUserSpy).not.toHaveBeenCalled();

    const getUserSettingsOutput: FirebaseUserDto = 
    { 
      userSettings:  { darkMode: true, lang: Language.French }, 
      currentGame: getNewGame(),
      historicGames: []
    }
    userServiceMock.getUserSpy.mockResolvedValue(
      {
        data: () => getUserSettingsOutput as DocumentData,
      } as DocumentSnapshot,
    );
    const { result } = renderHook(() => useUser(), { wrapper });

    await act(async () => {
      await result.current.getUser();
    });

    expect(useAppDispatchMockResponse).toHaveBeenCalledWith(setUserSettingsAction(getUserSettingsOutput.userSettings));
    expect(userServiceMock.getUserSpy).toHaveBeenCalled();
  });

  it('setUserSettings should request setUserSettings', async () => {
    expect(userServiceMock.setUserSpy).not.toHaveBeenCalled();
    const inputSettings = {
      darkMode: true,
      lang: Language.English,
    } as FirebaseUserSettingsDto;

    const { result } = renderHook(() => useUser(), { wrapper });

    await act(async () => {
      await result.current.setUser(inputSettings, 'gameId', 'historicId');
    });

    expect(userServiceMock.setUserSpy).toHaveBeenCalled();
  });

  it('updateUserSettings should not request updateUserSettings if user is not logged', async () => {
    expect(userServiceMock.setUserSpy).not.toHaveBeenCalled();
    const inputSettings = {
      darkMode: true,
      lang: Language.English,
    } as FirebaseUserSettingsDto;

    const { result } = renderHook(() => useUser(), { wrapper });

    await act(async () => {
      await result.current.updateUser(inputSettings);
    });

    expect(useAppDispatchMockResponse).toHaveBeenCalledWith(setUserSettingsAction(inputSettings));
    expect(userServiceMock.updateUserSpy).not.toHaveBeenCalled();
  });

  it('updateUserSettings should request updateUserSettings if user is logged', async () => {
    //auth.currentUser = {}
    mockFirebaseAuthUser({} as User)

    expect(userServiceMock.setUserSpy).not.toHaveBeenCalled();
    const inputSettings = {
      darkMode: true,
      lang: Language.English,
    } as FirebaseUserSettingsDto;

    const { result } = renderHook(() => useUser(), { wrapper });

    await act(async () => {
      await result.current.updateUser(inputSettings);
    });

    expect(useAppDispatchMockResponse).toHaveBeenCalledWith(setUserSettingsAction(inputSettings));
    expect(userServiceMock.updateUserSpy).toHaveBeenCalled();
  });

  it('updateUserCurrentGame should request updateUserCurrentGame if user is logged', async () => {
    //auth.currentUser = {}
    mockFirebaseAuthUser({} as User)

    expect(userServiceMock.updateUserCurrentGameSpy).not.toHaveBeenCalled();

    const inputGameId = 'gameIdTest'

    const { result } = renderHook(() => useUser(), { wrapper });

    await act(async () => {
      await result.current.updateUserCurrentGame(inputGameId);
    });

    expect(userServiceMock.updateUserCurrentGameSpy).toHaveBeenCalledWith(inputGameId);
  });

  it('updateUserCurrentGame should not request updateUserCurrentGame if user is not logged', async () => {
    expect(userServiceMock.updateUserCurrentGameSpy).not.toHaveBeenCalled();

    const inputGameId = 'gameIdTest'

    const { result } = renderHook(() => useUser(), { wrapper });

    await act(async () => {
      await result.current.updateUserCurrentGame(inputGameId);
    });

    expect(userServiceMock.updateUserCurrentGameSpy).not.toHaveBeenCalled();
  });

  it('setAnonymousUser should dispatch new user settings', async () => {
    expect(useAppDispatchMockResponse).not.toHaveBeenCalled();

    const inputSettings = {
      darkMode: true,
      lang: Language.English,
    } as FirebaseUserSettingsDto;

    const { result } = renderHook(() => useUser(), { wrapper });

    act(() => {
      result.current.setAnonymousUser(Language.English, true);
    });

    expect(useAppDispatchMockResponse).toHaveBeenCalledWith(setUserSettingsAction(inputSettings));
  });
});
