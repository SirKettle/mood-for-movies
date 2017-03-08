import React from 'react';
import { connect } from 'react-redux';
import { routeNodeSelector } from 'redux-router5';
import Blog from './Blog/Blog';

function Home() {
  return (
    <div className="home">
      Home page goes here
      <Blog />
    </div>
  );
}

export default connect(() => routeNodeSelector('home'))(Home);
