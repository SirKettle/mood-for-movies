import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import Cookie from 'js.cookie';
import { routeNodeSelector } from 'redux-router5';
import { loadConfiguration } from '../domains/results/resultsActions';
import { requestIpInfo } from '../domains/config/configActions';
import * as settingsActions from '../domains/settings/settingsActions';
import cookies from '../constants/cookies';

import Home from './Routes/Home';
import About from './Routes/About';
import Results from './Routes/Results';
import SingleResult from './Routes/SingleResult';
import Search from './Routes/Search';
import Settings from './Routes/Settings';
import NotFound from './NotFound';

import '../css/reset.css';
import styles from './App.css';
import typography from '../css/typography.css';

const components = {
  __root__: Home,
  about: About,
  results: Results,
  person_results: Results,
  search: Search,
  settings: Settings,
  movies: SingleResult,
  tv: SingleResult
};

const mapStateToProps = () => routeNodeSelector('');

const mapDispatchToProps = dispatch => ({
  requestSort: (sortKey) => { dispatch(settingsActions.requestSort(sortKey)); },
  requestConfiguration: () => { loadConfiguration(dispatch); },
  requestIpInfoConfig: () => { requestIpInfo(dispatch); }
});

export class Main extends Component {

  componentWillMount() {
    this.props.requestConfiguration();
    this.props.requestIpInfoConfig();

    const sortKey = Cookie.get(cookies.SETTINGS_SORT_KEY);
    if (sortKey) {
      this.props.requestSort(sortKey);
    }
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
  requestIpInfoConfig: PropTypes.func.isRequired,
  requestSort: PropTypes.func.isRequired
};

export const Connected = connect(mapStateToProps, mapDispatchToProps)(Main);
