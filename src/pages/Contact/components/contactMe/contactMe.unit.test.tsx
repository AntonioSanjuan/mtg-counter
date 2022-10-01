import { render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
// eslint-disable-next-line import/no-extraneous-dependencies
import { createMemoryHistory } from 'history';

import ContactMe from './contactMe';
import { createTestStore } from '../../../../utils/testsUtils/createTestStore.util';

describe('ContactMe', () => {
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
          <ContactMe />
        </Router>
      </Provider>,
    );

    expect(container).toBeDefined();
  });
});
