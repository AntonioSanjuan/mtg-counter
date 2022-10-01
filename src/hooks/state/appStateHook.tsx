import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { AppDispatch, AppRootState } from '../../state/rootState';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppRootState> = useSelector;
