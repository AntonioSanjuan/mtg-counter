import { useEffect, useState } from 'react';
import { getSearchedArticles } from '../../services/NYTdataSupplier/mostPopular/nytMostPupular.service';
import { useAppDispatch, useAppSelector } from '../state/appStateHook';
import { selectSearchedArticles } from '../../state/data/data.selectors';
import { SearchArticlesState } from '../../state/data/models/appData.state';
import {
  setSearchedArticlesAction,
  unsetSearchedArticlesAction,
} from '../../state/data/data.actions';
import { SearchedrticlesResponseDto } from '../../models/dtos/searchedArticles/searchedArticlesResponseDto.model';

export function useSearchedArticles({ search, page }: {search: string, page: number}) {
  const dispatch = useAppDispatch();
  const searchedArticlesState = useAppSelector<SearchArticlesState>(selectSearchedArticles);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [searchedArticles, setSearchedArticles] = useState<SearchedrticlesResponseDto|undefined>(
    searchedArticlesState.articles,
  );

  useEffect(() => {
    if (
      search
      && (!searchedArticlesState.articles
      || searchedArticlesState.search !== search)) {
      setLoading(true);
      setError(false);

      getSearchedArticles({ search, page })
        .then((searchedArticlesResp) => {
          console.log('🚀 ~ file: searchedArticlesHook.tsx ~ line 32 ~ .then ~ searchedArticlesResp', searchedArticlesResp);
          setLoading(false);
          setSearchedArticles(searchedArticlesResp);
          dispatch(setSearchedArticlesAction(searchedArticlesResp, search, page));
        }).catch(() => {
          setError(true);
          setLoading(false);
          setSearchedArticles(undefined);
          dispatch(unsetSearchedArticlesAction());
        });
    }
  }, [dispatch, search]);

  return { loading, error, searchedArticles };
}
