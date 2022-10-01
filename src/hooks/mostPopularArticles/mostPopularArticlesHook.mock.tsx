/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable camelcase */
/* eslint-disable no-promise-executor-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { MostPopularViewedArticlesResponseDto } from '../../models/dtos/mostPopularViewedArticles/mostPopularViewedArticlesResponseDto.model';
import { PeriodOfTimes } from '../../models/internal/types/PeriodOfTimeEnum.model';

let mostPopularArticlesMock: MostPopularViewedArticlesResponseDto | undefined;
let loadingResponseMock: boolean;
let errorResponseMock: boolean;

export const useMostPopularArticlesMock = ({ periodOfTime }: {periodOfTime: PeriodOfTimes}) => ({
  mostPopularArticles: mostPopularArticlesMock,
  loading: loadingResponseMock,
  error: errorResponseMock,
});
