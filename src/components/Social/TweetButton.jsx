import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

export default class TweetButton extends Component {

  componentDidMount() {
    if (
      window.twttr &&
      window.twttr.widgets
    ) {
      window.twttr.widgets.load();
    }
  }

  getTweetPrePopulatedText = () => {
    const { title } = this.props;
    const text = `Choosy Movie just recommended me "${title}"`;
    // const text = 'Choosy Movie just recommended me a movie based on my mood!';
    return encodeURIComponent(text);
  }

  render() {
    const { className } = this.props;

    return (
      <div
        className={classnames(className)}
      >
        <a
          className="twitter-share-button"
          href={`https://twitter.com/intent/tweet?text=${this.getTweetPrePopulatedText()}`}
          data-size="large"
        >Tweet</a>
      </div>
    );
  }
}

TweetButton.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string
};

TweetButton.defaultProps = {
  className: 'tweet-button',
  title: 'a great movie'
};
