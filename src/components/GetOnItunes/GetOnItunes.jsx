import React, { PropTypes } from 'react';
import classnames from 'classnames';
import styles from './GetOnItunes.css';
import getItOnItunes from '../../assets/images/Get_it_on_iTunes.svg';
import { getUriSafe } from '../../utils/url';

const AFFILIATE_TOKEN = '1001lybQ';
const CAMPAIGN_TOKEN = 'choosymovietv';
const mediaMap = {
  tv: 'tv-season',
  movies: 'movie'
};

// the title is an optional part of the url - but is handy for users
// who have copied the url to their clipboard

// iTunes search API returns tvShows with collectionIds, movies with trackIds
export const getId = iTunesTrack => iTunesTrack.get('trackId') || iTunesTrack.get('collectionId');
// iTunes search API returns tvShows with collectionIds, movies with trackIds
export const getMediaType = currentMedia => mediaMap[currentMedia] || 'movie';
// use geo prefix - this redirects to clients local itunes store - so safe to use 'us' as default
export const getAffiliateLink = (trackId, title, mediaType) => `https://geo.itunes.apple.com/us/${mediaType}/${getUriSafe(title)}/id${trackId}?at=${AFFILIATE_TOKEN}&ct=${CAMPAIGN_TOKEN}`;

const GetOnItunes = ({
  className,
  iTunesTrack,
  title,
  track,
  currentMedia
}) => {
  const affiliateLink = getAffiliateLink(getId(iTunesTrack), title, getMediaType(currentMedia));
  
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
  currentMedia: PropTypes.string.isRequired,
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
