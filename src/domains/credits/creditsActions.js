import 'whatwg-fetch';
import TMDb from '../../constants/tmdb';
import { buildUrlWithQueryParams } from '../../utils/api';
import * as moodSelectors from '../../domains/mood/moodSelectors';

export const actionTypes = {
  LOAD_CREDITS_PENDING: 'LOAD_CREDITS_PENDING',
  LOAD_CREDITS_SUCCESS: 'LOAD_CREDITS_SUCCESS',
  LOAD_CREDITS_ERROR: 'LOAD_CREDITS_ERROR'
};

const ENDPOINTS = {
  CREDITS_MOVIE: id => `${TMDb.BASE_URL}/movie/${id}/credits`, // /discover/movie?with_genres=35&&api_key=9b39e698383c30052915f7786495b569
  CREDITS_TV: id => `${TMDb.BASE_URL}/tv/${id}/credits` // /discover/tv?with_genres=35&&api_key=9b39e698383c30052915f7786495b569
};

export const loadCredits = result => (dispatch, getState) => {
  console.log('loadCredits', result.toJS());
  const currentMedia = moodSelectors.currentMediaSelector(getState());
  const isTv = moodSelectors.isTvMediaSelector(getState());
  const endpointFactory = isTv ? ENDPOINTS.CREDITS_TV : ENDPOINTS.CREDITS_MOVIE;
  const baseUrl = endpointFactory(result.get('id'));
  const url = buildUrlWithQueryParams(baseUrl, { api_key: TMDb.API_KEY });
  const basePayload = {
    currentMedia,
    id: result.get('id')
  };

  // set loading status to pending
  dispatch({
    type: actionTypes.LOAD_CREDITS_PENDING,
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
      type: actionTypes.LOAD_CREDITS_ERROR,
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
      type: actionTypes.LOAD_CREDITS_SUCCESS,
      payload: {
        ...basePayload,
        data: payload
      }
    });
  });
};
