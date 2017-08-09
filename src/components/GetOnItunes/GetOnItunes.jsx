import React, { PropTypes } from 'react';
import classnames from 'classnames';
import styles from './GetOnItunes.css';
import getItOnItunes from '../../assets/images/Get_it_on_iTunes.svg';

const GetOnItunes = ({
  track,
  className,
  iTunesTrack
}) => {
  const handleClick = () => {
    track('get-on-itunes-button', iTunesTrack.get('trackViewUrl'));
    return true;
  };

  return (
    <div className={classnames(styles.getItOnItunes, className)}>
      <a
        className={styles.link}
        href={iTunesTrack.get('trackViewUrl')}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
      >
        <img
          className={styles.image}
          src={getItOnItunes}
          alt="Get it on iTunes"
        />
      </a>
    </div>
  );
};

GetOnItunes.propTypes = {
  track: PropTypes.func,
  className: PropTypes.string,
  /* eslint react/forbid-prop-types: 0 */
  iTunesTrack: PropTypes.object
};

GetOnItunes.defaultProps = {
  track: () => {},
  className: 'itunes-button',
  iTunesTrack: null
};

export default GetOnItunes;
