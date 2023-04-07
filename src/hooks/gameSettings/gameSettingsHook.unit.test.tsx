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
import { GameState } from '../../state/game/models/appGame.state';
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
    const gameSettingsId: string = 'gameSettingsId'
    expect(gameServiceSettingsMock.getGameSettingSpy).not.toHaveBeenCalled();

    const getUserSettingsOutput: FirebaseGameDto = getNewGame()

    gameServiceSettingsMock.getGameSettingSpy.mockResolvedValue(
      {
        id: gameSettingsId,
        data: () => getUserSettingsOutput as DocumentData,
      } as DocumentSnapshot,
    );

    const gameState = {
      id: gameSettingsId,
      ...getUserSettingsOutput
    }

    const { result } = renderHook(() => useGameSettings(), { wrapper });

    await act(async () => {
      await result.current.getGameSettings(gameSettingsId);
    });

    expect(useAppDispatchMockResponse).toHaveBeenCalledWith(setGameSettingsAction(gameState));
    expect(gameServiceSettingsMock.getGameSettingSpy).toHaveBeenCalled();
  });

  it('setGameSettings should request setGameSettings', async () => {
    const gameSettingsId = 'gameSettingsId'

    expect(gameServiceSettingsMock.setGameSettingsSpy).not.toHaveBeenCalled();
    const gameSettings = mapGameFinished(getNewGame());

    const { result } = renderHook(() => useGameSettings(), { wrapper });

    const gameState: GameState = {
      id: gameSettingsId,
      ...gameSettings
    }

    gameServiceSettingsMock.setGameSettingsSpy.mockResolvedValue(
      {
        data: () => {},
        id: gameSettingsId
      } as DocumentSnapshot,
    );

    await act(async () => {
      await result.current.setGameSettings(gameSettings);
    });

    expect(useAppDispatchMockResponse).toHaveBeenCalledWith(setGameSettingsAction(gameState));
    expect(gameServiceSettingsMock.setGameSettingsSpy).toHaveBeenCalledWith(gameSettings);
  });

  it('updateGameSettings should not request updateUserSettings if user is not logged', async () => {
    expect(gameServiceSettingsMock.updateGameSettingsSpy).not.toHaveBeenCalled();
    const gameSettings = mapGameFinished(getNewGame());
    const gameSettingsState: GameState = {
      id: undefined,
      ...gameSettings
    }
    const { result } = renderHook(() => useGameSettings(), { wrapper });

    await act(async () => {
      await result.current.updateGameSettings(gameSettingsState.id, gameSettings);
    });


    expect(useAppDispatchMockResponse).toHaveBeenCalledWith(setGameSettingsAction(gameSettingsState));
    expect(gameServiceSettingsMock.updateGameSettingsSpy).not.toHaveBeenCalledWith(gameSettingsState.id, gameSettings);
  });
  
  it('updateGameSettings should not request updateUserSettings if user is logged', async () => {
    //auth.currentUser = {}
    mockFirebaseAuthUser({} as User)

    expect(gameServiceSettingsMock.updateGameSettingsSpy).not.toHaveBeenCalled();
    const gameSettings = mapGameFinished(getNewGame());
    const gameSettingsState: GameState = {
      id: "gameSettingsId",
      ...gameSettings
    }
    const { result } = renderHook(() => useGameSettings(), { wrapper });

    await act(async () => {
      await result.current.updateGameSettings(gameSettingsState.id, gameSettings);
    });

    expect(useAppDispatchMockResponse).toHaveBeenCalledWith(setGameSettingsAction(gameSettingsState));
    expect(gameServiceSettingsMock.updateGameSettingsSpy).toHaveBeenCalledWith(gameSettingsState.id, gameSettings);
  });
});
