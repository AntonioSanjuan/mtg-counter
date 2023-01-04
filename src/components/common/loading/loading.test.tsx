import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';

// eslint-disable-next-line import/no-extraneous-dependencies
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { createTestStore } from '../../../utils/testsUtils/createTestStore.util';
import { useAlertMock } from '../../../hooks/alert/alertHook.mock';
import { act } from '@testing-library/react-hooks';
import { Loading } from './loading';

describe('Loading', () => {
  let loadingStore: any;
  let history: any;

  beforeEach(() => {
    loadingStore = createTestStore();
    history = createMemoryHistory();
  });

  it('should create', () => {
    const { container } = render(
      <Provider store={loadingStore}>
        <Router location={history.location} navigator={history}>
          <Loading />
        </Router>
      </Provider>,
    );

    expect(container).toBeDefined();
  });
});
