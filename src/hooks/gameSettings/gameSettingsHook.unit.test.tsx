import { act, renderHook } from '@testing-library/react-hooks';
import { Dispatch } from '@reduxjs/toolkit';

import { Provider } from 'react-redux';
import * as hooks from '../state/appStateHook';
import { createTestStore } from '../../utils/testsUtils/createTestStore.util';
import { useGameSettings } from './gameSettingsHook';

describe('<useGameSettings />', () => {
  let useBoardSettingsStore: any;
  let wrapper: any;

  const useAppDispatchMockResponse = jest.fn((action) => {}) as Dispatch<any>;

  beforeEach(() => {
    useBoardSettingsStore = createTestStore();
    wrapper = function ({ children }: { children: any }) {
      return <Provider store={useBoardSettingsStore}>{children}</Provider>;
    };

    jest.spyOn(hooks, 'useAppDispatch')
      .mockReturnValue(useAppDispatchMockResponse);
  });

  afterEach(() => {
  });

  it('should create', () => {
    const { result } = renderHook(() => useGameSettings(), { wrapper });

    expect(result.current).toBeDefined();
  });
});
