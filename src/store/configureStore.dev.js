import { createStore, applyMiddleware } from 'redux';
import { router5Middleware } from 'redux-router5';
// import { persistState } from 'redux-devtools';
import reduxPromise from 'redux-promise';
import rootReducer from '../reducers';
import actionLogger from '../middlewares/actionLogger';
// import DevTools from '../containers/DevTools';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';

export default function configureStore(router, initialState) {

  const composeEnhancers = composeWithDevTools({
    // Specify here name, actionsBlacklist, actionsCreators and other options if needed
  });
  // const currentPath = initialState ? initialState.router.route.path : '/';
  const finalCreateStore = composeEnhancers(
    applyMiddleware(router5Middleware(router)),
    applyMiddleware(reduxPromise),
    applyMiddleware(actionLogger)
    // DevTools.instrument(),
    // persistState(currentPath.match(/[?&]debug_session=([^&]+)\b/))
  )(createStore);

  return finalCreateStore(rootReducer, initialState);
}
