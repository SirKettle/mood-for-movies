import 'whatwg-fetch';
import { buildUrlWithQueryParams } from '../../utils/api';

export const SERVICES = {
  NETFLIX: 'NETFLIX',
  ITUNES: 'ITUNES'
};

const FETCH_STATES = ['PENDING', 'SUCCESS', 'ERROR'];

export const actionTypes = {};
Object.keys(SERVICES).forEach((service) => {
  FETCH_STATES.forEach((fetchStatus) => {
    const actionType = `REQUEST_${service}_${fetchStatus}`;
    actionTypes[actionType] = actionType;
  });
});

const ENDPOINTS = {
  NETFLIX_TITLE: 'https://netflixroulette.net/api/api.php', // https://netflixroulette.net/api/api.php?title=The%20Boondocks&year=2005
  ITUNES_SEARCH: 'https://itunes.apple.com/search' // https://itunes.apple.com/search?term=inside+out&entity=movie
};

export const requestItunesAvailability = (dispatch, movie) => {
  dispatch({
    type: actionTypes.REQUEST_ITUNES_PENDING,
    payload: {
      movieId: movie.get('id')
    }
  });
  
  const url = buildUrlWithQueryParams(ENDPOINTS.ITUNES_SEARCH, {
    term: movie.get('title'),
    entity: 'movie',
    country: 'gb'
  });
  return fetch(url, {
    method: 'GET'
  })
  .then(response => response.json()
  .then((payload) => {
    if (payload.errorcode) {
      dispatch({
        type: actionTypes.REQUEST_ITUNES_ERROR,
        payload: {
          movieId: movie.get('id'),
          error: payload
        }
      });
      return;
    }
    dispatch({
      type: actionTypes.REQUEST_ITUNES_SUCCESS,
      payload: {
        movieId: movie.get('id'),
        data: payload
      }
    });
  }), (error) => {
    dispatch({
      type: actionTypes.REQUEST_ITUNES_ERROR,
      payload: {
        movieId: movie.get('id'),
        error
      }
    });
  });
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
