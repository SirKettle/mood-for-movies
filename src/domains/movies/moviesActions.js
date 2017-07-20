import 'whatwg-fetch';
import { buildUrlWithQueryParams } from '../../utils/api';

export const actionTypes = {
  LOAD_CONFIGURATION_PENDING: 'LOAD_CONFIGURATION_PENDING',
  LOAD_CONFIGURATION_SUCCESS: 'LOAD_CONFIGURATION_SUCCESS',
  LOAD_CONFIGURATION_ERROR: 'LOAD_CONFIGURATION_ERROR',
  LOAD_MOVIES_PENDING: 'LOAD_MOVIES_PENDING',
  LOAD_MOVIES_SUCCESS: 'LOAD_MOVIES_SUCCESS',
  LOAD_MOVIES_ERROR: 'LOAD_MOVIES_ERROR',
  REQUEST_NEXT_MOVIES: 'REQUEST_NEXT_MOVIES'
};

const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = '9b39e698383c30052915f7786495b569';

const ENDPOINTS = {
  CONFIGURATION: '/configuration', // /configuration?api_key=<<api_key>>
  DISCOVER_MOVIES: '/discover/movie' // /discover/movie?with_genres=35&&api_key=9b39e698383c30052915f7786495b569
};

export const baseQueryParams = {
  page: 1,
  include_video: false,
  include_adult: false,
  sort_by: 'vote_average.desc', // TODO: sort by Vote average desc and use votecount gte 100
  language: 'en-US',
  with_original_language: 'en',
  'vote_count.gte': 200,
  api_key: API_KEY,
  'primary_release_date.gte': 1945 // 2014
};

export const loadConfiguration = (dispatch) => {
  dispatch({
    type: actionTypes.LOAD_CONFIGURATION_PENDING
  });
  
  const url = buildUrlWithQueryParams(`${BASE_URL}${ENDPOINTS.CONFIGURATION}`, { api_key: API_KEY });
  return fetch(url, {
    method: 'GET'
  }).then(response => response.json()
  , (error) => {
    dispatch({
      type: actionTypes.LOAD_CONFIGURATION_ERROR,
      error
    });
  }).then((payload) => {
    console.log(payload);
    dispatch({
      type: actionTypes.LOAD_CONFIGURATION_SUCCESS,
      payload
    });
  });
};

export const requestNextMovie = (dispatch, args) => {
  dispatch({
    type: actionTypes.REQUEST_NEXT_MOVIES,
    payload: {
      moodsKey: args.moodsKey
    }
  });
};

export const loadMovies = (dispatch, args) => {
  // Redirect user to movie page while it loads
  window.location.href = '/#/movie';
  
  args.genreGroups.forEach((genres) => {
    const genresKey = genres.sort().join('_');
    // set loading status to pending
    dispatch({
      type: actionTypes.LOAD_MOVIES_PENDING,
      payload: {
        moodsKey: args.moodsKey,
        genresKey
      }
    });

    const queryParams = {
      ...baseQueryParams,
      with_genres: genres.sort().join(',')
    };
    const url = buildUrlWithQueryParams(`${BASE_URL}${ENDPOINTS.DISCOVER_MOVIES}`, queryParams);

    return fetch(url, {
      method: 'GET'
    }).then(response => response.json()
    , (error) => {
      // console.log(error);
      dispatch({
        type: actionTypes.LOAD_MOVIES_ERROR,
        payload: {
          moodsKey: args.moodsKey,
          genresKey,
          error
        }
      });
    }).then((payload) => {
      if (!payload) {
        return;
      }
      dispatch({
        type: actionTypes.LOAD_MOVIES_SUCCESS,
        payload: {
          data: payload,
          moodsKey: args.moodsKey,
          genresKey
        }
      });
    });
  });
};
