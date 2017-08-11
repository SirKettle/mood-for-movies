import React, { PropTypes } from 'react';
import classnames from 'classnames';
import styles from './GetOnItunes.css';
import getItOnItunes from '../../assets/images/Get_it_on_iTunes.svg';

const AFFILIATE_TOKEN = '1001lybQ';
const CAMPAIGN_TOKEN = 'choosymovietv';

export const getSafeTitle = title => title.replace(/ /gi, '-').replace(/[^A-Za-z0-9_-]/gi, '');

export const getAffiliateLink = (trackId, title) => `https://geo.itunes.apple.com/us/movie/${getSafeTitle(title)}/id${trackId}?at=${AFFILIATE_TOKEN}&ct=${CAMPAIGN_TOKEN}`;

const GetOnItunes = ({
  className,
  iTunesTrack,
  title,
  track
}) => {
  const affiliateLink = getAffiliateLink(iTunesTrack.get('trackId'), title);
  
  const handleClick = () => {
    track('get-on-itunes-button', affiliateLink);
    return true;
  };

  return (
    <div className={classnames(styles.getItOnItunes, className)}>
      <a
        className={styles.link}
        href={affiliateLink}
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
  className: PropTypes.string,
  /* eslint react/forbid-prop-types: 0 */
  iTunesTrack: PropTypes.object,
  title: PropTypes.string.isRequired,
  track: PropTypes.func
};

GetOnItunes.defaultProps = {
  className: 'itunes-button',
  iTunesTrack: null,
  track: () => {}
};

export default GetOnItunes;
