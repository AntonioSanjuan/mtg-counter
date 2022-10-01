/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable camelcase */
/* eslint-disable no-promise-executor-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { FirebaseStoredArticleInternal } from '../../models/dtos/firebaseStore/firebaseStoredArticle.model';

let storedArticlesMock: FirebaseStoredArticleInternal[] | undefined;
let loadingResponseMock: boolean;
let errorResponseMock: boolean;

export const useFetchStoredArticlesMock = () => ({
  storedArticles: storedArticlesMock,
  loading: loadingResponseMock,
  error: errorResponseMock,
});
