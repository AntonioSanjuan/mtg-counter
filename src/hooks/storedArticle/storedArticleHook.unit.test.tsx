import { act, renderHook } from '@testing-library/react-hooks';
import { Dispatch } from '@reduxjs/toolkit';

import { Provider } from 'react-redux';
import { useStoredArticle } from './storedArticleHook';

import * as hooks from '../state/appStateHook';
import * as firebaseStoreServiceMock from '../../services/firebaseStore/storedArticles/storedArticles.service.mock';
import { createTestStore } from '../../utils/testsUtils/createTestStore.util';
import { MostPopularViewedArticlesResponseContentDto } from '../../models/dtos/mostPopularViewedArticles/mostPopularViewedArticlesResponseDto.model';

describe('<useFetchStoredArticles />', () => {
  let useStoredArticleStore: any;
  let wrapper: any;

  const useAppDispatchMockResponse = jest.fn((action) => {}) as Dispatch<any>;

  beforeEach(() => {
    useStoredArticleStore = createTestStore();
    wrapper = function ({ children }: { children: any }) {
      return <Provider store={useStoredArticleStore}>{children}</Provider>;
    };

    jest.spyOn(hooks, 'useAppDispatch')
      .mockReturnValue(useAppDispatchMockResponse);

    firebaseStoreServiceMock.initializeMock();
  });

  afterEach(() => {
    firebaseStoreServiceMock.reset();
  });

  it('should create', () => {
    const { result } = renderHook(() => useStoredArticle(), { wrapper });

    expect(result).toBeDefined();
  });

  it('addStoredArticle() must request to addUserStoredArticle service function', async () => {
    expect(firebaseStoreServiceMock.addUserStoredArticleSpy).not.toHaveBeenCalled();

    const inputArticle = { id: 123 } as MostPopularViewedArticlesResponseContentDto;
    const { result } = renderHook(() => useStoredArticle(), { wrapper });

    await act(async () => {
      await result.current.addStoredArticle(inputArticle);
    });
    expect(firebaseStoreServiceMock.addUserStoredArticleSpy).toHaveBeenCalled();
  });
});
