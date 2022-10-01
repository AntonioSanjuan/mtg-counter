import { render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
// eslint-disable-next-line import/no-extraneous-dependencies
import { createMemoryHistory } from 'history';

import HomePage from './Home';

import * as mostPopularArticlesHooks from '../../hooks/mostPopularArticles/mostPopularArticlesHook';
import { createTestStore } from '../../utils/testsUtils/createTestStore.util';
import { useMostPopularArticlesMock } from '../../hooks/mostPopularArticles/mostPopularArticlesHook.mock';

describe('HomePage', () => {
  let homeStore: any;
  let history: any;

  let useMostPopularArticlesSpy: any;

  beforeEach(() => {
    homeStore = createTestStore();
    history = createMemoryHistory();

    useMostPopularArticlesSpy = jest.spyOn(mostPopularArticlesHooks, 'useMostPopularArticles')
      .mockImplementation(useMostPopularArticlesMock);
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

  it('initially should use useMostPopularArticles hook', () => {
    render(
      <Provider store={homeStore}>
        <Router location={history.location} navigator={history}>
          <HomePage />
        </Router>
      </Provider>,
    );

    expect(useMostPopularArticlesSpy).toHaveBeenCalled();
  });
});
