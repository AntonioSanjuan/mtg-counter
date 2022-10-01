import { renderHook } from '@testing-library/react-hooks';

import { Dispatch } from '@reduxjs/toolkit';
import { useSidenavLayer } from './sidenavHook';

import * as hooks from '../state/appStateHook';
import { switchSidenavStatusAction } from '../../state/layout/layout.actions';

describe('<useSidenavLayer />', () => {
  const useAppDispatchMockResponse = jest.fn((action) => {}) as Dispatch<any>;

  beforeEach(() => {
    jest.spyOn(hooks, 'useAppDispatch')
      .mockReturnValue(useAppDispatchMockResponse);
  });

  it('should create', () => {
    const { result } = renderHook(() => useSidenavLayer());

    expect(result.current).toBeDefined();
  });

  it('switchSidenavStatus should dispatch switchSidenavStatus action', () => {
    const { result } = renderHook(() => useSidenavLayer());

    expect(useAppDispatchMockResponse).not.toHaveBeenCalled();

    result.current.switchSidenavStatus();

    expect(useAppDispatchMockResponse).toHaveBeenCalled();
    expect(useAppDispatchMockResponse).toHaveBeenCalledWith(switchSidenavStatusAction());
  });
});
