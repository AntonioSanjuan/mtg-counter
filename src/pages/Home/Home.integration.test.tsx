import { render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
// eslint-disable-next-line import/no-extraneous-dependencies
import { createMemoryHistory } from 'history';

import HomePage from './Home';

import { createTestStore } from '../../utils/testsUtils/createTestStore.util';

describe('HomePage', () => {
  let homeStore: any;
  let history: any;

  beforeEach(() => {
    homeStore = createTestStore();
    history = createMemoryHistory();
  });

  it('should create', () => {
    const { container } = render(
      <Provider store={homeStore}>
        <Router location={history.location} navigator={history}>
          <HomePage />
        </Router>
      </Provider>,
    );

    expect(container).toBeDefined();
  });
});
