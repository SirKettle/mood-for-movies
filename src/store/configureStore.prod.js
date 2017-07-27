import { createStore, applyMiddleware } from 'redux';
// import { composeWithDevTools } from 'redux-devtools-extension';
import { router5Middleware } from 'redux-router5';
import rootStateInjector from './middleware/rootStateInjector';
import rootReducer from '../reducers';

export default function configureStore(router, initialState = {}) {
  const store = createStore(rootReducer, initialState,
    applyMiddleware(
      router5Middleware(router),
      rootStateInjector
    )
  );

  window.store = store;
  return store;
}
