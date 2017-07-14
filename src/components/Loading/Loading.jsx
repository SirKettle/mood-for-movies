import React, { PropTypes } from 'react';
import classnames from 'classnames';
import styles from './Loading.css';
import loadingStates from '../../constants/loadingStates';
// import typography from '../../css/typography.css';
import projectorImage from '../../assets/movie_reel.png';
import reelImage from '../../assets/reel.png';

const Loading = ({ loadingStatus, children }) => {
  if (loadingStatus === loadingStates.COMPLETE) {
    return children;
  }

  if (loadingStatus === loadingStates.ERROR) {
    return (
      <div className={classnames(className, styles.loadingError})>
        Error loading
      </div>
    );
  }

  return (
    <div className={classnames(className, styles.loading})>
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
        className={classnames(styles.projector)}
        src={projectorImage}
        alt="projector"
        width="596"
        height="563"
      />
    </div>
  );
};

Loading.propTypes = {
  className: PropTypes.string,
  loadingStatus: PropTypes.string.isRequired,
  children: React.propTypes.node.isRequired
};

Loading.defaultProps = {
  className: 'loading-component'
};

export default Loading;
