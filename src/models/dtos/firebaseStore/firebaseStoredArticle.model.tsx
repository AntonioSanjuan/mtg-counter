import { MostPopularViewedArticlesResponseContentDto } from '../mostPopularViewedArticles/mostPopularViewedArticlesResponseDto.model';

export interface FirebaseStoredArticleInternal {
    firebaseDocId: string;
    storedArticle: MostPopularViewedArticlesResponseContentDto
}

export interface FirebaseStoredArticleDto {
    userUid: string;
    articleId: string;
    articleStringify: string;
}
