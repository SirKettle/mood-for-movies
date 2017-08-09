import React, { PropTypes } from 'react';
import classnames from 'classnames';
import styles from './NetflixButton.css';
import netflixButtonImage from '../../assets/images/netflix-red.png';

export const getNetflixMovieUrl = id => `https://www.netflix.com/watch/${id}`;

const NetflixButton = ({
  track,
  className,
  netflixMovie
}) => {
  const watchUrl = getNetflixMovieUrl(netflixMovie.get('show_id'));

  const handleClick = () => {
    track('watch-on-netflix-button', watchUrl);
    return true;
  };

  return (
    <div className={classnames(styles.netflixButton, className)}>
      <a
        className={styles.link}
        href={watchUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
      >
        <img
          className={styles.image}
          src={netflixButtonImage}
          alt="Watch on Netflix"
        />
      </a>
    </div>
  );
};

NetflixButton.propTypes = {
  track: PropTypes.func,
  className: PropTypes.string,
  /* eslint react/forbid-prop-types: 0 */
  netflixMovie: PropTypes.object
};

NetflixButton.defaultProps = {
  track: () => {},
  className: 'netflix-button',
  netflixMovie: null
};

export default NetflixButton;
