import React from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { routeNodeSelector } from 'redux-router5';
import Home from './Home';
import About from './About';
import Movie from './Movie';
// import MovieSuggestion from './MovieSuggestion';
import NotFound from './NotFound';

import styles from './App.css';
import typography from '../css/typography.css';

const components = {
  __root__: Home,
  // movie: MovieSuggestion,
  about: About,
  movie: Movie
};

function Main(props) {
  const { route } = props;
  const segment = route ? route.name.split('.')[0] : undefined;
  return (
    <div className={classnames(typography.elliot, styles.App)}>
      { React.createElement(components[segment] || NotFound) }
    </div>
  );
}

Main.propTypes = {
  /* eslint react/forbid-prop-types: 0 */
  route: React.PropTypes.object.isRequired
};

export default connect(() => routeNodeSelector(''))(Main);
