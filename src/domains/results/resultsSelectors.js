import Ramda from 'ramda';
import Immutable from 'immutable';
import { createSelector } from 'reselect';
import * as routerSelectors from '../router/routerSelectors';
import * as settingsSelectors from '../settings/settingsSelectors';

import {
  moodForKeySelector,
  genreGroupsSelector,
  currentPersonIdSelector,
  currentMediaSelector
} from '../mood/moodSelectors';
import loadingStates from '../../constants/loadingStates';

export const resultsModelSelector = state => state.results;
export const configurationModelSelector = state => state.resultConfig;

export const resultsSelector = createSelector(
  resultsModelSelector,
  model => model.get('server')
);

export const configurationSelector = createSelector(
  configurationModelSelector,
  model => model.get('data')
);

export const imagesBaseUrlSelector = createSelector(
  configurationSelector,
  (configuration) => {
    if (!configuration) {
      return null;
    }
    return configuration.getIn(['images', 'base_url']);
  }
);

export const profileImagesBaseUrlSelector = createSelector(
  imagesBaseUrlSelector,
  (baseUrl) => {
    if (!baseUrl) {
      return null;
    }
    return `${baseUrl}w185`;
  }
);

export const movieImagesBaseUrlSelector = createSelector(
  imagesBaseUrlSelector,
  (baseUrl) => {
    if (!baseUrl) {
      return null;
    }
    return `${baseUrl}w780`;
  }
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

export const removeDuplicates = list => Immutable.List(
  removeDuplicateIds(list.toArray())
);

export const resultsSortSelector = createSelector(
  settingsSelectors.sortSelector,
  sortKey => settingsSelectors.sortMap[sortKey]
);

const sortFunc = (sortBy, highToLow) => (a, b) => {
  if (!a || !b) {
    return 0;
  }
  
  if (a.get(sortBy) < b.get(sortBy)) {
    return highToLow ? 1 : -1;
  }

  return highToLow ? -1 : 1;
};

const sortListBy = (sortBy, highToLow) => Ramda.sort(sortFunc(sortBy, highToLow));

const sortList = (list, sortBy, highToLow) => {
  console.log('sortList', sortBy, highToLow);
  if (!sortBy) {
    return list;
  }
  return Immutable.List(sortListBy(sortBy, highToLow)(list.toArray()));
};

export const currentResultsSelector = createSelector(
  resultsSelector,
  moodForKeySelector,
  currentPersonIdSelector,
  genreGroupsSelector,
  configurationSelector,
  currentMediaSelector,
  resultsSortSelector,
  (
    results, moodForKey, currentPersonId,
    genreGroups, configuration, currentMedia,
    resultsSort
  ) => {
    if (!configuration || !results || !genreGroups || !moodForKey) {
      return null;
    }

    const sortByParam = resultsSort ? resultsSort.sortBy : null;
    const highToLowParam = resultsSort ? resultsSort.highToLow : null;

    if (currentPersonId) {
      return Immutable.Map({
        results: sortList(
          results.getIn([currentMedia, moodForKey, 'data', 'results']),
          sortByParam,
          highToLowParam
        ),
        loadingStatus: results.getIn([currentMedia, moodForKey, 'loadingStatus'])
      });
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
      results: sortList(
        removeDuplicates(allResults),
        sortByParam,
        highToLowParam
      ),
      loadingStatus: getLoadingStatus()
    });
  }
);

export const currentResultsPageNumberSelector = createSelector(
  routerSelectors.activeRouteSelector,
  (activeRoute) => {
    if (!activeRoute.params.page) {
      return 1;
    }
    return Number(activeRoute.params.page);
  }
);

export const currentResultsLoadingStatusSelector = createSelector(
  currentResultsSelector,
  (currentResults) => {
    if (!currentResults) {
      return loadingStates.ERROR;
    }
    return currentResults.get('loadingStatus') || loadingStates.LOADING;
  }
);

export const currentResultPageInfoSelector = createSelector(
  currentResultsSelector,
  currentResultsPageNumberSelector,
  (currentResults, currentResultsPageNumber) => {
    if (!currentResults) {
      return null;
    }

    const results = currentResults.get('results');
    if (!results || !results.size) {
      return null;
    }
    
    return {
      index: currentResultsPageNumber - 1,
      display: currentResultsPageNumber,
      total: results.size
    };
  }
);

export const currentResultSelector = createSelector(
  currentResultsSelector,
  moodForKeySelector,
  currentResultPageInfoSelector,
  (currentResults, moodForKey, currentResultPageInfo) => {
    if (!currentResults || !moodForKey || !currentResultPageInfo) {
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
  currentResultsSelector,
  currentResultPageInfoSelector,
  (currentResults, currentResultPageInfo) => {
    if (!currentResults || !currentResultPageInfo) {
      return null;
    }

    const results = currentResults.get('results');
    if (!results || !results.size || results.size < 2) {
      return null;
    }
    
    const nextIndex = (currentResultPageInfo.index + 1) % results.size;

    return results.get(nextIndex);
  }
);

export const previousResultSelector = createSelector(
  currentResultsSelector,
  currentResultPageInfoSelector,
  (currentResults, currentResultPageInfo) => {
    if (!currentResults || !currentResultPageInfo) {
      return null;
    }

    const results = currentResults.get('results');
    if (!results || !results.size || results.size < 2) {
      return null;
    }
    
    const nextIndex = (currentResultPageInfo.index - 1) % results.size;

    return results.get(nextIndex);
  }
);
