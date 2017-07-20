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
  model => model.get('loading')
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

    // const movieSets =
    // Need to get all the movies for each genresKey
    // Need to combine the data, results - and sort by relevance
    // Need to combine the total_results - and sort by relevance
    // Need to combine the loading statuses

    return movies.get(moodsKey);
  }
);

export const currentMoviesLoadingStatusSelector = createSelector(
  currentMoviesSelector,
  (currentMovies) => {
    if (!currentMovies) {
      return loadingStates.LOADING;
    }

    return currentMovies.get('loadingState');
  }
);

export const currentMovieSelector = createSelector(
  uiSelector,
  currentMoviesSelector,
  moodsKeySelector,
  (ui, currentMovies, moodsKey) => {
    if (!currentMovies || !moodsKey || !ui) {
      return null;
    }

    const movies = currentMovies.getIn(['data', 'results']);
    if (!movies || !movies.size) {
      return null;
    }

    const currentIndex = ui.getIn([moodsKey, 'currentIndex']);
    const movie = movies.get(currentIndex % movies.size);

    return movie;
  }
);
