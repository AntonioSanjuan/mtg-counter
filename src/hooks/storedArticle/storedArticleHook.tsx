import { useCallback } from 'react';
import { FirebaseStoredArticleDto } from '../../models/dtos/firebaseStore/firebaseStoredArticle.model';
import { MostPopularViewedArticlesResponseContentDto } from '../../models/dtos/mostPopularViewedArticles/mostPopularViewedArticlesResponseDto.model';
import * as firebaseStoreService from '../../services/firebaseStore/storedArticles/storedArticles.service';
import { auth } from '../../utils/firebase.util';

export function useStoredArticle() {
  const addStoredArticle = useCallback(async (article: MostPopularViewedArticlesResponseContentDto): Promise<void> => {
    await firebaseStoreService.addUserStoredArticle(getArticleRef(article));
  }, []);

  const deleteStoredArticle = useCallback(async (article: MostPopularViewedArticlesResponseContentDto): Promise<void> => {
    await firebaseStoreService.deleteUserStoredArticle(getArticleRef(article));
  }, []);

  const getArticleRef = (article: MostPopularViewedArticlesResponseContentDto) => ({
    userUid: auth.currentUser?.uid as string,
    articleId: article.id.toString(),
    articleStringify: JSON.stringify(article),
  } as FirebaseStoredArticleDto);

  return {
    addStoredArticle,
    deleteStoredArticle,
  };
}
