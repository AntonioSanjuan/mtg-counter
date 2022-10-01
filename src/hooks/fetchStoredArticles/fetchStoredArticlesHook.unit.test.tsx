import { renderHook } from '@testing-library/react-hooks';
import { Dispatch } from '@reduxjs/toolkit';

import { Provider } from 'react-redux';
import { act } from 'react-dom/test-utils';
import { useFetchStoredArticles } from './fetchStoredArticlesHook';

import * as hooks from '../state/appStateHook';
import * as firebaseStoreServiceMock from '../../services/firebaseStore/storedArticles/storedArticles.service.mock';
import { setUserStoredArticlesAction } from '../../state/user/user.actions';
import { createTestStore } from '../../utils/testsUtils/createTestStore.util';
import { MostPopularViewedArticlesResponseContentDto } from '../../models/dtos/mostPopularViewedArticles/mostPopularViewedArticlesResponseDto.model';

describe('<useFetchStoredArticles />', () => {
  let useFetchStoredArticlesStore: any;
  let wrapper: any;

  const useAppDispatchMockResponse = jest.fn(() => {}) as Dispatch<any>;

  beforeEach(() => {
    useFetchStoredArticlesStore = createTestStore();
    wrapper = function ({ children }: { children: any }) {
      return <Provider store={useFetchStoredArticlesStore}>{children}</Provider>;
    };

    jest.spyOn(hooks, 'useAppDispatch')
      .mockReturnValue(useAppDispatchMockResponse);

    firebaseStoreServiceMock.initializeMock();
  });

  afterEach(() => {
    firebaseStoreServiceMock.reset();
  });

  it('should create', async () => {
    expect(firebaseStoreServiceMock.getUserStoredArticlesSpy).not.toHaveBeenCalled();
    const { result, waitForNextUpdate } = renderHook(() => useFetchStoredArticles(), { wrapper });
    await waitForNextUpdate();

    expect(result).toBeDefined();
  });

  it('initially should request getUserStoredArticles', async () => {
    expect(firebaseStoreServiceMock.getUserStoredArticlesSpy).not.toHaveBeenCalled();

    const { waitForNextUpdate } = renderHook(() => useFetchStoredArticles(), { wrapper });
    await waitForNextUpdate();

    expect(firebaseStoreServiceMock.getUserStoredArticlesSpy).toHaveBeenCalled();
  });

  it('if response data has been previously fetched should fetch again', async () => {
    expect(firebaseStoreServiceMock.getUserStoredArticlesSpy).not.toHaveBeenCalled();

    await act(async () => {
      useFetchStoredArticlesStore.dispatch(setUserStoredArticlesAction([]));
    });

    const { waitForNextUpdate } = renderHook(() => useFetchStoredArticles(), { wrapper });
    await waitForNextUpdate();

    expect(firebaseStoreServiceMock.getUserStoredArticlesSpy).toHaveBeenCalledTimes(1);
  });

  it('initially should request getUserStoredArticles if success...', async () => {
    const article = { uri: 'uritest' } as MostPopularViewedArticlesResponseContentDto;

    const sut = {
      userUid: 'userUid',
      articleStringify: JSON.stringify(article),
    };

    const response = {
      docs: [
        {
          id: 'idTest',
          data: () => sut,
        },
      ],
    } as any;
    firebaseStoreServiceMock.getUserStoredArticlesSpy.mockResolvedValue(response);

    const { result, waitForNextUpdate } = renderHook(() => useFetchStoredArticles(), { wrapper });
    await waitForNextUpdate();

    expect(result.current.loading).toEqual(false);
    expect(result.current.error).toEqual(false);
    expect(useAppDispatchMockResponse).toHaveBeenCalledWith(setUserStoredArticlesAction([{ storedArticle: { uri: 'uritest' }, firebaseDocId: 'idTest' } as any]));
  });

  it('initially should request getUserStoredArticles if error...', async () => {
    firebaseStoreServiceMock.getUserStoredArticlesSpy.mockRejectedValue({});

    const { result, waitForNextUpdate } = renderHook(() => useFetchStoredArticles(), { wrapper });
    await waitForNextUpdate();

    expect(result.current.loading).toEqual(false);
    expect(result.current.error).toEqual(true);
  });
});
