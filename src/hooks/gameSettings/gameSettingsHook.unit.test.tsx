import { act, renderHook } from '@testing-library/react-hooks';
import { Dispatch } from '@reduxjs/toolkit';

import { Provider } from 'react-redux';
import * as hooks from '../state/appStateHook';
import { createTestStore } from '../../utils/testsUtils/createTestStore.util';
import { useGameSettings } from './gameSettingsHook';
import * as userSettingsServiceMock from '../../services/firebaseStore/userSettings/userSettings.service.mock';
import * as gameServiceSettingsMock from '../../services/firebaseStore/gameSettings/gameSettings.service.mock';
import { FirebaseUserDto } from '../../models/dtos/firebaseStore/firebaseUserSettings.model';
import { DocumentData, DocumentSnapshot } from 'firebase/firestore';
import { setGameSettingsAction } from '../../state/game/game.actions';
import { FirebaseGameDto } from '../../models/dtos/firebaseStore/firebaseGameSettings.model';
import { mockFirebaseAuthUser } from '../../utils/testsUtils/firebaseAuth.util';
import { User } from 'firebase/auth';
import { getNewGame } from '../../utils/factories/gameFactory/gameFactory';
import { mapGameFinished } from '../../utils/mappers/gameMappers/gameMappers'
describe('<useGameSettings />', () => {
  let useGameSettingsStore: any;
  let wrapper: any;

  const useAppDispatchMockResponse = jest.fn((action) => {}) as Dispatch<any>;

  beforeEach(() => {
    useGameSettingsStore = createTestStore();
    wrapper = function ({ children }: { children: any }) {
      return <Provider store={useGameSettingsStore}>{children}</Provider>;
    };

    jest.spyOn(hooks, 'useAppDispatch')
      .mockReturnValue(useAppDispatchMockResponse);

    userSettingsServiceMock.initializeMock();
    gameServiceSettingsMock.initializeMock();
  });

  afterEach(() => {
    userSettingsServiceMock.reset();
    gameServiceSettingsMock.reset();

  });

  it('should create', () => {
    const { result } = renderHook(() => useGameSettings(), { wrapper });

    expect(result.current).toBeDefined();
  });

  it('getGameSettings should request getUserSettings', async () => {
    expect(userSettingsServiceMock.getUserSettingSpy).not.toHaveBeenCalled();

    const getUserSettingsOutput: Partial<FirebaseUserDto> = 
    {
      game: mapGameFinished(getNewGame())
    }

    userSettingsServiceMock.getUserSettingSpy.mockResolvedValue(
      {
        data: () => getUserSettingsOutput as DocumentData,
      } as DocumentSnapshot,
    );

    const { result } = renderHook(() => useGameSettings(), { wrapper });

    await act(async () => {
      await result.current.getGameSettings();
    });

    expect(useAppDispatchMockResponse).toHaveBeenCalledWith(setGameSettingsAction(getUserSettingsOutput.game as FirebaseGameDto));
    expect(userSettingsServiceMock.getUserSettingSpy).toHaveBeenCalled();
  });

  it('setGameSettings should request setGameSettings', async () => {
    expect(gameServiceSettingsMock.setGameSettingsSpy).not.toHaveBeenCalled();
    const gameSettings = mapGameFinished(getNewGame());

    const { result } = renderHook(() => useGameSettings(), { wrapper });

    await act(async () => {
      await result.current.setGameSettings(gameSettings);
    });

    expect(useAppDispatchMockResponse).toHaveBeenCalledWith(setGameSettingsAction(gameSettings));
    expect(gameServiceSettingsMock.setGameSettingsSpy).toHaveBeenCalledWith(gameSettings);
  });

  it('updateGameSettings should not request updateUserSettings if user is not logged', async () => {
    expect(gameServiceSettingsMock.updateGameSettingsSpy).not.toHaveBeenCalled();
    const gameSettings = mapGameFinished(getNewGame());
    
    const { result } = renderHook(() => useGameSettings(), { wrapper });

    await act(async () => {
      await result.current.updateGameSettings(gameSettings);
    });

    expect(useAppDispatchMockResponse).toHaveBeenCalledWith(setGameSettingsAction(gameSettings));
    expect(gameServiceSettingsMock.updateGameSettingsSpy).not.toHaveBeenCalledWith(gameSettings);
  });
  
  it('updateGameSettings should not request updateUserSettings if user is logged', async () => {
    //auth.currentUser = {}
    mockFirebaseAuthUser({} as User)

    expect(gameServiceSettingsMock.updateGameSettingsSpy).not.toHaveBeenCalled();
    const gameSettings = mapGameFinished(getNewGame());
    
    const { result } = renderHook(() => useGameSettings(), { wrapper });

    await act(async () => {
      await result.current.updateGameSettings(gameSettings);
    });

    expect(useAppDispatchMockResponse).toHaveBeenCalledWith(setGameSettingsAction(gameSettings));
    expect(gameServiceSettingsMock.updateGameSettingsSpy).toHaveBeenCalledWith(gameSettings);
  });
});
