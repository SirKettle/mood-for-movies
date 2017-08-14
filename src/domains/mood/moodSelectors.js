import Ramda from 'ramda';
import { createSelector } from 'reselect';
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

export const genreGroupsSelector = createSelector(
  moodsSelector,
  (moods) => {
    const genreGroups = moods.map(moodId => MOODS[moodId].genres);

    if (genreGroups.size === 1) {
      return genreGroups.toJS()[0].map(genre => [genre]);
    }

    return cartesianProduct(genreGroups);
  }
);

export const routerSelector = state => state.router;

export const activeRouteSelector = createSelector(
  routerSelector,
  router => router.route
);

export const currentMediaSelector = createSelector(
  activeRouteSelector,
  (activeRoute) => {
    console.log('activeRoute', activeRoute);
    return activeRoute.params.media || 'all';
  }
);

export const currentMoodsSelector = createSelector(
  activeRouteSelector,
  activeRoute => (activeRoute.params.options || '')
    .split('-')
    .map(str => str.toUpperCase())
);

export const moodsKeySelector = createSelector(
  currentMoodsSelector,
  currentMediaSelector,
  (moods, media) => `${media}-${moods.join('_')}`
);
