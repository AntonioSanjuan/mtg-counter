import { MostPopularViewedArticlesResponseDto } from '../../models/dtos/mostPopularViewedArticles/mostPopularViewedArticlesResponseDto.model';
import { SearchedrticlesResponseDto } from '../../models/dtos/searchedArticles/searchedArticlesResponseDto.model';
import { PeriodOfTimes } from '../../models/internal/types/PeriodOfTimeEnum.model';

export enum DataActions {
    setMostPopularViewedArticles = '@action/setMostPopularViewedArticles',
    unsetMostPopularViewedArticles = '@action/unsetMostPopularViewedArticles',
    setSearchedArticles = '@action/setSearchedArticles',
    unsetSearchedArticles = '@action/unsetSearchedArticles'
}

export const setMostPopularViewedArticlesAction = (
  mostPopularViewedArticles: MostPopularViewedArticlesResponseDto,
  requestedPeriod: PeriodOfTimes,
) => ({
  type: DataActions.setMostPopularViewedArticles,
  payload: { mostPopularViewedArticles, requestedPeriod },
});

export const unsetMostPopularViewedArticlesAction = () => ({
  type: DataActions.setMostPopularViewedArticles,
});

export const setSearchedArticlesAction = (
  searchedArticles: SearchedrticlesResponseDto,
  search: string,
  page: number,
) => ({
  type: DataActions.setSearchedArticles,
  payload: { searchedArticles, search, page },
});

export const unsetSearchedArticlesAction = () => ({
  type: DataActions.unsetSearchedArticles,
});
