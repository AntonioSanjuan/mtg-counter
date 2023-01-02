import { render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
// eslint-disable-next-line import/no-extraneous-dependencies
import { createMemoryHistory } from 'history';

import { createTestStore } from '../../utils/testsUtils/createTestStore.util';
import Board from './Board';

describe('Board', () => {
  let boardStore: any;
  let history: any;

  beforeEach(() => {
    boardStore = createTestStore();
    history = createMemoryHistory();
  });

  it('should create', () => {
    const { container } = render(
      <Provider store={boardStore}>
        <Router location={history.location} navigator={history}>
          <Board />
        </Router>
      </Provider>,
    );

    expect(container).toBeDefined();
  });
});
