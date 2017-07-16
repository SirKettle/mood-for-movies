import { createSelector } from 'reselect';
import { moodsKeySelector } from '../mood/moodSelectors';
import loadingStates from '../../constants/loadingStates';

export const moviesModelSelector = state => state.movies;
export const configurationModelSelector = state => state.configuration;

export const moviesSelector = createSelector(
  moviesModelSelector,
  model => model
);

export const configurationSelector = createSelector(
  configurationModelSelector,
  model => model.get('data')
);

export const configurationLoadingSelector = createSelector(
  configurationModelSelector,
  model => model.get('loading')
);

export const currentMoviesSelector = createSelector(
  moviesSelector,
  moodsKeySelector,
  configurationSelector,
  (movies, moodsKey, configuration) => {
    if (!configuration || !movies || !moodsKey) {
      return null;
    }

    return movies.get(moodsKey);
  }
);

export const currentMoviesLoadingStatusSelector = createSelector(
  moviesSelector,
  moodsKeySelector,
  configurationSelector,
  (movies, moodsKey, configuration) => {
    if (!configuration || !movies || !moodsKey) {
      return loadingStates.LOADING;
    }

    return movies.getIn([moodsKey, 'loadingState']);
  }
);

export const currentMovieSelector = createSelector(
  currentMoviesSelector,
  (currentMovies) => {
    if (!currentMovies) {
      return null;
    }

    const movieSet = currentMovies.get('data');
    if (!movieSet || !movieSet.get('total_results')) {
      return null;
    }

    const currentIndex = currentMovies.get('currentIndex');
    const movie = currentMovies.getIn(['data', 'results']).get(currentIndex);

    return movie;
  }
);
