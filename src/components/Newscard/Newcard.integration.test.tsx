import {
  act, fireEvent, render, screen,
} from '@testing-library/react';
import { Provider } from 'react-redux';

// eslint-disable-next-line import/no-extraneous-dependencies
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { User } from 'firebase/auth';
import * as storedArticlesHook from '../../hooks/storedArticle/storedArticleHook';
import { MostPopularViewedArticlesResponseContentDto } from '../../models/dtos/mostPopularViewedArticles/mostPopularViewedArticlesResponseDto.model';
import { Newscard } from './Newcard';
import { setUserAction } from '../../state/user/user.actions';
import { createTestStore } from '../../utils/testsUtils/createTestStore.util';
import { useStoredArticleMock } from '../../hooks/storedArticle/storedArticleHook.mock';

describe('Newcard', () => {
  let sidenavStore: any;
  let history: any;

  const inputArticle = {
    media: [{ 'media-metadata': [{ url: 'http://testingUrl' }] }],
  } as MostPopularViewedArticlesResponseContentDto;

  beforeEach(() => {
    sidenavStore = createTestStore();
    history = createMemoryHistory();

    jest.spyOn(storedArticlesHook, 'useStoredArticle')
      .mockImplementation(useStoredArticleMock);
  });

  afterEach(() => {

  });

  it('should create', () => {
    const { container } = render(
      <Provider store={sidenavStore}>
        <Router location={history.location} navigator={history}>
          <Newscard article={inputArticle} />
        </Router>
      </Provider>,
    );
    expect(container).toBeDefined();
  });

  it('By default remove from stored articles button should be hidden', () => {
    render(
      <Provider store={sidenavStore}>
        <Router location={history.location} navigator={history}>
          <Newscard article={inputArticle} />
        </Router>
      </Provider>,
    );
    expect(screen.getByLabelText('remove from stored articles')).not.toBeVisible();
  });

  it('if isLogged add from stored articles button should appears', async () => {
    render(
      <Provider store={sidenavStore}>
        <Router location={history.location} navigator={history}>
          <Newscard article={inputArticle} />
        </Router>
      </Provider>,
    );
    expect(screen.getByLabelText('add from stored articles')).not.toBeVisible();

    await act(async () => {
      sidenavStore.dispatch(setUserAction({} as User));
    });

    expect(screen.getByLabelText('add from stored articles')).toBeVisible();
  });

  it('if add from stored articles button its clicked addStoredArticle hook func should be called', async () => {
    render(
      <Provider store={sidenavStore}>
        <Router location={history.location} navigator={history}>
          <Newscard article={inputArticle} />
        </Router>
      </Provider>,
    );

    await act(async () => {
      sidenavStore.dispatch(setUserAction({} as User));
    });

    expect(useStoredArticleMock().addStoredArticle).not.toHaveBeenCalled();
    fireEvent.click(screen.getByLabelText('add from stored articles'));
    expect(useStoredArticleMock().addStoredArticle).toHaveBeenCalledWith(inputArticle);
  });

  it('if remove from stored articles button its clicked removeStoredArticle hook func should be called', async () => {
    render(
      <Provider store={sidenavStore}>
        <Router location={history.location} navigator={history}>
          <Newscard article={inputArticle} isStored />
        </Router>
      </Provider>,
    );

    expect(useStoredArticleMock().deleteStoredArticle).not.toHaveBeenCalled();
    fireEvent.click(screen.getByLabelText('remove from stored articles'));
    expect(useStoredArticleMock().deleteStoredArticle).toHaveBeenCalledWith(inputArticle);
  });
});
