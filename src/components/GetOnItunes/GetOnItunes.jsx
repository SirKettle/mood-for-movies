import React, { PropTypes } from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { trackClick } from '../../domains/ui/uiActions';
import styles from './GetOnItunes.css';
import getItOnItunes from '../../assets/images/Get_it_on_iTunes.svg';

const mapDispatchToProps = dispatch => ({
  track: (key, data) => { trackClick(dispatch, key, data); }
});

export const GetOnItunes = ({
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
        href={iTunesTrack.get('trackViewUrl')}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
      >
        <img src={getItOnItunes} alt="Get it on iTunes" />
      </a>
    </div>
  );
};

GetOnItunes.propTypes = {
  track: PropTypes.func.isRequired,
  className: PropTypes.string,
  /* eslint react/forbid-prop-types: 0 */
  iTunesTrack: PropTypes.object
};

GetOnItunes.defaultProps = {
  className: 'some-movie',
  iTunesTrack: null
};

export const Connected = connect(null, mapDispatchToProps)(GetOnItunes);
