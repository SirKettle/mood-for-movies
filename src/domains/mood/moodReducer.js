import Immutable from 'immutable';
import { actionTypes } from './moodActions';

const reducers = {
  [actionTypes.REQUEST_SET_MOOD]: (state, action) => {
    const { moodId, toggleOn } = action.payload;

    if (!moodId) {
      return state;
    }

    if (toggleOn) {
      const moods = state.get('moods').push(moodId);
      return state.set('moods', moods);
    }

    return state.set('moods', state.get('moods').filter(id => id !== moodId));
  }
};

const initialState = Immutable.fromJS({
  moods: []
});

export default function reducer(state = initialState, action) {
  const handler = reducers[action.type];
  return handler ? handler(state, action) : state;
}
