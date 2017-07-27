import { combineReducers } from 'redux';
import { router5Reducer } from 'redux-router5';
import twitter from '../domains/twitter/twitterReducer';
import mood from '../domains/mood/moodReducer';
import config from '../domains/config/configReducer';
import availability from '../domains/availability/availabilityReducer';
import { moviesReducer, configurationReducer } from '../domains/movies/moviesReducer';

const rootReducer = combineReducers({
  router: router5Reducer,
  twitter,
  config,
  availability,
  mood,
  movies: moviesReducer,
  movieConfig: configurationReducer
});

export default rootReducer;
