import React, { PropTypes } from 'react';
import classnames from 'classnames';
import styles from './GetOnItunes.css';
import getItOnItunes from '../../assets/images/Get_it_on_iTunes.svg';

const GetOnItunes = ({
  className,
  iTunesTrack
}) => {
  return (
    <div className={classnames(styles.getItOnItunes, className)}>
      <a
        href={iTunesTrack.get('trackViewUrl')}
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src={getItOnItunes} alt="Get it on iTunes" />
      </a>
    </div>
  );
};

GetOnItunes.propTypes = {
  className: PropTypes.string,
  /* eslint react/forbid-prop-types: 0 */
  iTunesTrack: PropTypes.object
};

GetOnItunes.defaultProps = {
  className: 'some-movie',
  iTunesTrack: null
};

export default GetOnItunes;
