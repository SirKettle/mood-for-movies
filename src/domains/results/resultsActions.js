import 'whatwg-fetch';
import { actions as routerActions } from 'redux-router5';
import TMDb from '../../constants/tmdb';
import { buildUrlWithQueryParams } from '../../utils/api';
import * as moodSelectors from '../../domains/mood/moodSelectors';
import * as resultsSelectors from '../../domains/results/resultsSelectors';
import * as routerSelectors from '../../domains/router/routerSelectors';

export const actionTypes = {
  LOAD_CONFIGURATION_PENDING: 'LOAD_CONFIGURATION_PENDING',
  LOAD_CONFIGURATION_SUCCESS: 'LOAD_CONFIGURATION_SUCCESS',
  LOAD_CONFIGURATION_ERROR: 'LOAD_CONFIGURATION_ERROR',
  LOAD_RESULTS_PENDING: 'LOAD_RESULTS_PENDING',
  LOAD_RESULTS_SUCCESS: 'LOAD_RESULTS_SUCCESS',
  LOAD_RESULTS_ERROR: 'LOAD_RESULTS_ERROR'
};

const ENDPOINTS = {
  CONFIGURATION: `${TMDb.BASE_URL}/configuration`, // /configuration?api_key=<<api_key>>
  DISCOVER_MOVIES: `${TMDb.BASE_URL}/discover/movie`, // /discover/movie?with_genres=35&&api_key=9b39e698383c30052915f7786495b569
  DISCOVER_TV: `${TMDb.BASE_URL}/discover/tv` // /discover/tv?with_genres=35&&api_key=9b39e698383c30052915f7786495b569
};

export const loadConfiguration = (dispatch) => {
  dispatch({
    type: actionTypes.LOAD_CONFIGURATION_PENDING
  });
  
  const url = buildUrlWithQueryParams(ENDPOINTS.CONFIGURATION, { api_key: TMDb.API_KEY });
  return fetch(url, {
    method: 'GET'
  }).then(response => response.json()
  , (error) => {
    dispatch({
      type: actionTypes.LOAD_CONFIGURATION_ERROR,
      error
    });
  }).then((payload) => {
    dispatch({
      type: actionTypes.LOAD_CONFIGURATION_SUCCESS,
      payload
    });
  });
};

const getNextIndex = (currentIndex, total) => {
  return (currentIndex + 1) % total;
};

const getPreviousIndex = (currentIndex, total) => {
  return (currentIndex === 0 ? total : currentIndex) - 1;
};

const getNextPageIndex = (isPrevious, currentIndex, total) => {
  const nextFunc = isPrevious ? getPreviousIndex : getNextIndex;
  return nextFunc(currentIndex, total);
};

export const requestNextResult = args => (dispatch, getState) => {
  const currentResultPageInfo = resultsSelectors.currentResultPageInfoSelector(getState());
  const activeRoute = routerSelectors.activeRouteSelector(getState());
  const isPrevious = args.previous || false;
  const nextPageIndex = getNextPageIndex(
    isPrevious,
    currentResultPageInfo.index,
    currentResultPageInfo.total
  );
  const nextPageNumber = nextPageIndex + 1;

  dispatch(
    routerActions.navigateTo(
      activeRoute.name,
      {
        ...activeRoute.params,
        page: nextPageNumber
      },
      {
        replace: true
      }
    )
  );
};

const SORT_BY = {
  VOTE_AVERAGE: 'vote_average.desc',
  POPULARITY: 'popularity.desc',
  REVENUE: 'revenue.desc'
};

const MIN_VOTES = 21;

const getRandomSortBy = () => {
  const values = Object.values(SORT_BY);
  const index = Math.floor(Math.random() * values.length);
  return values[index];
};

export const baseDiscoverQueryParams = {
  page: 1,
  include_video: false,
  include_adult: false,
  sort_by: SORT_BY.VOTE_AVERAGE,
  language: 'en-US',
  'vote_count.gte': MIN_VOTES,
  api_key: TMDb.API_KEY,
  'primary_release_date.gte': 1945 // 2014
};

export const baseDiscoverTvQueryParams = {
  page: 1,
  sort_by: SORT_BY.POPULARITY,
  language: 'en-US',
  with_original_language: 'en',
  'vote_count.gte': MIN_VOTES,
  api_key: TMDb.API_KEY
};

const getMovieLanguageParams = (allLanguages) => {
  const languageParams = {};

  if (!allLanguages) {
    languageParams.with_original_language = 'en';
  }
  return languageParams;
};

const fetchResults = (dispatch, basePayload, url) => {
  // set loading status to pending
  dispatch({
    type: actionTypes.LOAD_RESULTS_PENDING,
    payload: {
      ...basePayload
    }
  });

  return fetch(url, {
    method: 'GET'
  }).then(response => response.json()
  , (error) => {
    dispatch({
      type: actionTypes.LOAD_RESULTS_ERROR,
      payload: {
        ...basePayload,
        error
      }
    });
  }).then((payload) => {
    if (!payload) {
      return;
    }
    dispatch({
      type: actionTypes.LOAD_RESULTS_SUCCESS,
      payload: {
        ...basePayload,
        data: payload
      }
    });
  });
};

const getMoodParams = (genres, personId) => {
  const moodParams = {};
  if (personId) {
    moodParams.with_people = personId;
  } else {
    moodParams.with_genres = genres.sort().join(',');
  }
  return moodParams;
};

const fetchTvShows = (dispatch, currentMedia, moodForKey, genres, personId) => {
  const queryParams = {
    ...baseDiscoverTvQueryParams,
    ...getMoodParams(genres, personId)
  };
  const url = buildUrlWithQueryParams(ENDPOINTS.DISCOVER_TV, queryParams);
  
  const genresKey = genres.sort().join('_');
  const basePayload = {
    moodForKey,
    currentMedia,
    genresKey,
    personId
  };

  return fetchResults(dispatch, basePayload, url);
};

const fetchMovies = (
  dispatch, currentMedia, moodForKey,
  genres, personId,
  allLanguages = false, randomSort = false
) => {
  const queryParams = {
    ...baseDiscoverQueryParams,
    ...getMovieLanguageParams(allLanguages),
    ...getMoodParams(genres, personId)
  };

  if (randomSort) {
    queryParams.sort_by = getRandomSortBy();
  }

  const url = buildUrlWithQueryParams(ENDPOINTS.DISCOVER_MOVIES, queryParams);

  const genresKey = genres.sort().join('_');
  const basePayload = {
    moodForKey,
    currentMedia,
    genresKey,
    personId
  };

  return fetchResults(dispatch, basePayload, url);
};

export const loadResults = () => (dispatch, getState) => {
  const genreGroups = moodSelectors.genreGroupsSelector(getState());
  const moodForKey = moodSelectors.moodForKeySelector(getState());
  const currentMedia = moodSelectors.currentMediaSelector(getState());
  const isTv = moodSelectors.isTvMediaSelector(getState());
  const personId = moodSelectors.currentPersonIdSelector(getState());

  const allLanguages = !!personId;
  const randomSort = !personId;

  if (personId) {
    if (isTv) {
      fetchTvShows(dispatch, currentMedia, moodForKey, [], personId);
    } else {
      fetchMovies(dispatch, currentMedia, moodForKey, [], personId, allLanguages, randomSort);
    }
    return;
  }
  
  genreGroups.forEach((genres) => {
    if (isTv) {
      fetchTvShows(dispatch, currentMedia, moodForKey, genres, personId);
    } else {
      fetchMovies(dispatch, currentMedia, moodForKey, genres, personId, allLanguages, randomSort);
    }
  });
};
