import { act, renderHook } from '@testing-library/react-hooks';
import { Dispatch } from '@reduxjs/toolkit';

import { Provider } from 'react-redux';
import * as hooks from '../state/appStateHook';
import * as currentGamehooks from '../currentGame/currentGameHook';

import { createTestStore } from '../../utils/testsUtils/createTestStore.util';
import { FirebaseCounterDto, FirebasePlayerDto } from '../../models/dtos/firebaseStore/firebaseGame.model';
import { usePlayer } from './playerHook';
import { getDefaultPlayers } from '../../utils/factories/playerFactory/playerFactory';
import { PlayerColors } from '../../models/internal/types/PlayerColorEnum.model';
import { setGameAction } from '../../state/game/game.actions';
import { mapPlayerColor, mapPlayerCounter, mapPlayerDetails } from '../../utils/mappers/playersMappers/playersMappers';
import { GameState } from '../../state/game/models/appGame.state';
import * as mock_useCurrentGame from '../currentGame/currentGameHook.mock';
import { PlayerDetailsModel } from '../../models/internal/models/playerDetails.model';

describe('<usePlayer />', () => {
  let usePlayerStore: any;
  let wrapper: any;

  let usePlayerplayers: FirebasePlayerDto[];
  let usePlayerInputplayer: FirebasePlayerDto;

  const usePlayerPlayersInitialLifes = 40
  const useAppDispatchMockResponse = jest.fn((action) => {}) as Dispatch<any>;

  beforeEach(() => {
    usePlayerStore = createTestStore();
    wrapper = function ({ children }: { children: any }) {
      return <Provider store={usePlayerStore}>{children}</Provider>;
    };

    usePlayerplayers = getDefaultPlayers(usePlayerPlayersInitialLifes, 2);
    usePlayerInputplayer = usePlayerplayers[0];

    jest.spyOn(hooks, 'useAppDispatch')
      .mockReturnValue(useAppDispatchMockResponse);

    jest.spyOn(currentGamehooks, 'useCurrentGame')
      .mockImplementation(mock_useCurrentGame.mock);

    mock_useCurrentGame.initializeMock();
  });

  it('should create', () => {
    const { result } = renderHook(() => usePlayer(usePlayerInputplayer), { wrapper });

    expect(result.current).toBeDefined();
  });

  it('updatePlayerCounter should request updateGameSettings', async () => {
    expect(mock_useCurrentGame.mock().updateGame).not.toHaveBeenCalled();

    const { result } = renderHook(() => usePlayer(usePlayerInputplayer), { wrapper });

    const playerCounter: FirebaseCounterDto = usePlayerInputplayer.counters.filter((counter: FirebaseCounterDto) => counter.type === 'Life')[0]
    
    await act(async () => {
      await result.current.updatePlayerCounter(playerCounter, 25);
    });
    
    expect(mock_useCurrentGame.mock().updateGame).toHaveBeenCalled();
  });

  it('updatePlayerColor should request updateGameSettings', async () => {
    expect(mock_useCurrentGame.mock().updateGame).not.toHaveBeenCalled();

    const { result } = renderHook(() => usePlayer(usePlayerInputplayer), { wrapper });

    const playerColor: PlayerColors = PlayerColors.black
    
    await act(async () => {
      await result.current.updatePlayerColor(playerColor);
    });
    
    expect(mock_useCurrentGame.mock().updateGame).toHaveBeenCalled();
  });

  it('updatePlayerCounter should request updateGameSettings with the player counter updated', async () => {

    const targetCounterType = 'Life'
    const playerCounter: FirebaseCounterDto = usePlayerInputplayer.counters.filter((counter: FirebaseCounterDto) => counter.type === targetCounterType)[0]
    const createdAtSut = new Date();

    const inputGameSettings: GameState = { 
      id: 'testGameSettingsId',
      finished: false,
      createdAt: createdAtSut,
      finishAt: undefined,
      board: {
        players: usePlayerplayers,
        initialLifes: usePlayerPlayersInitialLifes,
        numberOfPlayers: usePlayerplayers.length
      }
    };

    const outputGameSettings: GameState = {
      ...inputGameSettings,
      board: {
        ...inputGameSettings.board,
        players: mapPlayerCounter(usePlayerplayers, usePlayerInputplayer.id, playerCounter, 25)
      }
    }

    const { result } = renderHook(() => usePlayer(usePlayerInputplayer), { wrapper });

    await act(async () => {
      usePlayerStore.dispatch(setGameAction(inputGameSettings));
    });

    await act(async () => {
      await result.current.updatePlayerCounter(playerCounter, 25);
    });

    expect(mock_useCurrentGame.mock().updateGame).toHaveBeenCalledWith(inputGameSettings.id, outputGameSettings);
  });

  it('updatePlayerColor should request updateGameSettings with the player color updated', async () => {

    const targetColor = PlayerColors.red
    const createdAtSut = new Date();

    const inputGameSettings: GameState = { 
      id: 'testId',
      finished: false,
      createdAt: createdAtSut,
      finishAt: undefined,
      board: {
        players: usePlayerplayers,
        initialLifes: usePlayerPlayersInitialLifes,
        numberOfPlayers: usePlayerplayers.length
      }
    };

    const outputGameSettings: GameState = {
      ...inputGameSettings,
      board: {
        ...inputGameSettings.board,
        players: mapPlayerColor(usePlayerplayers, usePlayerInputplayer.id, targetColor)
      }
    }

    const { result } = renderHook(() => usePlayer(usePlayerInputplayer), { wrapper });

    await act(async () => {
      usePlayerStore.dispatch(setGameAction(inputGameSettings));
    });

    await act(async () => {
      await result.current.updatePlayerColor(targetColor);
    });

    expect(mock_useCurrentGame.mock().updateGame).toHaveBeenCalledWith( inputGameSettings.id, outputGameSettings);
  });

  it('updatePlayerDetails should request updateGameSettings', async () => {
    expect(mock_useCurrentGame.mock().updateGame).not.toHaveBeenCalled();

    const { result } = renderHook(() => usePlayer(usePlayerInputplayer), { wrapper });

    const playerDetails: PlayerDetailsModel = {
      userId: 'testUserId',
      name: 'testName',
      deckName: 'testDeckName'
    }
    
    await act(async () => {
      await result.current.updatePlayerDetails(playerDetails);
    });
    
    expect(mock_useCurrentGame.mock().updateGame).toHaveBeenCalled();
  });

  
  it('updatePlayerColor should request updateGameSettings with the player details updated', async () => {
    const createdAtSut = new Date()
    
    const targetPlayerDetails: PlayerDetailsModel = {
      userId: 'testUserId',
      name: 'testName',
      deckName: 'testDeckName'
    }    

    const inputGameSettings: GameState = { 
      id: 'testId',
      finished: false,
      createdAt: createdAtSut,
      finishAt: undefined,
      board: {
        players: usePlayerplayers,
        initialLifes: usePlayerPlayersInitialLifes,
        numberOfPlayers: usePlayerplayers.length
      }
    };

    const outputGameSettings: GameState = {
      ...inputGameSettings,
      board: {
        ...inputGameSettings.board,
        players: mapPlayerDetails(usePlayerplayers, usePlayerInputplayer.id, targetPlayerDetails)
      }
    }

    const { result } = renderHook(() => usePlayer(usePlayerInputplayer), { wrapper });

    await act(async () => {
      usePlayerStore.dispatch(setGameAction(inputGameSettings));
    });

    await act(async () => {
      await result.current.updatePlayerDetails(targetPlayerDetails);
    });

    expect(mock_useCurrentGame.mock().updateGame).toHaveBeenCalledWith( inputGameSettings.id, outputGameSettings);
  });
});
