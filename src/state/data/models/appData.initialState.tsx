import { PeriodOfTimes } from '../../../models/internal/types/PeriodOfTimeEnum.model';
import { DataState } from './appData.state';

export const dataInitialState: DataState = {
  mostPopularViewedArticles: {
    articles: undefined,
    requestedPeriod: PeriodOfTimes.Daily,
  },
  searchedArticles: {
    articles: undefined,
    search: '',
    page: 0,
  },
};
