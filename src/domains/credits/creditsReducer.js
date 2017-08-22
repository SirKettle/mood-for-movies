import Immutable from 'immutable';
import { actionTypes } from './creditsActions';
import loadingStates from '../../constants/loadingStates';

const creditsReducers = {
  [actionTypes.LOAD_CREDITS_PENDING]: (state, action) => {
    const { currentMedia, id } = action.payload;
    return state.setIn([currentMedia, id, 'loadingStatus'], loadingStates.LOADING);
  },
  [actionTypes.LOAD_CREDITS_ERROR]: (state, action) => {
    const { currentMedia, id } = action.payload;
    return state.setIn([currentMedia, id, 'loadingStatus'], loadingStates.ERROR);
  },
  [actionTypes.LOAD_CREDITS_SUCCESS]: (state, action) => {
    const { currentMedia, data, id } = action.payload;
    return state.setIn([currentMedia, id, 'data'], Immutable.fromJS(data))
      .setIn([currentMedia, id, 'loadingStatus'], loadingStates.COMPLETE);
  }
};

const initialState = Immutable.fromJS({
  tv: {},
  movies: {}
});

export default (state = initialState, action) => {
  const handler = creditsReducers[action.type];
  return handler ? handler(state, action) : state;
};
