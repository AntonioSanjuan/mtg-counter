import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Loading } from '../../components/common/loading/loading';
import { useSearchedArticles } from '../../hooks/searchedArticles/searchedArticlesHook';

function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState<number>(1);
  const [selectedSearch, setSelectedSearch] = useState<string>('');
  const [inputTextField, setInputTextFilter] = useState<string>('');

  const { searchedArticles, loading, error } = useSearchedArticles({ search: selectedSearch, page });

  const handleNewSearch = () => {
    setSelectedSearch(inputTextField);
    setSearchParams(inputTextField);
  };

  useEffect(() => {
    const newQuerySearch: string = searchParams.get('filterText') || '';
    setSelectedSearch(newQuerySearch);
    setInputTextFilter(newQuerySearch);
  }, [searchParams]);

  return (
    <>
      { loading
        && <Loading />}
      <input
        type="text"
        className="form-control"
        placeholder="Search..."
        onChange={(e) => setInputTextFilter(e.target.value)}
        value={inputTextField || ''}
      />
      <button
        type="button"
        onClick={
          handleNewSearch
        }
      >
        Search
      </button>
      {
            error
              ? <p className="app_font_m">No Data</p>
              : <p className="app_font_m">Exists Data</p>
}
    </>

  );
}

export default SearchPage;
