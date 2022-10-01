import { render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
// eslint-disable-next-line import/no-extraneous-dependencies
import { createMemoryHistory } from 'history';

import CV from './cv';
import { createTestStore } from '../../../../utils/testsUtils/createTestStore.util';

describe('CV', () => {
  let contactStore: any;
  let history: any;

  beforeEach(() => {
    contactStore = createTestStore();
    history = createMemoryHistory();
  });

  it('should create', () => {
    const { container } = render(
      <Provider store={contactStore}>
        <Router location={history.location} navigator={history}>
          <CV />
        </Router>
      </Provider>,
    );

    expect(container).toBeDefined();
  });
});
