import { Dispatch } from '@reduxjs/toolkit';

import { Provider } from 'react-redux';
import { act, renderHook } from '@testing-library/react-hooks';
import * as hooks from '../state/appStateHook';
import { createTestStore } from '../../utils/testsUtils/createTestStore.util';
import { useAlert } from './alertHook';
import { DynamicModalTypes } from '../../models/internal/types/DynamicModalEnum.model';
import { closeAlertAction, openAlertAction } from '../../state/layout/layout.actions';
import ProfileSettings from '../../components/common/profileSettings/profileSettings';

describe('<useAlert />', () => {
  let useAlertStore: any;
  let wrapper: any;

  const useAppDispatchMockResponse = jest.fn((action) => {}) as Dispatch<any>;

  beforeEach(() => {
    useAlertStore = createTestStore();
    wrapper = function ({ children }: { children: any }) {
      return <Provider store={useAlertStore}>{children}</Provider>;
    };

    jest.spyOn(hooks, 'useAppDispatch')
      .mockReturnValue(useAppDispatchMockResponse);
  });
  it('should create', async () => {
    const { result } = renderHook(() => useAlert(), { wrapper });
    expect(result).toBeDefined();
  });

  it('openAlert should dispatch openAlertAction', async () => {
    const alert = DynamicModalTypes.ProfileSettings;
    const { result } = renderHook(() => useAlert(), { wrapper });

    await act(async () => {
      result.current.openAlert(alert);
    });

    expect(useAppDispatchMockResponse).toHaveBeenCalledWith(openAlertAction(alert));
  });

  it('closeAlert should dispatch closeAlertAction', async () => {
    const { result } = renderHook(() => useAlert(), { wrapper });

    await act(async () => {
      result.current.closeAlert();
    });

    expect(useAppDispatchMockResponse).toHaveBeenCalledWith(closeAlertAction());
  });

  it('getAlertContent should return dynamic component if redux has stored LayoutAlertContent', async () => {
    const alert = DynamicModalTypes.ProfileSettings;
    await act(async () => {
      useAlertStore.dispatch(openAlertAction(alert));
    });

    const { result } = renderHook(() => useAlert(), { wrapper });
    const response = result.current.getAlertContent();

    expect(response?.type).toEqual(ProfileSettings);
  });

  it('getAlertContent should return dynamic component if redux has not stored LayoutAlertContent', async () => {
    const { result } = renderHook(() => useAlert(), { wrapper });
    const response = result.current.getAlertContent();

    expect(response).toEqual(undefined);
  });
});
