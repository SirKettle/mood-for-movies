import { createStore, applyMiddleware } from 'redux';
import { router5Middleware } from 'redux-router5';
import logger from 'redux-logger';
import rootReducer from '../reducers';

export default function configureStore(router, initialState = {}) {
  const createStoreWithMiddleware =
    applyMiddleware(router5Middleware(router), logger())(createStore);
  const store = createStoreWithMiddleware(rootReducer, initialState);

  // if (module.hot) {
  //   module.hot.accept('../reducers', () => {
  //     const nextRootReducer = require('../reducers/index.js'); /* eslint global-require: 0 */
  //     store.replaceReducer(nextRootReducer);
  //   });
  // }

  window.store = store;
  return store;
}
