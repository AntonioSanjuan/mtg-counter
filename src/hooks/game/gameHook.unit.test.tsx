import { act, renderHook } from '@testing-library/react-hooks';
import { Dispatch } from '@reduxjs/toolkit';

import { Provider } from 'react-redux';
import * as hooks from '../state/appStateHook';
import { createTestStore } from '../../utils/testsUtils/createTestStore.util';
import { useGame } from './gameHook';
import * as userServiceMock from '../../services/firebaseStore/user/user.service.mock';
import * as gameServiceMock from '../../services/firebaseStore/game/game.service.mock';
import { DocumentData, DocumentSnapshot } from 'firebase/firestore';
import { setGameAction } from '../../state/game/game.actions';
import { FirebaseGameDto } from '../../models/dtos/firebaseStore/firebaseGame.model';
import { mockFirebaseAuthUser } from '../../utils/testsUtils/firebaseAuth.util';
import { User } from 'firebase/auth';
import { getNewGame } from '../../utils/factories/gameFactory/gameFactory';
import { mapGameFinished } from '../../utils/mappers/gameMappers/gameMappers'
import { GameState } from '../../state/game/models/appGame.state';
describe('<useGame />', () => {
  let useGameStore: any;
  let wrapper: any;

  const useAppDispatchMockResponse = jest.fn((action) => {}) as Dispatch<any>;

  beforeEach(() => {
    useGameStore = createTestStore();
    wrapper = function ({ children }: { children: any }) {
      return <Provider store={useGameStore}>{children}</Provider>;
    };

    jest.spyOn(hooks, 'useAppDispatch')
      .mockReturnValue(useAppDispatchMockResponse);

    userServiceMock.initializeMock();
    gameServiceMock.initializeMock();
  });

  afterEach(() => {
    userServiceMock.reset();
    gameServiceMock.reset();

  });

  it('should create', () => {
    const { result } = renderHook(() => useGame(), { wrapper });

    expect(result.current).toBeDefined();
  });

  it('getGameSettings should request getUserSettings', async () => {
    const gameSettingsId: string = 'gameSettingsId'
    expect(gameServiceMock.getGameSettingSpy).not.toHaveBeenCalled();

    const getUserSettingsOutput: FirebaseGameDto = getNewGame()

    gameServiceMock.getGameSettingSpy.mockResolvedValue(
      {
        id: gameSettingsId,
        data: () => getUserSettingsOutput as DocumentData,
      } as DocumentSnapshot,
    );

    const gameState = {
      id: gameSettingsId,
      ...getUserSettingsOutput
    }

    const { result } = renderHook(() => useGame(), { wrapper });

    await act(async () => {
      await result.current.getGame(gameSettingsId);
    });

    expect(useAppDispatchMockResponse).toHaveBeenCalledWith(setGameAction(gameState));
    expect(gameServiceMock.getGameSettingSpy).toHaveBeenCalled();
  });

  it('setGameSettings should request setGameSettings', async () => {
    const gameSettingsId = 'gameSettingsId'

    expect(gameServiceMock.setGameSettingsSpy).not.toHaveBeenCalled();
    const gameSettings = mapGameFinished(getNewGame());

    const { result } = renderHook(() => useGame(), { wrapper });

    const gameState: GameState = {
      id: gameSettingsId,
      ...gameSettings
    }

    gameServiceMock.setGameSettingsSpy.mockResolvedValue(
      {
        data: () => {},
        id: gameSettingsId
      } as DocumentSnapshot,
    );

    await act(async () => {
      await result.current.setGame(gameSettings);
    });

    expect(useAppDispatchMockResponse).toHaveBeenCalledWith(setGameAction(gameState));
    expect(gameServiceMock.setGameSettingsSpy).toHaveBeenCalledWith(gameSettings);
  });

  it('updateGameSettings should not request updateUserSettings if user is not logged', async () => {
    expect(gameServiceMock.updateGameSettingsSpy).not.toHaveBeenCalled();
    const gameSettings = mapGameFinished(getNewGame());
    const gameSettingsState: GameState = {
      id: undefined,
      ...gameSettings
    }
    const { result } = renderHook(() => useGame(), { wrapper });

    await act(async () => {
      await result.current.updateGame(gameSettingsState.id, gameSettings);
    });


    expect(useAppDispatchMockResponse).toHaveBeenCalledWith(setGameAction(gameSettingsState));
    expect(gameServiceMock.updateGameSettingsSpy).not.toHaveBeenCalledWith(gameSettingsState.id, gameSettings);
  });
  
  it('updateGameSettings should not request updateUserSettings if user is logged', async () => {
    //auth.currentUser = {}
    mockFirebaseAuthUser({} as User)

    expect(gameServiceMock.updateGameSettingsSpy).not.toHaveBeenCalled();
    const gameSettings = mapGameFinished(getNewGame());
    const gameSettingsState: GameState = {
      id: "gameSettingsId",
      ...gameSettings
    }
    const { result } = renderHook(() => useGame(), { wrapper });

    await act(async () => {
      await result.current.updateGame(gameSettingsState.id, gameSettings);
    });

    expect(useAppDispatchMockResponse).toHaveBeenCalledWith(setGameAction(gameSettingsState));
    expect(gameServiceMock.updateGameSettingsSpy).toHaveBeenCalledWith(gameSettingsState.id, gameSettings);
  });
});
