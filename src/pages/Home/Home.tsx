import { useState } from 'react';
import { useMostPopularArticles } from '../../hooks/mostPopularArticles/mostPopularArticlesHook';
import { Newscard } from '../../components/Newscard/Newcard';
import { PeriodOfTimes } from '../../models/internal/types/PeriodOfTimeEnum.model';
import './Home.scss';
import { useAppSelector } from '../../hooks/state/appStateHook';
import { MostPopularViewedArticlesState } from '../../state/data/models/appData.state';
import { selectMostPopularViewedArticles } from '../../state/data/data.selectors';
import { Loading } from '../../components/common/loading/loading';

function HomePage() {
  const { requestedPeriod } = useAppSelector<MostPopularViewedArticlesState>(selectMostPopularViewedArticles);

  const [selectedPeriodOfTime, setSelectedPeriodOfTime] = useState<PeriodOfTimes>(
    requestedPeriod,
  );
  const periodOfTimes = PeriodOfTimes;

  const { mostPopularArticles, loading, error } = useMostPopularArticles({ periodOfTime: selectedPeriodOfTime });

  const setOption = (selectedOption: any) => {
    setSelectedPeriodOfTime(Number.parseInt(selectedOption.target.value, 10));
  };

  return (
    <>
      { loading
          && <Loading />}
      <div className="MostPopularArticles_MainContainer">
        <div className="MostPopularArticles_SubContainer">
          <div className="MostPopularArticles_FilterContainer">
            <div>
              <p className="app_font_l">Most Popular Articles</p>
            </div>
            <select
              className="form-select MostPopularArticles_Filter"
              value={selectedPeriodOfTime}
              onChange={setOption}
            >
              <option value={periodOfTimes.Daily}>Daily</option>
              <option value={periodOfTimes.Weekly}>Weekly</option>
              <option value={periodOfTimes.Monthly}>Monthly</option>
            </select>
          </div>
          <div className="MostPopularArticles_News">
            {
            error
              ? <p className="app_font_m">No Data</p>
              : mostPopularArticles?.results.map((article) => (
                <div className="MostPopularArticles_New" key={article.id}>
                  <Newscard article={article} />
                </div>
              ))
}
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePage;
