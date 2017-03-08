import Immutable from 'immutable';
import { actionTypes } from './twitterActions';

const reducers = {
  [actionTypes.LOAD_TWEETS_PENDING]: (state) => {
    return state.set('isLoaded', false);
  },
  [actionTypes.LOAD_TWEETS_SUCCESS]: (state, action) => {
    return state.set('data', Immutable.fromJS(action.payload)).set('isLoaded', true);
  }
};

const initialState = Immutable.Map({
  data: null
});

export default function reducer(state = initialState, action) {
  const handler = reducers[action.type];
  return handler ? handler(state, action) : state;
}
