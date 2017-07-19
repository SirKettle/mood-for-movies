import { createSelector } from 'reselect';
import MOODS from '../../constants/moods';
import Ramda from 'ramda';

export const modelSelector = (state) => {
  return state.mood;
};

export const moodsSelector = createSelector(
  modelSelector,
  model => model.get('moods').sort()
);

export const moodsKeySelector = createSelector(
  moodsSelector,
  moods => moods.join('_')
);

const cartesianProduct = Ramda.reduce((acc, next) => {
  return acc.length
    ? Ramda.map(Ramda.unnest, Ramda.xprod(acc, next))
    : next;
}, []);

export const genresSelector = createSelector(
  moodsSelector,
  (moods) => {
    const genreGroups = moods.map(moodId => MOODS[moodId].genres);
    return cartesianProduct(genreGroups);
  }
);
