import { renderHook } from '@testing-library/react-hooks';
import { Dispatch } from '@reduxjs/toolkit';

import { Provider } from 'react-redux';
import * as dispatchHook from '../state/appStateHook';
import { createTestStore } from '../../utils/testsUtils/createTestStore.util';
import { mockFirebaseAuthUser } from '../../utils/testsUtils/firebaseAuth.util';
import * as mock_useCurrentGame from '../currentGame/currentGameHook.mock';
import * as useCurrentGame from '../currentGame/currentGameHook';
import * as mock_useUser from '../user/userHook.mock';
import * as useUser from '../user/userHook';
import * as mock_useHistoricGames from '../historicGames/historicGamesHook.mock';
import * as useHistoricGames from '../historicGames/historicGamesHook';

import { useGameManagement } from './gameManagementHook';
import { act } from 'react-dom/test-utils';
import { setGameAction } from '../../state/game/game.actions';
import { GameState } from '../../state/game/models/appGame.state';
import { FirebaseCounterDto, FirebasePlayerDto } from '../../models/dtos/firebaseStore/firebaseGame.model';
import { getDefaultPlayers } from '../../utils/factories/playerFactory/playerFactory';
import { User } from 'firebase/auth';
import { mapPlayerCounter } from '../../utils/mappers/playersMappers/playersMappers';
import { setHistoricGamesAction } from '../../state/historicGames/historicGames.actions';
import { HistoricGamesState } from '../../state/historicGames/models/appHistoricGames.state';
import { getFinishedGame } from '../../utils/factories/gameFactory/gameFactory';
describe('<useGameManagement />', () => {
  const usePlayerPlayersInitialLifes = 40

  let useGameManagementStore: any;
  let wrapper: any;

  const createdAtSut = new Date();
  let useGameManagementplayers = getDefaultPlayers(
    usePlayerPlayersInitialLifes, 
    2
  );
  const playerCounter: FirebaseCounterDto = useGameManagementplayers[0].counters.filter((counter: FirebaseCounterDto) => counter.type === 'Life')[0]
  useGameManagementplayers = mapPlayerCounter(useGameManagementplayers, useGameManagementplayers[0].id,
    playerCounter, 5)
    
  const inputGameSettings: GameState = { 
    id: 'testId',
    finished: false,
    createdAt: createdAtSut,
    finishAt: undefined,
    board: {
      players: useGameManagementplayers,
      initialLifes: usePlayerPlayersInitialLifes,
      numberOfPlayers: useGameManagementplayers.length
    }
  };

  beforeEach(async () => {
    useGameManagementStore = createTestStore();
    wrapper = function ({ children }: { children: any }) {
      return <Provider store={useGameManagementStore}>{children}</Provider>;
    };
    jest.useFakeTimers('modern');
    jest.setSystemTime(createdAtSut);


    jest.spyOn(useCurrentGame, 'useCurrentGame')
      .mockImplementation(mock_useCurrentGame.mock);
    jest.spyOn(useUser, 'useUser')
      .mockImplementation(mock_useUser.mock);
    jest.spyOn(useHistoricGames, 'useHistoricGames')
      .mockImplementation(mock_useHistoricGames.mock);




    await act(async () => {
      useGameManagementStore.dispatch(setGameAction(inputGameSettings));
    });
    
    mock_useUser.initializeMock()
    mock_useHistoricGames.initializeMock()
    mock_useCurrentGame.initializeMock()
  });

  afterEach(() => {
    jest.useRealTimers();
    mockFirebaseAuthUser(undefined)
  })

  it('should create', () => {
    const { result } = renderHook(() => useGameManagement(), { wrapper });

    expect(result.current).toBeDefined();
  });

  it('not logged user should should update the current game', async () => {
    const { result } = renderHook(() => useGameManagement(), { wrapper });
    
    await result.current.startNewGame()
    
    expect(mock_useCurrentGame.mock().updateGame).toHaveBeenCalled()
  });

  it('logged user startNewGame should create new game and update user currentGame', async () => {
    mockFirebaseAuthUser({} as User)

    const { result } = renderHook(() => useGameManagement(), { wrapper });
    
    await result.current.startNewGame()
  
    expect(mock_useCurrentGame.mock().setGame).toHaveBeenCalled()
    expect(mock_useUser.mock().updateUserCurrentGame).toHaveBeenCalled()
  });

  it('restartGame should request updateGame', async () => {
    const { result } = renderHook(() => useGameManagement(), { wrapper });
    
    await result.current.restartGame()
  
    expect(mock_useCurrentGame.mock().updateGame).toHaveBeenCalled()
  });

  it('resizeGame should request updateGame', async () => {
    const { result } = renderHook(() => useGameManagement(), { wrapper });
    
    await result.current.resizeGame(40,4)
  
    expect(mock_useCurrentGame.mock().updateGame).toHaveBeenCalled()
  });

  it('saveAndRestartGame without previous historicGames should set currentGame as historic games', async () => {
    const historicGamesState = {
      id: 'historicGamesId',
      games: []
    }
    await act(async () => {
      useGameManagementStore.dispatch(setHistoricGamesAction(historicGamesState));
    });

    const { result } = renderHook(() => useGameManagement(), { wrapper });
    
    const newGamesSut = [ getFinishedGame(inputGameSettings)]
    await result.current.saveAndRestartGame()
  
    expect(mock_useHistoricGames.mock().updateHistoric).toHaveBeenCalledWith('historicGamesId', {...historicGamesState, 
      games: newGamesSut
    })
  });
  

  it('saveAndRestartGame with previous historicGames should set currentGame as historic games', async () => {
    const historicGamesState: HistoricGamesState = {
      id: 'historicGamesId',
      games: [
        {
          id: 'HGameId'
        } as  GameState
      ]
  }

    await act(async () => {
      useGameManagementStore.dispatch(setHistoricGamesAction(historicGamesState));
    });

    const { result } = renderHook(() => useGameManagement(), { wrapper });
    
    const newGamesSut = [...historicGamesState.games,  getFinishedGame(inputGameSettings)]
    await result.current.saveAndRestartGame()
   
    expect(mock_useHistoricGames.mock().updateHistoric).toHaveBeenCalledWith('historicGamesId', {...historicGamesState, 
      games: newGamesSut
    })
  });

  it('saveAndRestartGame should request updateGame first of all, with finished currenGame', async () => {
    mockFirebaseAuthUser({} as User)

    const historicGamesState: HistoricGamesState = {
      id: 'historicGamesId',
      games: [
        {
          id: 'HGameId'
        } as  GameState
      ]
  }

    await act(async () => {
      useGameManagementStore.dispatch(setHistoricGamesAction(historicGamesState));
    });

    const { result } = renderHook(() => useGameManagement(), { wrapper });
    
    await result.current.saveAndRestartGame()
   
    expect(mock_useCurrentGame.mock().updateGame).toHaveBeenCalledWith(inputGameSettings.id, getFinishedGame(inputGameSettings))
  });
});
