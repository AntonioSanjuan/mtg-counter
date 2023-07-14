import { act, renderHook } from '@testing-library/react-hooks';
import { Dispatch } from '@reduxjs/toolkit';

import { Provider } from 'react-redux';
import * as hooks from '../state/appStateHook';
import { createTestStore } from '../../utils/testsUtils/createTestStore.util';
import { useCurrentGame } from './currentGameHook';
import * as userServiceMock from '../../services/firebaseStore/user/user.service.mock';
import * as gameServiceMock from '../../services/firebaseStore/game/game.service.mock';
import { DocumentData, DocumentSnapshot } from 'firebase/firestore';
import { setGameAction } from '../../state/game/game.actions';
import { mockFirebaseAuthUser } from '../../utils/testsUtils/firebaseAuth.util';
import { User } from 'firebase/auth';
import { getNewGame } from '../../utils/factories/gameFactory/gameFactory';
import { GameState } from '../../state/game/models/appGame.state';
import { GameAdapter } from '../../adapters/games/game.adapter';
import { FirebaseGameDto } from '../../models/dtos/firebaseStore/firebaseGame.model';
describe('<useCurrentGame />', () => {
  let useCurrentGameStore: any;
  let wrapper: any;

  const useAppDispatchMockResponse = jest.fn((action) => {}) as Dispatch<any>;

  beforeEach(() => {
    useCurrentGameStore = createTestStore();
    wrapper = function ({ children }: { children: any }) {
      return <Provider store={useCurrentGameStore}>{children}</Provider>;
    };

    jest.spyOn(hooks, 'useAppDispatch')
      .mockReturnValue(useAppDispatchMockResponse);

    userServiceMock.initializeMock();
    gameServiceMock.initializeMock();
  });

  afterEach(() => {
    userServiceMock.reset();
    gameServiceMock.reset();
    
    mockFirebaseAuthUser(undefined)
  
  });

  it('should create', () => {
    const { result } = renderHook(() => useCurrentGame(), { wrapper });

    expect(result.current).toBeDefined();
  });

  it('getGameSettings should request getUserSettings', async () => {
    const gameSettingsId: string = 'gameSettingsId'
    expect(gameServiceMock.getGameSpy).not.toHaveBeenCalled();

    const gameSut = getNewGame()
    const getGameDataResponseObj: FirebaseGameDto = GameAdapter.toDto(gameSut)

    gameServiceMock.getGameSpy.mockResolvedValue(
      {
        id: gameSettingsId,
        data: () => getGameDataResponseObj as DocumentData,
      } as DocumentSnapshot,
    );

    const gameState: GameState = {
      ...gameSut,
      id: gameSettingsId
    }
    const { result } = renderHook(() => useCurrentGame(), { wrapper });

    await act(async () => {
      await result.current.getGame(gameSettingsId);
    });

    expect(useAppDispatchMockResponse).toHaveBeenCalledWith(setGameAction(gameState));
    expect(gameServiceMock.getGameSpy).toHaveBeenCalled();
  });

  it('setGameSettings should request setGameSettings', async () => {
    const gameSettingsId = 'gameSettingsId'

    expect(gameServiceMock.setGameSpy).not.toHaveBeenCalled();
    const gameSettings = getNewGame();

    const { result } = renderHook(() => useCurrentGame(), { wrapper });

    const gameState: GameState = {
      ...gameSettings,
      id: gameSettingsId
    }

    gameServiceMock.setGameSpy.mockResolvedValue(
      {
        data: () => {},
        id: gameSettingsId
      } as DocumentSnapshot,
    );

    await act(async () => {
      await result.current.setGame(gameSettings);
    });

    expect(useAppDispatchMockResponse).toHaveBeenCalledWith(setGameAction(gameState));
    expect(gameServiceMock.setGameSpy).toHaveBeenCalledWith(GameAdapter.toDto(gameSettings));
  });

  it('updateGameSettings should not request updateUserSettings if user is not logged', async () => {
    expect(gameServiceMock.updateGameSpy).not.toHaveBeenCalled();
    const gameSettings = getNewGame();
    const gameSettingsState: GameState = {
      ...gameSettings,
      id: undefined,
    }
    const { result } = renderHook(() => useCurrentGame(), { wrapper });

    await act(async () => {
      await result.current.updateGame(gameSettingsState.id, gameSettings);
    });


    expect(useAppDispatchMockResponse).toHaveBeenCalledWith(setGameAction(gameSettingsState));
    expect(gameServiceMock.updateGameSpy).not.toHaveBeenCalledWith(gameSettingsState.id, gameSettings);
  });
  
  it('updateGameSettings should not request updateUserSettings if user is logged', async () => {
    mockFirebaseAuthUser({} as User)

    expect(gameServiceMock.updateGameSpy).not.toHaveBeenCalled();
    const gameSettings = getNewGame();
    const gameSettingsState: GameState = {
      ...gameSettings,
      id: "gameSettingsId",
    }

    const { result } = renderHook(() => useCurrentGame(), { wrapper });

    await act(async () => {
      await result.current.updateGame(gameSettingsState.id, gameSettingsState);
    });

    expect(useAppDispatchMockResponse).toHaveBeenCalledWith(setGameAction(gameSettingsState));
    expect(gameServiceMock.updateGameSpy).toHaveBeenCalledWith(gameSettingsState.id, GameAdapter.toDto(gameSettings));
  });
});
