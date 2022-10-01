import { Loading } from '../../components/common/loading/loading';
import { Newscard } from '../../components/Newscard/Newcard';
import { useFetchStoredArticles } from '../../hooks/fetchStoredArticles/fetchStoredArticlesHook';
import './StoredArticles.scss';

function StoredArticlesPage() {
  const { storedArticles, loading, error } = useFetchStoredArticles();

  return (
    <>
      { loading
      && <Loading />}
      <div className="StoredArticles_MainContainer">
        <div className="StoredArticles_SubContainer">
          <div className="StoredArticles_News">
            {
              error
                ? <p>Error</p>
                : storedArticles?.map((article) => (
                  <div className="StoredArticles_New" key={article.firebaseDocId}>
                    <Newscard
                      article={article.storedArticle}
                      isStored
                    />
                  </div>
                ))
            }
          </div>
        </div>
      </div>
    </>
  );
}

export default StoredArticlesPage;
