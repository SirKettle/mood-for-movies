import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import styles from './FacebookLike.css';

export default class FacebookLike extends Component {

  componentDidMount() {
    if (window.FB) {
      window.FB.XFBML.parse();
    }
  }

  render() {
    const { className, title } = this.props;
    console.log(title);

    return (
      <div
        ref={(el) => { this.comp = el; }}
        className={classnames(className, styles.buttonWrapper)}
      >
        <div
          className="fb-like"
          data-href="http://choosymovie.tv"
          data-layout="button_count"
          data-action="like"
          data-size="large"
          data-show-faces="true"
          data-share="true"
        />
      </div>
    );
  }
}

FacebookLike.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string
};

FacebookLike.defaultProps = {
  className: 'facebook-like-button',
  title: 'Choosy movie facebook like title'
};
