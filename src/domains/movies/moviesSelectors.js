import { createSelector } from 'reselect';

export const moviesModelSelector = state => state.movies;
export const configurationModelSelector = state => state.configuration;

export const moviesSelector = createSelector(
  moviesModelSelector,
  model => model.get('data')
);

export const configurationSelector = createSelector(
  configurationModelSelector,
  model => model.get('data')
);

export const moviesLoadingSelector = createSelector(
  moviesModelSelector,
  model => model.get('loading')
);

export const configurationLoadingSelector = createSelector(
  configurationModelSelector,
  model => model.get('loading')
);
