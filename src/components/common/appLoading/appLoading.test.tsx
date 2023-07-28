import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';

// eslint-disable-next-line import/no-extraneous-dependencies
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { createTestStore } from '../../../utils/testsUtils/createTestStore.util';
import { AppLoading } from './appLoading';

describe('AppLoading', () => {
  let appLoadingStore: any;
  let history: any;

  beforeEach(() => {
    appLoadingStore = createTestStore();
    history = createMemoryHistory();
  });

  it('should create', () => {
    const { container } = render(
      <Provider store={appLoadingStore}>
        <Router location={history.location} navigator={history}>
          <AppLoading />
        </Router>
      </Provider>,
    );

    expect(container).toBeDefined();
  });
});
