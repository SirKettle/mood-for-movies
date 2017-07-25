import 'whatwg-fetch';
import { buildUrlWithQueryParams } from '../../utils/api';

export const actionTypes = {
  REQUEST_NETFLIX_PENDING: 'REQUEST_NETFLIX_PENDING',
  REQUEST_NETFLIX_SUCCESS: 'REQUEST_NETFLIX_SUCCESS',
  REQUEST_NETFLIX_ERROR: 'REQUEST_NETFLIX_ERROR'
};

const ENDPOINTS = {
  NETFLIX_TITLE: 'https://netflixroulette.net/api/api.php' // https://netflixroulette.net/api/api.php?title=The%20Boondocks&year=2005
};

export const requestNetflixAvailability = (dispatch, movie) => {
  dispatch({
    type: actionTypes.REQUEST_NETFLIX_PENDING,
    payload: {
      movieId: movie.get('id')
    }
  });
  
  const url = buildUrlWithQueryParams(ENDPOINTS.NETFLIX_TITLE, {
    title: movie.get('title'),
    year: movie.get('release_date').slice(0, 4)
  });
  return fetch(url, {
    method: 'GET'
  })
  .then(response => response.json()
  .then((payload) => {
    if (payload.errorcode) {
      dispatch({
        type: actionTypes.REQUEST_NETFLIX_ERROR,
        payload: {
          movieId: movie.get('id'),
          error: payload
        }
      });
      return;
    }
    dispatch({
      type: actionTypes.REQUEST_NETFLIX_SUCCESS,
      payload: {
        movieId: movie.get('id'),
        data: payload
      }
    });
  }), (error) => {
    dispatch({
      type: actionTypes.REQUEST_NETFLIX_ERROR,
      payload: {
        movieId: movie.get('id'),
        error
      }
    });
  });
};
