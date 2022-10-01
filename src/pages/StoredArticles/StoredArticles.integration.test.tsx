import { render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
// eslint-disable-next-line import/no-extraneous-dependencies
import { createMemoryHistory } from 'history';
import * as fetchStoredArticlesHooks from '../../hooks/fetchStoredArticles/fetchStoredArticlesHook';

import StoredArticles from './StoredArticles';
import { createTestStore } from '../../utils/testsUtils/createTestStore.util';
import { useFetchStoredArticlesMock } from '../../hooks/fetchStoredArticles/fetchStoredArticlesHook.mock';

describe('Contact', () => {
  let contactStore: any;
  let history: any;

  let useFetchStoredArticlesSpy: any;
  beforeEach(() => {
    contactStore = createTestStore();
    history = createMemoryHistory();

    useFetchStoredArticlesSpy = jest.spyOn(fetchStoredArticlesHooks, 'useFetchStoredArticles')
      .mockImplementation(useFetchStoredArticlesMock);
  });

  it('should create', () => {
    const { container } = render(
      <Provider store={contactStore}>
        <Router location={history.location} navigator={history}>
          <StoredArticles />
        </Router>
      </Provider>,
    );

    expect(container).toBeDefined();
  });

  it('initially should use useFetchStoredArticles hook', () => {
    render(
      <Provider store={contactStore}>
        <Router location={history.location} navigator={history}>
          <StoredArticles />
        </Router>
      </Provider>,
    );

    expect(useFetchStoredArticlesSpy).toHaveBeenCalled();
  });
});
