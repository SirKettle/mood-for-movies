import Ramda from 'ramda';
import Immutable from 'immutable';
import { createSelector } from 'reselect';
import {
  moodsKeySelector,
  genreGroupsSelector,
  currentMediaSelector
} from '../mood/moodSelectors';
import loadingStates from '../../constants/loadingStates';

export const resultsModelSelector = state => state.results;
export const configurationModelSelector = state => state.resultConfig;

export const resultsSelector = createSelector(
  resultsModelSelector,
  model => model.get('server')
);

export const uiSelector = createSelector(
  resultsModelSelector,
  model => model.get('ui')
);

export const configurationSelector = createSelector(
  configurationModelSelector,
  model => model.get('data')
);

export const configurationLoadingSelector = createSelector(
  configurationModelSelector,
  model => model.get('loadingStatus')
);

export const removeDuplicateIds = Ramda.uniqBy(result => result && result.get('id'));

export const sortByVoteAverage = Ramda.sort((a, b) => {
  if (!a || !b) {
    return 0;
  }
  
  if (a.get('vote_average') < b.get('vote_average')) {
    return 1;
  }

  return -1;
});

export const sortUnique = list => Immutable.List(
  sortByVoteAverage(removeDuplicateIds(list.toArray()))
);

export const currentResultsSelector = createSelector(
  resultsSelector,
  moodsKeySelector,
  genreGroupsSelector,
  configurationSelector,
  currentMediaSelector,
  (results, moodsKey, genreGroups, configuration, currentMedia) => {
    if (!configuration || !results || !genreGroups || !moodsKey) {
      return null;
    }

    const resultGroups = genreGroups.map((genres) => {
      const genresKey = genres.sort().join('_');
      return results.getIn([currentMedia, genresKey, 'data', 'results']);
    });

    const concatList = Ramda.reduce((acc, next) => {
      return acc.concat(next);
    }, Immutable.List());

    const allResults = concatList(resultGroups);

    const getLoadingStatus = () => {
      const isLoaded = genreGroups.every((genres) => {
        const genresKey = genres.sort().join('_');
        return results.getIn([currentMedia, genresKey, 'loadingStatus']) === loadingStates.COMPLETE;
      });

      if (isLoaded) {
        return loadingStates.COMPLETE;
      }

      const isError = genreGroups.some((genres) => {
        const genresKey = genres.sort().join('_');
        return results.getIn([currentMedia, genresKey, 'loadingStatus']) === loadingStates.ERROR;
      });

      return isError ? loadingStates.ERROR : loadingStates.LOADING;
    };

    return Immutable.Map({
      results: sortUnique(allResults),
      loadingStatus: getLoadingStatus()
    });
  }
);

export const currentResultsLoadingStatusSelector = createSelector(
  currentResultsSelector,
  (currentResults) => {
    if (!currentResults) {
      return loadingStates.ERROR;
    }
    return currentResults.get('loadingStatus');
  }
);

export const currentResultPageInfoSelector = createSelector(
  uiSelector,
  currentResultsSelector,
  moodsKeySelector,
  (ui, currentResults, moodsKey) => {
    if (!currentResults || !moodsKey || !ui) {
      return null;
    }

    const results = currentResults.get('results');
    if (!results || !results.size) {
      return null;
    }

    const currentCounter = ui.getIn([moodsKey, 'currentIndex']);
    const currentIndex = currentCounter % results.size;

    return {
      index: currentIndex,
      display: currentIndex < 0 ? currentIndex + 1 + results.size : currentIndex + 1,
      total: results.size
    };
  }
);

export const currentResultSelector = createSelector(
  uiSelector,
  currentResultsSelector,
  moodsKeySelector,
  currentResultPageInfoSelector,
  (ui, currentResults, moodsKey, currentResultPageInfo) => {
    if (!currentResults || !moodsKey || !ui || !currentResultPageInfo) {
      return null;
    }

    const results = currentResults.get('results');
    if (!results || !results.size) {
      return null;
    }

    return results.get(currentResultPageInfo.index);
  }
);

export const nextResultSelector = createSelector(
  uiSelector,
  currentResultsSelector,
  moodsKeySelector,
  currentResultPageInfoSelector,
  (ui, currentResults, moodsKey, currentResultPageInfo) => {
    if (!currentResults || !moodsKey || !ui || !currentResultPageInfo) {
      return null;
    }

    const results = currentResults.get('results');
    if (!results || !results.size || results.size < 2) {
      return null;
    }
    const currentCounter = ui.getIn([moodsKey, 'currentIndex']);
    const nextIndex = (currentCounter + 1) % results.size;

    return results.get(nextIndex);
  }
);
