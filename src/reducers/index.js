import { combineReducers } from 'redux';
import { router5Reducer } from 'redux-router5';
import twitter from '../domains/twitter/twitterReducer';

const rootReducer = combineReducers({
  router: router5Reducer,
  twitter
});

export default rootReducer;
