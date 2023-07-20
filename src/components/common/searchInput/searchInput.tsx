import { useState } from 'react';
import { closeSearchAnimation, openSearchAnimation } from '../../../animations/search/searchAnimation';
import { useAnimationByStateTransition } from '../../../hooks/animation/animationHook';
import './searchInput.scss';

function SearchInput({ onSearch } : {onSearch: any}) {
  const [opened, setOpened] = useState<boolean>(false);
  const [value, setValue] = useState<string|undefined>(undefined);

  const useAnimation = useAnimationByStateTransition(opened);

  const clear = () => {
    setOpened(false);
    setValue(undefined);
  };

  const search = (e: any) => {
    e.preventDefault();
    if (value) {
      clear();
      onSearch(value);
    }
  };

  const getSearchInputAnimation = () => (opened
    ? openSearchAnimation
    : closeSearchAnimation);

  return (
    <>
      <div className="searchInput_MainContainer">
        <button
          onClick={() => { setOpened(!opened); }}
          type="button"
          aria-label="SearchInput_OpenCloseButton"
          className="btn btn-dark"
        >
          <i className="bi bi-search" />
        </button>
        <div
          className="form-group"
          style={useAnimation.stateTransition ? getSearchInputAnimation() : undefined}
        >
          <form onSubmit={search}>
            <input
              type="text"
              className="form-control"
              aria-label="SearchInput_Input"
              placeholder="Search..."
              onChange={(e) => setValue(e.target.value)}
              value={value || ''}
            />
          </form>
        </div>
      </div>
      <button
        type="button"
        onClick={search}
        aria-label="SearchInput SearchButton"
        style={{ visibility: value ? 'visible' : 'hidden' }}
        className="btn btn-dark searchInput_MobileButton app_font_s"
      >
        search

      </button>
    </>
  );
}

export { SearchInput };
