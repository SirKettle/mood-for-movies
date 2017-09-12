import Immutable from 'immutable';
import { actionTypes } from './settingsActions';

const reducers = {
  [actionTypes.REQUEST_SORT_BY]: (state, action) => {
    return state.set('sortKey', Immutable.fromJS(action.payload));
  }
};

const initialState = Immutable.Map({
  sortKey: null
});

export default function reducer(state = initialState, action) {
  const handler = reducers[action.type];
  return handler ? handler(state, action) : state;
}
