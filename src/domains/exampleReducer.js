// import { actions } from './appConfigActions.js';
// import { fromJS } from 'immutable';
// import AppConfigRecord from 'core/records/config/appConfigRecord.js';
// import { pick } from 'ramda';

// const reducers = {
//  [actions.LOAD_APP_CONFIG_PENDING]: (state: AppConfigRecord, action) => {
//      return state.set('isLoaded', false);
//  },
//  [actions.LOAD_APP_CONFIG_SUCCESS]: (state: AppConfigRecord, action) => {
//      const allConfig = fromJS(pick(['scheduledMaintenance', 'sessionTimeoutConfig', 'documentRefreshFrequency', 'microsite', 'payment', 'externalUrlWhiteList'], action.payload));
//      return new AppConfigRecord(allConfig).set('isLoaded', true);
//  }
// };

// const initialState = new AppConfigRecord();

// export default function appConfigReducer (state: AppConfigRecord = initialState, action: Action<any> | EmptyAction): mixed {
//  const handler = reducers[action.type];
//  return handler ? handler(state, action) : state;
// }
