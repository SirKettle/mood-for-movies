import Immutable from 'immutable';
import { actionTypes } from './searchActions';
import loadingStates from '../../constants/loadingStates';

const searchReducers = {
  [actionTypes.LOAD_SEARCH_PENDING]: (state) => {
    return state.setIn(['people', 'loadingStatus'], loadingStates.LOADING);
  },
  [actionTypes.LOAD_SEARCH_ERROR]: (state) => {
    return state.setIn(['people', 'loadingStatus'], loadingStates.ERROR);
  },
  [actionTypes.LOAD_SEARCH_SUCCESS]: (state, action) => {
    const { data } = action.payload;
    return state.setIn(['people', 'data'], Immutable.fromJS(data))
      .setIn(['people', 'loadingStatus'], loadingStates.COMPLETE);
  }
};

const initialState = Immutable.fromJS({
  people: {}
});

export default (state = initialState, action) => {
  const handler = searchReducers[action.type];
  return handler ? handler(state, action) : state;
};
