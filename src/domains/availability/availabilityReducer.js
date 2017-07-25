import Immutable from 'immutable';
import { actionTypes } from './availabilityActions';
import loadingStates from '../../constants/loadingStates';

const availabilityReducers = {
  [actionTypes.REQUEST_NETFLIX_PENDING]: (state, action) => {
    return state.setIn(['netflix', action.payload.movieId, 'loadingStatus'], loadingStates.LOADING);
  },
  [actionTypes.REQUEST_NETFLIX_ERROR]: (state, action) => {
    return state.setIn(['netflix', action.payload.movieId, 'loadingStatus'], loadingStates.ERROR);
  },
  [actionTypes.REQUEST_NETFLIX_SUCCESS]: (state, action) => {
    return state.setIn(['netflix', action.payload.movieId, 'data'], Immutable.fromJS(action.payload.data))
      .setIn(['netflix', action.payload.movieId, 'loadingStatus'], loadingStates.COMPLETE);
  }
};

const initialState = Immutable.Map({
  netflix: Immutable.Map({})
});

export const availabilityReducer = (state = initialState, action) => {
  const handler = availabilityReducers[action.type];
  return handler ? handler(state, action) : state;
};

export default availabilityReducer;
