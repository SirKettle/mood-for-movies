import { combineReducers } from 'redux';
import { router5Reducer } from 'redux-router5';
import twitter from '../domains/twitter/twitterReducer';
import mood from '../domains/mood/moodReducer';
import { moviesReducer, configurationReducer } from '../domains/movies/moviesReducer';

const rootReducer = combineReducers({
  router: router5Reducer,
  twitter,
  mood,
  movies: moviesReducer,
  configuration: configurationReducer
});

export default rootReducer;
