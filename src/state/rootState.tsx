import { combineReducers, createStore } from '@reduxjs/toolkit';
import { composeWithDevTools } from 'redux-devtools-extension';
import { dataReducer } from './data/data.reducer';
import { DataState } from './data/models/appData.state';
import { layoutReducer } from './layout/layout.reducer';
import { LayoutState } from './layout/models/appLayout.state';
import { UserState } from './user/models/appUser.state';
import { userReducer } from './user/user.reducer';

export interface AppRootState {
    user: UserState;
    layout: LayoutState;
    data: DataState
}

export const combinedReducers = combineReducers({
  user: userReducer,
  layout: layoutReducer,
  data: dataReducer,
});

export const store = createStore(
  combinedReducers,
  composeWithDevTools(),
);

// Inferred type: {user: UserState}
export type AppDispatch = typeof store.dispatch
