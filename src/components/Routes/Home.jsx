import React from 'react';
import { connect } from 'react-redux';
import { routeNodeSelector } from 'redux-router5';
import { Connected as DiscoverMovie } from '../../containers/DiscoverMovie/DiscoverMovie';

function Home() {
  return (<DiscoverMovie />);
}

export default connect(() => routeNodeSelector(''))(Home);
