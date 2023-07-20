import { Dispatch } from '@reduxjs/toolkit';

import { Provider } from 'react-redux';
import { act, renderHook } from '@testing-library/react-hooks';
import * as hooks from '../state/appStateHook';
import * as playerHooks from '../../hooks/player/playerHook';
import { createTestStore } from '../../utils/testsUtils/createTestStore.util';
import { useCounter } from './counterHook';
import { FirebaseCounterDto, FirebasePlayerDto } from '../../models/dtos/firebaseStore/firebaseGame.model';
import { getDefaultPlayers } from '../../utils/factories/playerFactory/playerFactory';
import { CounterTypes } from '../../models/internal/types/CounterTypes.model';
import * as mock_usePlayer from '../player/playerHook.mock';
import { NumberOfPlayers } from '../../models/internal/types/NumberOfPlayerEnum.model';

describe('<useCounter />', () => {
  let useCounterStore: any;
  let wrapper: any;

  let useCounterplayer: FirebasePlayerDto;
  let useCounterCounters: FirebaseCounterDto;

  const initialLife = 40;
  const targetCounterType: CounterTypes = 'Life'
  const useAppDispatchMockResponse = jest.fn((action) => {}) as Dispatch<any>;

  beforeEach(() => {
    useCounterStore = createTestStore();
    wrapper = function ({ children }: { children: any }) {
      return <Provider store={useCounterStore}>{children}</Provider>;
    };
    useCounterplayer = getDefaultPlayers(initialLife, NumberOfPlayers.Three)[0];
    useCounterCounters = useCounterplayer.counters.filter((counter: FirebaseCounterDto) => counter.type === targetCounterType)[0]
    
    jest.spyOn(hooks, 'useAppDispatch')
      .mockReturnValue(useAppDispatchMockResponse);
    
    jest.spyOn(playerHooks, 'usePlayer')
      .mockImplementation(mock_usePlayer.mock);

    mock_usePlayer.initializeMock()
  });

  it('should create', async () => {
    const { result } = renderHook(() => useCounter(useCounterplayer, useCounterCounters), { wrapper });
    expect(result).toBeDefined();
  });

  it('addCounters should add to temporaryCount value', async () => {
    const { result } = renderHook(() => useCounter(useCounterplayer, useCounterCounters), { wrapper });
    expect(result.current.temporaryCount).toEqual(0);

    await act(async () => {
      await result.current.addCounters();
      await result.current.addCounters();
      await result.current.addCounters();
      await result.current.addCounters();
      await result.current.addCounters();
    });

    expect(result.current.temporaryCount).toEqual(5);
  });

  it('addCounters should request updateCounter and reset temporaryCount after 2 seconds', async () => {
    const { result } = renderHook(() => useCounter(useCounterplayer, useCounterCounters), { wrapper });
    expect(result.current.temporaryCount).toEqual(0);

    await act(async () => {
      await result.current.addCounters();
      await result.current.addCounters();
      await result.current.addCounters();
      await result.current.addCounters();
      await result.current.addCounters();
    });

    expect(result.current.temporaryCount).toEqual(5);

    setTimeout(() => {
      expect(mock_usePlayer.mock().updatePlayerCounter).toHaveBeenCalled()
      expect(result.current.temporaryCount).toEqual(0);
    }, 25000)
  });

  it('removeCounters should remove to temporaryCount value', async () => {
    const { result } = renderHook(() => useCounter(useCounterplayer, useCounterCounters), { wrapper });
    expect(result.current.temporaryCount).toEqual(0);

    await act(async () => {
      await result.current.removeCounters();
      await result.current.removeCounters();
      await result.current.removeCounters();
      await result.current.removeCounters();
      await result.current.removeCounters();
    });

    expect(result.current.temporaryCount).toEqual(-5);
  });

  it('removeCounters should request updateCounter and reset temporaryCount after 2 seconds', async () => {
    const { result } = renderHook(() => useCounter(useCounterplayer, useCounterCounters), { wrapper });
    expect(result.current.temporaryCount).toEqual(0);

    await act(async () => {
      await result.current.removeCounters();
      await result.current.removeCounters();
      await result.current.removeCounters();
      await result.current.removeCounters();
      await result.current.removeCounters();
    });

    expect(result.current.temporaryCount).toEqual(-5);

    setTimeout(() => {
      expect(mock_usePlayer.mock().updatePlayerCounter).toHaveBeenCalled()
      expect(result.current.temporaryCount).toEqual(0);
    }, 25000)
  });

  it('getCounterOpponent should request updateCounter and reset temporaryCount after 2 seconds', async () => {
    const { result } = renderHook(() => useCounter(useCounterplayer, useCounterCounters), { wrapper });
    expect(result.current.temporaryCount).toEqual(0);

    await act(async () => {
      await result.current.removeCounters();
      await result.current.removeCounters();
      await result.current.removeCounters();
      await result.current.removeCounters();
      await result.current.removeCounters();
    });

    expect(result.current.temporaryCount).toEqual(-5);

    setTimeout(() => {
      expect(mock_usePlayer.mock().updatePlayerCounter).toHaveBeenCalled()
      expect(result.current.temporaryCount).toEqual(0);
    }, 25000)
  });

});
