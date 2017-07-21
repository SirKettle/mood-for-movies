import { createStore, applyMiddleware } from 'redux';
// import { composeWithDevTools } from 'redux-devtools-extension';
import { router5Middleware } from 'redux-router5';
import rootReducer from '../reducers';

export default function configureStore(router, initialState = {}) {
  // Create store
  // const store = createStore(rootReducer, initialState, composeWithDevTools(
  //   applyMiddleware(
  //     router5Middleware(router)
  //   )
  // ));
  const store = createStore(rootReducer, initialState,
    applyMiddleware(
      router5Middleware(router)
    )
  );

  window.store = store;
  return store;
}
