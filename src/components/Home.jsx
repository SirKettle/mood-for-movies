import React from 'react';
import { connect } from 'react-redux';
import { routeNodeSelector } from 'redux-router5';

function Home() {
  return (
    <div className="home">
      Home page goes here
    </div>
  );
}

export default connect(() => routeNodeSelector('home'))(Home);
