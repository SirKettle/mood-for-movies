import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import styles from './FacebookLike.css';

export default class FacebookLike extends Component {

  componentDidMount() {
    if (window.FB) {
      window.FB.XFBML.parse(this.comp);
    }
  }

  render() {
    const { className } = this.props;

    return (
      <div
        ref={(el) => { this.comp = el; }}
        className={classnames(className, styles.buttonWrapper)}
      >
        <div
          className="fb-like"
          data-href="http://choosymovie.tv/#/"
          data-layout="button_count"
          data-action="like"
          data-size="large"
          data-show-faces="true"
          data-share="true"
          data-colorscheme="dark"
        />
      </div>
    );
  }
}

FacebookLike.propTypes = {
  className: PropTypes.string
};

FacebookLike.defaultProps = {
  className: 'facebook-like-button'
};
