import { MostPopularViewedArticlesResponseDto } from '../../../models/dtos/mostPopularViewedArticles/mostPopularViewedArticlesResponseDto.model';
import { SearchedrticlesResponseDto } from '../../../models/dtos/searchedArticles/searchedArticlesResponseDto.model';
import { PeriodOfTimes } from '../../../models/internal/types/PeriodOfTimeEnum.model';

export interface MostPopularViewedArticlesState {
  requestedPeriod: PeriodOfTimes;
  articles: MostPopularViewedArticlesResponseDto | undefined;
}

export interface SearchArticlesState {
  page: number;
  search: string;
  articles: SearchedrticlesResponseDto | undefined;
}

export interface DataState {
  mostPopularViewedArticles: MostPopularViewedArticlesState;
  searchedArticles: SearchArticlesState;
}
