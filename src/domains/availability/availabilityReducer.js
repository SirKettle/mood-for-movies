import Immutable from 'immutable';
import { actionTypes, SERVICES } from './availabilityActions';
import loadingStates from '../../constants/loadingStates';

const setPending = (state, service, movieId) => {
  return state.setIn([movieId, service, 'loadingStatus'], loadingStates.LOADING);
};

const setError = (state, service, movieId) => {
  return state.setIn([movieId, service, 'loadingStatus'], loadingStates.ERROR);
};

const setSuccess = (state, service, movieId, data) => {
  return state.setIn([movieId, service, 'loadingStatus'], loadingStates.COMPLETE)
    .setIn([movieId, service, 'data'], data);
};

// TODO - dynamically generate this - see configReducer

const availabilityReducers = {
  [actionTypes.REQUEST_NETFLIX_PENDING]: (state, action) => {
    return setPending(state, SERVICES.NETFLIX, action.payload.movieId);
  },
  [actionTypes.REQUEST_NETFLIX_ERROR]: (state, action) => {
    return setError(state, SERVICES.NETFLIX, action.payload.movieId);
  },
  [actionTypes.REQUEST_NETFLIX_SUCCESS]: (state, action) => {
    // TODO: only store what we need - id?
    return setSuccess(state, SERVICES.NETFLIX, action.payload.movieId,
      Immutable.fromJS(action.payload.data));
  },
  [actionTypes.REQUEST_ITUNES_PENDING]: (state, action) => {
    return setPending(state, SERVICES.ITUNES, action.payload.movieId);
  },
  [actionTypes.REQUEST_ITUNES_ERROR]: (state, action) => {
    return setError(state, SERVICES.ITUNES, action.payload.movieId);
  },
  [actionTypes.REQUEST_ITUNES_SUCCESS]: (state, action) => {
    // TODO: only store what we need - id?
    return setSuccess(state, SERVICES.ITUNES, action.payload.movieId,
      Immutable.fromJS(action.payload.data));
  }
};

const initialState = Immutable.Map({});

export const availabilityReducer = (state = initialState, action) => {
  const handler = availabilityReducers[action.type];
  return handler ? handler(state, action) : state;
};

export default availabilityReducer;
