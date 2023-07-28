import { render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
// eslint-disable-next-line import/no-extraneous-dependencies
import { createMemoryHistory } from 'history';

import { createTestStore } from '../../utils/testsUtils/createTestStore.util';
import MinifiedBoard from './MinifiedBoard';
import { getNewGame } from '../../utils/factories/gameFactory/gameFactory';
import { FirebaseBoardDto } from '../../models/dtos/firebaseStore/firebaseGame.model';

describe('MinifiedBoard', () => {
  let minifiedBoardStore: any;
  let board: FirebaseBoardDto
  let history: any;

  beforeEach(() => {
    board = getNewGame().board
    minifiedBoardStore = createTestStore();
    history = createMemoryHistory();

  });

  it('should create', () => {
    const { container } = render(
      <Provider store={minifiedBoardStore}>
        <Router location={history.location} navigator={history}>
          <MinifiedBoard board={board}/>
        </Router>
      </Provider>,
    );

    expect(container).toBeDefined();
  });
});
