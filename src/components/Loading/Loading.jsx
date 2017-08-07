import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import styles from './Loading.css';
import loadingStates from '../../constants/loadingStates';
import typography from '../../css/typography.css';
import reelImage from '../../assets/images/loading/reel.png';
import lightImage from '../../assets/images/loading/light.png';
import cameraImage from '../../assets/images/loading/camera.png';

export default class Loading extends Component {
  
  state = {
    delayRender: true
  }

  componentWillReceiveProps(nextProps) {
    const { loadingStatus, loadingDelay } = this.props;

    if (nextProps.loadingStatus === loadingStates.LOADING &&
      loadingStatus !== loadingStates.LOADING) {
      this.setState({ delayRender: true });
    }

    if (loadingStatus !== loadingStates.COMPLETE &&
      nextProps.loadingStatus === loadingStates.COMPLETE) {
      window.setTimeout(() => {
        this.setState({ delayRender: false });
      }, loadingDelay);
    }
  }

  renderProjector = (loadingText) => {
    return (
      <div className={styles.imageContainer}>
        <img
          className={classnames(styles.reel, styles.reel1)}
          src={reelImage}
          alt="reel"
          width="70"
          height="70"
        />
        <img
          className={classnames(styles.reel, styles.reel2)}
          src={reelImage}
          alt="reel"
          width="70"
          height="70"
        />
        <img
          className={classnames(styles.light)}
          src={lightImage}
          alt="projector light"
          width="479"
          height="563"
        />
        <img
          className={classnames(styles.camera)}
          src={cameraImage}
          alt="projector camera"
          width="125"
          height="192"
        />
        {
          loadingText && (
            <p className={classnames(typography.will, styles.loadingText)}>{loadingText}</p>
          )
        }
      </div>
    );
  }

  render() {
    const { className, loadingStatus, loadingText, loadingErrorText, children } = this.props;

    if (loadingStatus === loadingStates.ERROR) {
      return (
        <div className={classnames(className, styles.loadingError)}>
          { this.renderProjector(loadingErrorText) }
        </div>
      );
    }

    if (loadingStatus === loadingStates.COMPLETE && !this.state.delayRender) {
      return children;
    }

    return (
      <div className={classnames(className, styles.loading)}>
        { this.renderProjector(loadingText) }
      </div>
    );
  }
}

Loading.propTypes = {
  className: PropTypes.string,
  loadingText: PropTypes.string,
  loadingErrorText: PropTypes.string,
  loadingStatus: PropTypes.string.isRequired,
  children: React.PropTypes.node.isRequired,
  loadingDelay: React.PropTypes.number
};

Loading.defaultProps = {
  className: 'loading-component',
  loadingDelay: 600,
  loadingText: null,
  loadingErrorText: 'Error'
};
