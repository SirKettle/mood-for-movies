import React from 'react';
import { connect } from 'react-redux';
import { routeNodeSelector } from 'redux-router5';
import CurrentMovie from './CurrentMovie/CurrentMovie';

function Home() {
  return (<CurrentMovie />);
}

export default connect(() => routeNodeSelector('home'))(Home);
