import { act, renderHook } from '@testing-library/react-hooks';
import { Dispatch } from '@reduxjs/toolkit';

import { Provider } from 'react-redux';
import { DocumentData, DocumentSnapshot } from 'firebase/firestore';
import * as hooks from '../state/appStateHook';
import * as HistoricGamesServiceMock from '../../services/firebaseStore/historicGames/historicGames.service.mock';
import * as GameServiceMock from '../../services/firebaseStore/game/game.service.mock'
import { createTestStore } from '../../utils/testsUtils/createTestStore.util';
import { mockFirebaseAuthUser } from '../../utils/testsUtils/firebaseAuth.util';
import { useHistoricGames } from './historicGamesHook';
import { FirebaseHistoricGamesDto } from '../../models/dtos/firebaseStore/firebaseHistoricGames.model';
import { setHistoricGamesAction } from '../../state/historicGames/historicGames.actions';
import { User } from 'firebase/auth';
import { HistoricGamesState } from '../../state/historicGames/models/appHistoricGames.state';

describe('<useHistoricGames />', () => {
  let useHistoricGamesStore: any;
  let wrapper: any;

  const useAppDispatchMockResponse = jest.fn((action) => {}) as Dispatch<any>;
  const historicId = 'historicId'
  beforeEach(() => {
    useHistoricGamesStore = createTestStore();
    wrapper = function ({ children }: { children: any }) {
      return <Provider store={useHistoricGamesStore}>{children}</Provider>;
    };

    jest.spyOn(hooks, 'useAppDispatch')
      .mockReturnValue(useAppDispatchMockResponse);

    HistoricGamesServiceMock.initializeMock();
    GameServiceMock.initializeMock();
  });

  afterEach(() => {
    HistoricGamesServiceMock.reset();
    GameServiceMock.reset();
    mockFirebaseAuthUser(undefined)
  });

  it('should create', () => {
    const { result } = renderHook(() => useHistoricGames(), { wrapper });

    expect(result.current).toBeDefined();
  });

  it('getHistoricGames should request getHistoricGames', async () => {
    expect(HistoricGamesServiceMock.getHistoricGamesSpy).not.toHaveBeenCalled();

    const getHistoricGamesOutput: FirebaseHistoricGamesDto = 
    { 
      games: []
    }
    HistoricGamesServiceMock.getHistoricGamesSpy.mockResolvedValue(
      {
        id: historicId,
        data: () => getHistoricGamesOutput as DocumentData,
      } as DocumentSnapshot,
    );
    
    const { result } = renderHook(() => useHistoricGames(), { wrapper });

    await act(async () => {
      await result.current.getHistoric('');
    });

    expect(useAppDispatchMockResponse).toHaveBeenCalledWith(setHistoricGamesAction(
      {
        id: historicId,
        games: []
      }
    ));
    expect(HistoricGamesServiceMock.getHistoricGamesSpy).toHaveBeenCalled();
  });

  it('getHistoricGames should request getGame for each returned historicGames ', async () => {
    expect(HistoricGamesServiceMock.getHistoricGamesSpy).not.toHaveBeenCalled();
    const returnedHistoricGames = [{
      id:'historicGame0'
    }, {
      id: 'historicGame1'
    }]

    const getHistoricGamesOutput: FirebaseHistoricGamesDto = 
    { 
      games: returnedHistoricGames
    }

    HistoricGamesServiceMock.getHistoricGamesSpy.mockResolvedValue(
      {
        id: historicId,
        data: () => getHistoricGamesOutput as DocumentData,
      } as DocumentSnapshot,
    );
    const { result } = renderHook(() => useHistoricGames(), { wrapper });

    await act(async () => {
      await result.current.getHistoric('');
    });
    expect(HistoricGamesServiceMock.getHistoricGamesSpy).toHaveBeenCalled();
    expect(GameServiceMock.getGameSpy).toHaveBeenCalledTimes(returnedHistoricGames.length);
  });

  it('setHistoric should request setHistoric', async () => {
    mockFirebaseAuthUser({} as User)
    
    expect(HistoricGamesServiceMock.setHistoricGamesSpy).not.toHaveBeenCalled();
    const inputHistoricGames = {
      games: [{
        id:'historicGame0'
      }, {
        id: 'historicGame1'
      }]
    } as HistoricGamesState;

    const { result } = renderHook(() => useHistoricGames(), { wrapper });

    await act(async () => {
      await result.current.setHistoric(inputHistoricGames);
    });

    expect(HistoricGamesServiceMock.setHistoricGamesSpy).toHaveBeenCalled();
  });

  it('setHistoric should not request getGame', async () => {
    mockFirebaseAuthUser({} as User)
    
    expect(HistoricGamesServiceMock.setHistoricGamesSpy).not.toHaveBeenCalled();
    const inputHistoricGames = {
      games: [{
        id:'historicGame0'
      }, {
        id: 'historicGame1'
      }]
    } as HistoricGamesState;

    const { result } = renderHook(() => useHistoricGames(), { wrapper });

    await act(async () => {
      await result.current.setHistoric(inputHistoricGames);
    });

    expect(HistoricGamesServiceMock.setHistoricGamesSpy).toHaveBeenCalled();
    expect(GameServiceMock.getGameSpy).not.toBeCalled()
  });

  it('updateHistoric should not request updateHistoricGames if user is not logged', async () => {
    expect(HistoricGamesServiceMock.updateHistoricGamesSpy).not.toHaveBeenCalled();
    const historicState = {
      games: [{
        id:'historicGame0'
      }, {
        id: 'historicGame1'
      }]
    } as HistoricGamesState;

    const { result } = renderHook(() => useHistoricGames(), { wrapper });

    await act(async () => {
      await result.current.updateHistoric(historicId, historicState);
    });

    expect(useAppDispatchMockResponse).toHaveBeenCalledWith(setHistoricGamesAction(historicState));
    expect(HistoricGamesServiceMock.updateHistoricGamesSpy).not.toHaveBeenCalled();
  });

  it('updateUserSettings should request updateUserSettings if user is logged', async () => {
    mockFirebaseAuthUser({} as User)

    expect(HistoricGamesServiceMock.updateHistoricGamesSpy).not.toHaveBeenCalled();
    const historicState = {
      games: [{
        id:'historicGame0'
      }, {
        id: 'historicGame1'
      }]
    } as HistoricGamesState;

    const { result } = renderHook(() => useHistoricGames(), { wrapper });

    await act(async () => {
      await result.current.updateHistoric(historicId, historicState);
    });


    expect(useAppDispatchMockResponse).toHaveBeenCalledWith(setHistoricGamesAction(historicState));
    expect(HistoricGamesServiceMock.updateHistoricGamesSpy).toHaveBeenCalled();
  });

  it('setAnonymousHistoric should not request setHistoric', async () => {
    mockFirebaseAuthUser({} as User)
    
    expect(HistoricGamesServiceMock.setHistoricGamesSpy).not.toHaveBeenCalled();

    const { result } = renderHook(() => useHistoricGames(), { wrapper });

    await act(async () => {
      await result.current.setAnonymousHistoric();
    });

    const historicState = {
      id: undefined,
      games: []
    } as HistoricGamesState;
    expect(useAppDispatchMockResponse).toHaveBeenCalledWith(setHistoricGamesAction(historicState));
    expect(HistoricGamesServiceMock.setHistoricGamesSpy).not.toHaveBeenCalled();
  });
});
