import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';

// eslint-disable-next-line import/no-extraneous-dependencies
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { createTestStore } from '../../../utils/testsUtils/createTestStore.util';
import Chip from './chip';

describe('Chip', () => {
  let chipStore: any;
  let history: any;

  beforeEach(() => {
    chipStore = createTestStore();
    history = createMemoryHistory();
  });

  it('should create', () => {
    const { container } = render(
      <Provider store={chipStore}>
        <Router location={history.location} navigator={history}>
          <Chip>
            <p>hola</p>
          </Chip>
        </Router>
      </Provider>,
    );

    expect(container).toBeDefined();
  });
});
