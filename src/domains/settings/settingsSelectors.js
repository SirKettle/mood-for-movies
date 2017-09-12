import { createSelector } from 'reselect';

export const settingsSelector = state => state.settings;

export const sortSelector = createSelector(
  settingsSelector,
  settings => settings.get('sortKey')
);

export const sortMap = {
  rating: {
    fetch: 'vote_average.desc',
    sortBy: 'vote_average',
    highToLow: true,
    label: 'Top rated'
  },
  popularity: {
    fetch: 'popularity.desc',
    sortBy: 'popularity',
    highToLow: true,
    label: 'Most popular'
  },
  revenue: {
    fetch: 'revenue.desc',
    sortBy: 'vote_count',
    highToLow: true,
    label: 'Highest revenue'
  },
  'rating-low': {
    fetch: 'vote_average.asc',
    sortBy: 'vote_average',
    highToLow: false,
    label: 'Lowest rated'
  },
  'popularity-low': {
    fetch: 'popularity.asc',
    sortBy: 'popularity',
    highToLow: false,
    label: 'Least popular'
  },
  'revenue-low': {
    fetch: 'revenue.asc',
    sortBy: 'vote_count',
    highToLow: false,
    label: 'Lowest revenue'
  }
};

export const sortOptions =
  Object.keys(sortMap)
  .map(sortKey => ({
    label: sortMap[sortKey].label,
    value: sortKey
  }))
  .concat({
    label: 'Random',
    value: null
  });
