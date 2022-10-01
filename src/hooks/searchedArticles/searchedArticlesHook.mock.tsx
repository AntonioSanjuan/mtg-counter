/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable camelcase */
/* eslint-disable no-promise-executor-return */
/* eslint-disable @typescript-eslint/no-explicit-any */

let searchedArticlesMock: any;
let loadingResponseMock: boolean;
let errorResponseMock: boolean;

export const useMostPopularArticlesMock = ({ search }: {search: string}) => ({
  searchedArticles: searchedArticlesMock,
  loading: loadingResponseMock,
  error: errorResponseMock,
});
