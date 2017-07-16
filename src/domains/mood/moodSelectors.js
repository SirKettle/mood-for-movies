import { createSelector } from 'reselect';
import MOODS from '../../constants/moods';

export const modelSelector = (state) => {
  return state.mood;
};

export const moodsSelector = createSelector(
  modelSelector,
  model => model.get('moods').sort()
);

export const genresSelector = createSelector(
  moodsSelector,
  (moods) => {
    const genres = [];
    moods.forEach((moodId) => {
      genres.push(MOODS[moodId].genres.join('|'));
    });
    return genres;
  }
);
