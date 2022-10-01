import { useEffect, useState } from 'react';
import { getMostPopularViewedArticles } from '../../services/NYTdataSupplier/mostPopular/nytMostPupular.service';
import { useAppDispatch, useAppSelector } from '../state/appStateHook';
import { selectMostPopularViewedArticles } from '../../state/data/data.selectors';
import { MostPopularViewedArticlesState } from '../../state/data/models/appData.state';
import { PeriodOfTimes } from '../../models/internal/types/PeriodOfTimeEnum.model';
import {
  setMostPopularViewedArticlesAction,
  unsetMostPopularViewedArticlesAction,
} from '../../state/data/data.actions';
import { MostPopularViewedArticlesResponseDto } from '../../models/dtos/mostPopularViewedArticles/mostPopularViewedArticlesResponseDto.model';

export function useMostPopularArticles({ periodOfTime }: {periodOfTime: PeriodOfTimes}) {
  const dispatch = useAppDispatch();
  const mostPopularArticlesState = useAppSelector<MostPopularViewedArticlesState>(selectMostPopularViewedArticles);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [mostPopularArticles, setMostPopularArticles] = useState<MostPopularViewedArticlesResponseDto|undefined>(
    mostPopularArticlesState.articles,
  );

  useEffect(() => {
    if (!mostPopularArticlesState.articles
      || mostPopularArticlesState.requestedPeriod !== periodOfTime) {
      setLoading(true);
      setError(false);

      getMostPopularViewedArticles({ periodOfTime })
        .then((mostPopularArticlesResp) => {
          setLoading(false);
          setMostPopularArticles(mostPopularArticlesResp);
          dispatch(setMostPopularViewedArticlesAction(mostPopularArticlesResp, periodOfTime));
        }).catch(() => {
          setError(true);
          setLoading(false);
          setMostPopularArticles(undefined);
          dispatch(unsetMostPopularViewedArticlesAction());
        });
    }
  }, [dispatch, periodOfTime, mostPopularArticlesState]);

  return { loading, error, mostPopularArticles };
}
