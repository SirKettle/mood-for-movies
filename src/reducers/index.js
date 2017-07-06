import { combineReducers } from 'redux';
import { router5Reducer } from 'redux-router5';
import twitter from '../domains/twitter/twitterReducer';
import movies from '../domains/movies/moviesReducer';

const rootReducer = combineReducers({
  router: router5Reducer,
  twitter,
  movies
});

export default rootReducer;
