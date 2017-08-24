import 'whatwg-fetch';
import TMDb from '../../constants/tmdb';
import { buildUrlWithQueryParams } from '../../utils/api';
import * as moodSelectors from '../../domains/mood/moodSelectors';

export const actionTypes = {
  LOAD_CONFIGURATION_PENDING: 'LOAD_CONFIGURATION_PENDING',
  LOAD_CONFIGURATION_SUCCESS: 'LOAD_CONFIGURATION_SUCCESS',
  LOAD_CONFIGURATION_ERROR: 'LOAD_CONFIGURATION_ERROR',
  LOAD_RESULTS_PENDING: 'LOAD_RESULTS_PENDING',
  LOAD_RESULTS_SUCCESS: 'LOAD_RESULTS_SUCCESS',
  LOAD_RESULTS_ERROR: 'LOAD_RESULTS_ERROR',
  REQUEST_NEXT_RESULT: 'REQUEST_NEXT_RESULT'
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

export const requestNextResult = args => (dispatch, getState) => {
  const moodForKey = moodSelectors.moodForKeySelector(getState());
  const currentMedia = moodSelectors.currentMediaSelector(getState());
  dispatch({
    type: actionTypes.REQUEST_NEXT_RESULT,
    payload: {
      moodForKey,
      currentMedia,
      previous: args.previous || false
    }
  });
};

export const baseDiscoverQueryParams = {
  page: 1,
  include_video: false,
  include_adult: false,
  sort_by: 'vote_average.desc',
  language: 'en-US',
  with_original_language: 'en',
  'vote_count.gte': 50,
  api_key: TMDb.API_KEY,
  'primary_release_date.gte': 1945 // 2014
};

export const baseDiscoverTvQueryParams = {
  page: 1,
  sort_by: 'popularity.desc',
  language: 'en-US',
  with_original_language: 'en',
  'vote_count.gte': 50,
  api_key: TMDb.API_KEY
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
    // console.log(error);
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

const fetchMovies = (dispatch, currentMedia, moodForKey, genres, personId) => {
  const queryParams = {
    ...baseDiscoverQueryParams,
    ...getMoodParams(genres, personId)
  };
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

  console.log('genreGroups', genreGroups);

  if (personId) {
    if (isTv) {
      fetchTvShows(dispatch, currentMedia, moodForKey, [], personId);
    } else {
      fetchMovies(dispatch, currentMedia, moodForKey, [], personId);
    }
    return;
  }
  
  genreGroups.forEach((genres) => {
    if (isTv) {
      fetchTvShows(dispatch, currentMedia, moodForKey, genres, personId);
    } else {
      fetchMovies(dispatch, currentMedia, moodForKey, genres, personId);
    }
  });
};
