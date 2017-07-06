import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { loadTweets } from '../../domains/twitter/twitterActions';
import * as twitterSelectors from '../../domains/twitter/twitterSelectors';

const mapStateToProps = (state) => {
  return {
    tweets: twitterSelectors.tweetsSelector(state)
  };
};

const mapDispatchToProps = dispatch => ({
  loadTheTweets: () => { loadTweets(dispatch); }
});

class Blog extends Component {

  static defaultProps = {
    tweets: null
  }

  componentWillMount() {
    this.props.loadTheTweets();
  }

  render() {
    const { tweets } = this.props;

    if (!tweets) {
      return (<div>Loading tweets...</div>);
    }

    return (
      <div className="blog">
        <h4>Have tweets!!!</h4>
        { tweets.map(tweet => (<div key={tweet.id_str}>{ tweet.get('text') }</div>)) }
      </div>
    );
  }
}

Blog.propTypes = {
  loadTheTweets: PropTypes.func.isRequired,
  /* eslint react/forbid-prop-types: 0 */
  tweets: PropTypes.object
};

export default connect(mapStateToProps, mapDispatchToProps)(Blog);
