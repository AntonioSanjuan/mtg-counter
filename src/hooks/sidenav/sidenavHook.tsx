import { useCallback } from 'react';
import { switchSidenavStatusAction } from '../../state/layout/layout.actions';
import { useAppDispatch } from '../state/appStateHook';

export function useSidenavLayer() {
  const dispatch = useAppDispatch();

  const switchSidenavStatus = useCallback(() => {
    dispatch(switchSidenavStatusAction());
  }, [dispatch]);

  return {
    switchSidenavStatus,
  };
}
