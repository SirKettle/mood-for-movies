import React from 'react';
// import Post from './Post';
import { connect } from 'react-redux';
import { routeNodeSelector } from 'redux-router5';
// import Blog from './Blog/Blog';
import Movie from './Movie/Movie';

// function About(props) {
//   const { route } = props;
//   console.log(route);
  // { route.name === 'about.post' ?
  // <Post postId={ route.params.id } key={ route.params.id } /> : null }
function About() {
  const movieProps = {
    imgSrc: 'http://image.tmdb.org/t/p/w780/pTpxQB1N0waaSc3OSn0e9oc8kx9.jpg',
    overview: 'Eighties teenager Marty McFly is accidentally sent back in time to 1955, inadvertently disrupting his parents\' first meeting and attracting his mother\'s romantic interest. Marty must repair the damage…',
    title: 'Back to the Future'
  };
      // About page
      // <Blog />

  return (
    <div className="about">
      <Movie {...movieProps} />
    </div>
  );
}

export default connect(() => routeNodeSelector('about'))(About);
