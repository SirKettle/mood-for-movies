import React from 'react';
// import Post from './Post';
import { connect } from 'react-redux';
import { routeNodeSelector } from 'redux-router5';
import Blog from './Blog/Blog';

// function About(props) {
//   const { route } = props;
//   console.log(route);
  // { route.name === 'about.post' ?
  // <Post postId={ route.params.id } key={ route.params.id } /> : null }
function About() {
  return (
    <div className="about">
      About page
      <Blog />
    </div>
  );
}

export default connect(() => routeNodeSelector('about'))(About);
