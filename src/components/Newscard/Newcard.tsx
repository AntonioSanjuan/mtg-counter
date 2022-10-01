import { useCallback } from 'react';
import { useStoredArticle } from '../../hooks/storedArticle/storedArticleHook';
import { useAppSelector } from '../../hooks/state/appStateHook';
import { MostPopularViewedArticlesResponseContentDto } from '../../models/dtos/mostPopularViewedArticles/mostPopularViewedArticlesResponseDto.model';
import { selectUserIsLogged } from '../../state/user/user.selectors';
import noImage from '../../assets/images/NoImage.png';
import './Newcard.scss';

function Newscard({ article, isStored }: {article: MostPopularViewedArticlesResponseContentDto, isStored?: boolean}) {
  const { addStoredArticle, deleteStoredArticle } = useStoredArticle();
  const userIsLogged = useAppSelector<boolean>(selectUserIsLogged);

  const hasImage = useCallback(() => !!article?.media[0], [article]);

  const getImage = useCallback(() => {
    const mediaMetadataIndex = (article?.media[0]['media-metadata'].length ?? 0) - 1;

    return article?.media[0]['media-metadata'][mediaMetadataIndex].url;
  }, [article]);

  return (
    <div className="NewsCard_MainContainer">
      <div className="NewsCard_ImageContainer">
        {article && hasImage()
          ? (
            <img
              alt="article resource"
              className="NewsCard_Image"
              src={getImage()}
            />
          )
          : (
            <img
              alt="default resource"
              className="NewsCard_Image"
              src={noImage}
            />
          )}
      </div>
      <div className="NewsCard_CategoryContainer">
        <div className="NewsCard_CategoryByLine">
          <p className="app_font_xs">
            {article?.byline}
          </p>
        </div>
        <div className="NewsCard_CategorySection">
          <p className="app_font_xs">
            {article?.section}
          </p>
        </div>
      </div>
      <div className="NewsCard_TitleContainer">
        <p className="app_font_l">
          {article?.title}
        </p>
      </div>
      <div className="NewsCard_TextContainer">
        <p className="app_font_s">
          {article?.abstract}
        </p>
      </div>
      <div className="NewsCard_ActionContainer">
        <div className="NewsCard_Leftcontainer">
          <button
            type="button"
            style={{ display: userIsLogged && !isStored ? 'inherit' : 'none' }}
            className="btn btn-dark"
            aria-label="add from stored articles"
            onClick={() => addStoredArticle(article)}
          >
            <i className="bi bi-save2-fill" />
          </button>
          <button
            type="button"
            className="btn btn-dark"
            aria-label="go to see full information"
            onClick={() => window.open(article.url, '_blank')?.focus()}
          >
            <i className="bi bi-globe" />
          </button>
        </div>
        <div className="NewsCard_Rightcontainer">
          <button
            type="button"
            style={{ visibility: isStored ? 'visible' : 'hidden' }}
            className="btn btn-dark"
            aria-label="remove from stored articles"
            onClick={() => deleteStoredArticle(article)}
          >
            <i className="bi bi-trash-fill" />
          </button>
        </div>
      </div>
    </div>
  );
}

export { Newscard };
