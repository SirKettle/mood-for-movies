import Immutable from 'immutable';
import { actionTypes } from './moviesActions';
import loadingStates from '../../constants/loadingStates';

const moviesReducers = {
  [actionTypes.LOAD_MOVIES_PENDING]: (state, action) => {
    return state.setIn(['server', action.payload.genresKey, 'loadingState'], loadingStates.LOADING)
      .setIn(['ui', action.payload.moodsKey, 'currentIndex'], 0);
  },
  [actionTypes.LOAD_MOVIES_ERROR]: (state, action) => {
    return state.setIn(['server', action.payload.genresKey, 'loadingState'], loadingStates.ERROR);
  },
  [actionTypes.LOAD_MOVIES_SUCCESS]: (state, action) => {
    return state.setIn(['server', action.payload.genresKey, 'data'], Immutable.fromJS(action.payload.data))
      .setIn(['server', action.payload.genresKey, 'loadingState'], loadingStates.COMPLETE);
  },
  [actionTypes.REQUEST_NEXT_MOVIES]: (state, action) => {
    const currentIndex = state.getIn(['ui', action.payload.moodsKey, 'currentIndex']);
    return state.setIn(['ui', action.payload.moodsKey, 'currentIndex'], currentIndex + 1);
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
    ui: Immutable.Map({}),
    server: Immutable.Map({})
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
