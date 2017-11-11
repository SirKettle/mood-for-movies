import Immutable from 'immutable';
import { actionTypes } from './searchActions';
import loadingStates from '../../constants/loadingStates';

const searchReducers = {
  [actionTypes.LOAD_SEARCH_PENDING]: (state) => {
    return state.setIn(['items', 'loadingStatus'], loadingStates.LOADING);
  },
  [actionTypes.LOAD_SEARCH_ERROR]: (state) => {
    return state.setIn(['items', 'loadingStatus'], loadingStates.ERROR);
  },
  [actionTypes.LOAD_SEARCH_SUCCESS]: (state, action) => {
    const { data } = action.payload;
    return state.setIn(['items', 'data'], Immutable.fromJS(data))
      .setIn(['items', 'loadingStatus'], loadingStates.COMPLETE);
  }
};

const initialState = Immutable.fromJS({
  items: {}
});

export default (state = initialState, action) => {
  const handler = searchReducers[action.type];
  return handler ? handler(state, action) : state;
};
