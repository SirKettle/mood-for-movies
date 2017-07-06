import Immutable from 'immutable';
import { actionTypes } from './moviesActions';
import loadingStates from '../../constants/loadingStates';

const moviesReducers = {
  [actionTypes.LOAD_MOVIES_PENDING]: (state) => {
    return state.set('loadingState', loadingStates.LOADING);
  },
  [actionTypes.LOAD_MOVIES_SUCCESS]: (state, action) => {
    return state.set('data', Immutable.fromJS(action.payload)).set('loadingState', loadingStates.COMPLETE);
  }
};

const configurationReducers = {
  [actionTypes.LOAD_CONFIGURATION_PENDING]: (state) => {
    return state.set('loadingState', loadingStates.LOADING);
  },
  [actionTypes.LOAD_CONFIGURATION_SUCCESS]: (state, action) => {
    return state.set('data', Immutable.fromJS(action.payload)).set('loadingState', loadingStates.COMPLETE);
  }
};

const initialStates = {
  movies: Immutable.Map({
    data: null,
    loadingState: loadingStates.NOT_STARTED
  }),
  configuration: Immutable.Map({
    data: null,
    loadingState: loadingStates.NOT_STARTED
  })
};

export const moviesReducer = (state = initialStates.movies, action) => {
  const handler = moviesReducers[action.type];
  return handler ? handler(state, action) : state;
};

export const configurationReducer = (state = initialStates.configuration, action) => {
  const handler = configurationReducers[action.type];
  return handler ? handler(state, action) : state;
};

export default {
  moviesReducer,
  configurationReducer
};
