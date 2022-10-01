import { SearchedrticlesResponseDto } from '../../models/dtos/searchedArticles/searchedArticlesResponseDto.model';
import { DataActions } from './data.actions';
import { dataInitialState } from './models/appData.initialState';
import { DataState } from './models/appData.state';

const mergeSearchedArticles = (
  currentArticles: SearchedrticlesResponseDto,
  newArticles: SearchedrticlesResponseDto,
): SearchedrticlesResponseDto => ({
  ...currentArticles,
  response: {
    ...currentArticles.response,
    docs: currentArticles.response.docs.concat(newArticles.response.docs),
  },
});

// eslint-disable-next-line default-param-last
const dataReducer = (state: DataState = dataInitialState, action: any): DataState => {
  switch (action.type) {
    case DataActions.setMostPopularViewedArticles:
      return {
        ...state,
        mostPopularViewedArticles: {
          articles: action.payload.mostPopularViewedArticles,
          requestedPeriod: action.payload.requestedPeriod,
        },
      };
    case DataActions.unsetMostPopularViewedArticles:
      return {
        ...state,
        mostPopularViewedArticles: {
          ...dataInitialState.mostPopularViewedArticles,
        },
      };
    case DataActions.setSearchedArticles:
      return {
        ...state,
        searchedArticles: {
          articles: state.searchedArticles.articles
            ? mergeSearchedArticles(state.searchedArticles.articles, action.payload.articles)
            : action.payload.articles,
          search: action.payload.search,
          page: action.payload.page,
        },
      };
    case DataActions.unsetSearchedArticles:
      return {
        ...state,
        searchedArticles: {
          ...dataInitialState.searchedArticles,
        },
      };
    default:
      return state;
  }
};

export { dataReducer };
