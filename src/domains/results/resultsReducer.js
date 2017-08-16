import Immutable from 'immutable';
import { actionTypes } from './resultsActions';
import loadingStates from '../../constants/loadingStates';

const resultsReducers = {
  [actionTypes.LOAD_RESULTS_PENDING]: (state, action) => {
    const { currentMedia, genresKey, moodsKey } = action.payload;
    return state.setIn(['server', currentMedia, genresKey, 'loadingStatus'], loadingStates.LOADING)
      .setIn(['ui', moodsKey, 'currentIndex'], 0);
  },
  [actionTypes.LOAD_RESULTS_ERROR]: (state, action) => {
    const { currentMedia, genresKey } = action.payload;
    return state.setIn(['server', currentMedia, genresKey, 'loadingStatus'], loadingStates.ERROR);
  },
  [actionTypes.LOAD_RESULTS_SUCCESS]: (state, action) => {
    const { currentMedia, data, genresKey } = action.payload;
    return state.setIn(['server', currentMedia, genresKey, 'data'], Immutable.fromJS(data))
      .setIn(['server', currentMedia, genresKey, 'loadingStatus'], loadingStates.COMPLETE);
  },
  [actionTypes.REQUEST_NEXT_RESULT]: (state, action) => {
    const { moodsKey, previous } = action.payload;
    const currentIndex = state.getIn(['ui', moodsKey, 'currentIndex']);
    const nextIndex = previous ? currentIndex - 1 : currentIndex + 1;
    return state.setIn(['ui', moodsKey, 'currentIndex'], nextIndex);
  }
};

const configurationReducers = {
  [actionTypes.LOAD_CONFIGURATION_PENDING]: (state) => {
    return state.set('loadingStatus', loadingStates.LOADING);
  },
  [actionTypes.LOAD_CONFIGURATION_SUCCESS]: (state, action) => {
    return state.set('data', Immutable.fromJS(action.payload)).set('loadingStatus', loadingStates.COMPLETE);
  }
};

const initialStates = {
  results: Immutable.Map({
    ui: Immutable.Map({}),
    server: Immutable.Map({})
  }),
  configuration: Immutable.Map({
    data: null,
    loadingStatus: loadingStates.NOT_STARTED
  })
};

export const resultsReducer = (state = initialStates.results, action) => {
  const handler = resultsReducers[action.type];
  return handler ? handler(state, action) : state;
};

export const configurationReducer = (state = initialStates.configuration, action) => {
  const handler = configurationReducers[action.type];
  return handler ? handler(state, action) : state;
};

export default {
  resultsReducer,
  configurationReducer
};
