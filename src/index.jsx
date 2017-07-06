import React from 'react';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router5';
import ReactDOM from 'react-dom';
import App from './components/App';
import createRouter from './utils/createRouter';
import configureStore from './store/configureStore';

import routes from './routes';

const router = createRouter(routes);
const store = configureStore(router);
const wrappedApp = (
  <Provider store={store} >
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  </Provider>
);

router.start((err, state) => {
  console.log('router start', err, state);
  ReactDOM.render(wrappedApp, document.getElementById('app'));
});
