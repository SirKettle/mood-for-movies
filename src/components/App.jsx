import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { routeNodeSelector } from 'redux-router5';
import { loadConfiguration } from '../domains/results/resultsActions';
import { requestIpInfo } from '../domains/config/configActions';

import Home from './Routes/Home';
import About from './Routes/About';
// import Movie from './Routes/Movie';
import Results from './Routes/Results';
import NotFound from './NotFound';

import '../css/reset.css';
import styles from './App.css';
import typography from '../css/typography.css';

const components = {
  __root__: Home,
  // movie: MovieSuggestion,
  about: About,
  // movie: Movie,
  results: Results
};

const mapStateToProps = () => routeNodeSelector('');

const mapDispatchToProps = dispatch => ({
  requestConfiguration: () => { loadConfiguration(dispatch); },
  requestIpInfoConfig: () => { requestIpInfo(dispatch); }
});

export class Main extends Component {

  componentWillMount() {
    this.props.requestConfiguration();
    this.props.requestIpInfoConfig();
  }

  render() {
    const { route } = this.props;
    const segment = route ? route.name.split('.')[0] : undefined;
    if (!components[segment]) {
      window.location.href = '/#/';
    }

    return (
      <div className={classnames(typography.elliot, styles.App)}>
        { React.createElement(components[segment] || NotFound) }
      </div>
    );
  }
}

Main.propTypes = {
  /* eslint react/forbid-prop-types: 0 */
  route: PropTypes.object.isRequired,
  requestConfiguration: PropTypes.func.isRequired,
  requestIpInfoConfig: PropTypes.func.isRequired
};

export const Connected = connect(mapStateToProps, mapDispatchToProps)(Main);
