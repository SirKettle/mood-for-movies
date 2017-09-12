import { combineReducers } from 'redux';
import { router5Reducer } from 'redux-router5';
import twitter from '../domains/twitter/twitterReducer';
import mood from '../domains/mood/moodReducer';
import config from '../domains/config/configReducer';
import availability from '../domains/availability/availabilityReducer';
import credits from '../domains/credits/creditsReducer';
import search from '../domains/search/searchReducer';
import settings from '../domains/settings/settingsReducer';
import { resultsReducer, configurationReducer } from '../domains/results/resultsReducer';

const rootReducer = combineReducers({
  router: router5Reducer,
  twitter,
  config,
  mood,
  availability,
  credits,
  search,
  settings,
  results: resultsReducer,
  resultConfig: configurationReducer
});

export default rootReducer;
