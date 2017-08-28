import 'whatwg-fetch';
import TMDb from '../../constants/tmdb';
import { buildUrlWithQueryParams } from '../../utils/api';

export const actionTypes = {
  LOAD_SEARCH_PENDING: 'LOAD_SEARCH_PENDING',
  LOAD_SEARCH_SUCCESS: 'LOAD_SEARCH_SUCCESS',
  LOAD_SEARCH_ERROR: 'LOAD_SEARCH_ERROR'
};

const ENDPOINTS = {
  SEARCH_PERSON: `${TMDb.BASE_URL}/search/person` // /search/person?api_key=9b39e698383c30052915f7786495b569&language=en-US&query=tom&page=1&include_adult=false
};

export const searchPeople = query => (dispatch) => {
  const url = buildUrlWithQueryParams(
    ENDPOINTS.SEARCH_PERSON, {
      api_key: TMDb.API_KEY,
      query
    }
  );
  const basePayload = {
    query
  };

  // set loading status to pending
  dispatch({
    type: actionTypes.LOAD_SEARCH_PENDING,
    payload: {
      ...basePayload
    }
  });

  return fetch(url, {
    method: 'GET'
  }).then(response => response.json()
  , (error) => {
    dispatch({
      type: actionTypes.LOAD_SEARCH_ERROR,
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
      type: actionTypes.LOAD_SEARCH_SUCCESS,
      payload: {
        ...basePayload,
        data: payload
      }
    });
  });
};
