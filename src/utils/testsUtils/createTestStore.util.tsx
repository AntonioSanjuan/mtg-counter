import { createStore } from '@reduxjs/toolkit';
import { combinedReducers } from '../../state/rootState';

export function createTestStore() {
  const testStore = createStore(
    combinedReducers,
  );
  return testStore;
}
