import { createSelector } from 'reselect';

export const searchSelector = state => state.search;

export const peopleSelector = createSelector(
  searchSelector,
  (search) => {
    if (!search) {
      return null;
    }

    return search.getIn(['people', 'data', 'results']);
  }
);
