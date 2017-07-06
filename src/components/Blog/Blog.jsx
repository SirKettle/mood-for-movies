import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { loadTweets } from '../../domains/twitter/twitterActions';
import * as twitterSelectors from '../../domains/twitter/twitterSelectors';
import { loadMovies } from '../../domains/movies/moviesActions';
import * as moviesSelectors from '../../domains/movies/moviesSelectors';

// const mapStateToProps = (/*state, props*/) => {
const mapStateToProps = (state) => {
  return {
    tweets: twitterSelectors.tweetsSelector(state),
    movies: moviesSelectors.moviesSelector(state)
  };
};

const mapDispatchToProps = dispatch => ({
  loadTheTweets: () => { loadTweets(dispatch); },
  requestMovies: (args) => { loadMovies(dispatch, args); }
});

class Blog extends Component {

  static defaultProps = {
    tweets: null,
    movies: null
  }

  componentWillMount() {
    this.props.loadTheTweets();
    this.props.requestMovies({
      genres: []
    });
  }

  render() {
    const { tweets, movies } = this.props;

    if (!tweets) {
      return (<div>Loading tweets...</div>);
    }

    if (movies) {
      /* eslint-disable no-debugger */
      debugger;
    }

    return (
      <div className="blog">
        <h4>Have tweets!!!</h4>
        { tweets.map(tweet => (<div>{ tweet.get('text') }</div>)) }
      </div>
    );
  }
}

Blog.propTypes = {
  loadTheTweets: PropTypes.func.isRequired,
  requestMovies: PropTypes.func.isRequired,
  /* eslint react/forbid-prop-types: 0 */
  tweets: PropTypes.object,
  /* eslint react/forbid-prop-types: 0 */
  movies: PropTypes.object
};

export default connect(mapStateToProps, mapDispatchToProps)(Blog);
