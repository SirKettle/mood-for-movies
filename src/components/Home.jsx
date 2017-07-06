import React from 'react';
import { connect } from 'react-redux';
import { routeNodeSelector } from 'redux-router5';
import DiscoverMovie from './DiscoverMovie/DiscoverMovie';

function Home() {
  return (
    <div className="home">
      Home page goes here
      <DiscoverMovie />
    </div>
  );
}

export default connect(() => routeNodeSelector('home'))(Home);
