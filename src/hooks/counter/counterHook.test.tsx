import { Dispatch } from '@reduxjs/toolkit';

import { Provider } from 'react-redux';
import { act, renderHook } from '@testing-library/react-hooks';
import * as hooks from '../state/appStateHook';
import { createTestStore } from '../../utils/testsUtils/createTestStore.util';
import { useCounter } from './counterHook';
import { FirebaseCounterDto, FirebasePlayerDto } from '../../models/dtos/firebaseStore/firebaseGameSettings.model';
import { getDefaultPlayers } from '../../utils/playerFactory/playerFactory';

describe('<useCounter />', () => {
  let useCounterStore: any;
  let wrapper: any;

  let useCounterplayer: FirebasePlayerDto;
  let useCounterCounters: FirebaseCounterDto;

  const useAppDispatchMockResponse = jest.fn((action) => {}) as Dispatch<any>;

  beforeEach(() => {
    useCounterStore = createTestStore();
    wrapper = function ({ children }: { children: any }) {
      return <Provider store={useCounterStore}>{children}</Provider>;
    };
    useCounterplayer = getDefaultPlayers(40, 1)[0];
    useCounterCounters = useCounterplayer.counters.filter((counter: FirebaseCounterDto) => counter.type === 'Life')[0]
    jest.spyOn(hooks, 'useAppDispatch')
      .mockReturnValue(useAppDispatchMockResponse);
  });

  it('should create', async () => {
    const { result } = renderHook(() => useCounter(useCounterplayer, useCounterCounters), { wrapper });
    expect(result).toBeDefined();
  });

});
