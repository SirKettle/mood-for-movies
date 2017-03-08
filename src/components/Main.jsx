import { createElement } from 'react';
import { connect } from 'react-redux';
import { routeNodeSelector } from 'redux-router5';
import Home from './Home';
import About from './About';
import NotFound from './NotFound';

const components = {
  home: Home,
  compose: About
};

function Main(props) {
  const { route } = props;
  const segment = route ? route.name.split('.')[0] : undefined;

  return createElement(components[segment] || NotFound);
}

export default connect(() => routeNodeSelector(''))(Main);
