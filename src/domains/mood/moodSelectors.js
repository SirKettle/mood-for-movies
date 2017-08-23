import Ramda from 'ramda';
import { createSelector } from 'reselect';
import * as routerSelectors from '../router/routerSelectors';
import MOODS from '../../constants/moods';

export const modelSelector = (state) => {
  return state.mood;
};

export const moodsSelector = createSelector(
  modelSelector,
  model => model.get('moods').sort()
);

export const cartesianProduct = Ramda.reduce((acc, next) => {
  return acc.length
    ? Ramda.map(Ramda.unnest, Ramda.xprod(acc, next))
    : next;
}, []);

export const currentMoodsSelector = createSelector(
  routerSelectors.activeRouteSelector,
  activeRoute => (activeRoute.params.options || '')
    .split('-')
    .map(str => str.toUpperCase())
);

export const currentPersonIdSelector = createSelector(
  routerSelectors.activeRouteSelector,
  activeRoute => activeRoute.params.personId
);

export const genreGroupsSelector = createSelector(
  currentMoodsSelector,
  (moods) => {
    const genreGroups = moods
      .filter(moodId => !!MOODS[moodId])
      .map(moodId => MOODS[moodId].genres);

    if (genreGroups.length === 0) {
      return [];
    }

    if (genreGroups.length === 1) {
      return genreGroups[0].map(genre => [genre]);
    }

    return cartesianProduct(genreGroups);
  }
);

export const currentMediaSelector = createSelector(
  routerSelectors.activeRouteSelector,
  (activeRoute) => {
    console.log('activeRoute', activeRoute);
    return activeRoute.params.media || 'all';
  }
);

export const getMediaTitleLabel = media => (media === 'tv' ? 'name' : 'title');
export const getMediaReleaseDateLabel = media => (media === 'tv' ? 'first_air_date' : 'release_date');

export const isTvMediaSelector = createSelector(
  currentMediaSelector,
  currentMedia => currentMedia === 'tv'
);

export const isMoviesMediaSelector = createSelector(
  currentMediaSelector,
  currentMedia => currentMedia === 'movies'
);

export const moodForKeySelector = createSelector(
  currentMoodsSelector,
  currentPersonIdSelector,
  currentMediaSelector,
  (moods, personId, media) => {
    if (personId) {
      return `person-${media}-${personId}`;
    }
    return `${media}-${moods.join('_')}`;
  }
);
