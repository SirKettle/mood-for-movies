import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { router5Middleware } from 'redux-router5';
// import logger from 'redux-logger';
import rootReducer from '../reducers';

export default function configureStore(router, initialState = {}) {
  // Create store
  const store = createStore(rootReducer, initialState, composeWithDevTools(
    applyMiddleware(
      router5Middleware(router)
      // logger()
    )
    // other store enhancers if any
  ));

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers/index.js'); /* eslint global-require: 0 */
      store.replaceReducer(nextRootReducer);
    });
  }

  window.store = store;
  return store;
}
