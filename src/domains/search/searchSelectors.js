import { createSelector } from 'reselect';

export const searchSelector = state => state.search;

export const itemsSelector = createSelector(
  searchSelector,
  (search) => {
    if (!search) {
      return null;
    }

    return search.getIn(['items', 'data', 'results']);
  }
);
