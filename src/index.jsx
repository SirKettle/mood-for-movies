import React from 'react';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router5';
import ReactDOM from 'react-dom';
import App from './components/App';
import createRouter from './utils/createRouter';
import configureStore from './store/configureStore';

const routes = [
  { name: 'home', path: '/home' },
  { name: 'about', path: '/about' }
];

const router = createRouter(routes);
const store = configureStore(router);
const wrappedApp = (
  <Provider store={store} >
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  </Provider>
);

// router.start((err, state) => {
router.start(() => {
  ReactDOM.render(wrappedApp, document.getElementById('app'));
});


// import React from 'react';
// import ReactDOM from 'react-dom';
// import { browserHistory } from 'react-router';
// import { syncHistoryWithStore } from 'react-router-redux';
// import { AppContainer } from 'react-hot-loader';  eslint import/no-extraneous-dependencies: 0

// import Root from './components/Root/Root';
// import configureStore from './store/configureStore';

// const rootEl = document.getElementById('app');

// const store = configureStore();
// const reduxHistory = syncHistoryWithStore(browserHistory, store);

// ReactDOM.render(
//   <AppContainer>
//     <Root store={store} history={reduxHistory} />
//   </AppContainer>,
//   rootEl,
// );

// // Hot Module Replacement API
// if (module.hot) {
//   module.hot.accept('./components/Root/Root', () => {
//     const NextApp = require('./components/Root/Root').default; // eslint-disable-line
//     ReactDOM.render(
//       <AppContainer>
//         <NextApp store={store} history={reduxHistory} />
//       </AppContainer>,
//       rootEl,
//     );
//   });
// }
