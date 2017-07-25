import Ramda from 'ramda';
import Immutable from 'immutable';
import { createSelector } from 'reselect';
import { moodsKeySelector, genreGroupsSelector } from '../mood/moodSelectors';
import loadingStates from '../../constants/loadingStates';

export const moviesModelSelector = state => state.movies;
export const configurationModelSelector = state => state.configuration;

export const moviesSelector = createSelector(
  moviesModelSelector,
  model => model.get('server')
);

export const uiSelector = createSelector(
  moviesModelSelector,
  model => model.get('ui')
);

export const configurationSelector = createSelector(
  configurationModelSelector,
  model => model.get('data')
);

export const configurationLoadingSelector = createSelector(
  configurationModelSelector,
  model => model.get('loadingStatus')
);

export const removeDuplicateIds = Ramda.uniqBy(movie => movie && movie.get('id'));

export const sortByVoteAverage = Ramda.sort((a, b) => {
  if (!a || !b) {
    return 0;
  }
  
  if (a.get('vote_average') < b.get('vote_average')) {
    return 1;
  }

  return -1;
});

export const sortUnique = list => Immutable.List(
  sortByVoteAverage(removeDuplicateIds(list.toArray()))
);

export const currentMoviesSelector = createSelector(
  moviesSelector,
  moodsKeySelector,
  genreGroupsSelector,
  configurationSelector,
  (movies, moodsKey, genreGroups, configuration) => {
    if (!configuration || !movies || !genreGroups || !moodsKey) {
      return null;
    }

    const movieGroups = genreGroups.map((genres) => {
      const genresKey = genres.sort().join('_');
      return movies.getIn([genresKey, 'data', 'results']);
    });

    const concatList = Ramda.reduce((acc, next) => {
      return acc.concat(next);
    }, Immutable.List());

    const allResults = concatList(movieGroups);

    const getLoadingStatus = () => {
      const isLoaded = genreGroups.every((genres) => {
        const genresKey = genres.sort().join('_');
        return movies.getIn([genresKey, 'loadingStatus']) === loadingStates.COMPLETE;
      });

      if (isLoaded) {
        return loadingStates.COMPLETE;
      }

      const isError = genreGroups.some((genres) => {
        const genresKey = genres.sort().join('_');
        return movies.getIn([genresKey, 'loadingStatus']) === loadingStates.ERROR;
      });

      return isError ? loadingStates.ERROR : loadingStates.LOADING;
    };

    return Immutable.Map({
      results: sortUnique(allResults),
      loadingStatus: getLoadingStatus()
    });
  }
);

export const currentMoviesLoadingStatusSelector = createSelector(
  currentMoviesSelector,
  (currentMovies) => {
    if (!currentMovies) {
      return loadingStates.LOADING;
    }
    return currentMovies.get('loadingStatus');
  }
);

export const currentMoviePageInfoSelector = createSelector(
  uiSelector,
  currentMoviesSelector,
  moodsKeySelector,
  (ui, currentMovies, moodsKey) => {
    if (!currentMovies || !moodsKey || !ui) {
      return null;
    }

    const movies = currentMovies.get('results');
    if (!movies || !movies.size) {
      return null;
    }

    const currentCounter = ui.getIn([moodsKey, 'currentIndex']);
    const currentIndex = currentCounter % movies.size;

    return {
      index: currentIndex,
      display: currentIndex < 0 ? currentIndex + 1 + movies.size : currentIndex + 1,
      total: movies.size
    };
  }
);

export const currentMovieSelector = createSelector(
  uiSelector,
  currentMoviesSelector,
  moodsKeySelector,
  currentMoviePageInfoSelector,
  (ui, currentMovies, moodsKey, currentMoviePageInfo) => {
    if (!currentMovies || !moodsKey || !ui || !currentMoviePageInfo) {
      return null;
    }

    const movies = currentMovies.get('results');
    if (!movies || !movies.size) {
      return null;
    }

    return movies.get(currentMoviePageInfo.index);
  }
);

export const nextMovieSelector = createSelector(
  uiSelector,
  currentMoviesSelector,
  moodsKeySelector,
  currentMoviePageInfoSelector,
  (ui, currentMovies, moodsKey, currentMoviePageInfo) => {
    if (!currentMovies || !moodsKey || !ui || !currentMoviePageInfo) {
      return null;
    }

    const movies = currentMovies.get('results');
    if (!movies || !movies.size || movies.size < 2) {
      return null;
    }
    const currentCounter = ui.getIn([moodsKey, 'currentIndex']);
    const nextIndex = (currentCounter + 1) % movies.size;

    return movies.get(nextIndex);
  }
);
