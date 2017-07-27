import { combineReducers } from 'redux';
import { router5Reducer } from 'redux-router5';
import twitter from '../domains/twitter/twitterReducer';
import mood from '../domains/mood/moodReducer';
import availability, { ipInfoReducer as ipInfo } from '../domains/availability/availabilityReducer';
import { moviesReducer, configurationReducer } from '../domains/movies/moviesReducer';

const rootReducer = combineReducers({
  router: router5Reducer,
  twitter,
  ipInfo,
  availability,
  mood,
  movies: moviesReducer,
  configuration: configurationReducer
});

export default rootReducer;
