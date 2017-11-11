import React, { PropTypes } from 'react';
import classnames from 'classnames';
import styles from './MediaList.css';
import * as urlUtils from '../../utils/url';
import typography from '../../css/typography.css';
import emptyImage from '../../assets/images/empty-avatar.png';

const handleOnClickPerson = (item, media, navigateTo, track) => {
  track('item-button', `person_${item.get('id')}_${item.get('name')}`);
  navigateTo('person_results', {
    // can currently only 'discover' movies by item id :/
    media: 'movies',
    personId: item.get('id'),
    personName: urlUtils.encodeUriSafe(item.get('name')),
    page: 1
  });
};

const handleOnClickMovie = (item, navigateTo, track) => {
  track('item-button', `movie_${item.get('id')}_${item.get('title')}`);
  navigateTo('movies', {
    lookupId: item.get('id'),
    lookupName: urlUtils.encodeUriSafe(item.get('title'))
  });
};

const handleOnClickTv = (item, navigateTo, track) => {
  track('item-button', `tv_${item.get('id')}_${item.get('name')}`);
  navigateTo('tv', {
    lookupId: item.get('id'),
    lookupName: urlUtils.encodeUriSafe(item.get('name'))
  });
};

const getImageUrl = (baseUrl, path) => {
  if (!path) {
    // return 'none';
    return `url(${emptyImage})`;
  }
  return `url(${baseUrl}${path})`;
};

const MediaList = ({
  className,
  profileImagesBaseUrl,
  movieImagesBaseUrl,
  items,
  secondaryField,
  displayCount,
  navigateTo,
  track,
  media
}) => {
  return (
    <div className={classnames(className, styles.items)}>
      {
        items.slice(0, displayCount)
          .map((item) => {
            const isPerson = item.get('media_type') === 'person';
            const isMovie = item.get('media_type') === 'movie';
            const isTv = item.get('media_type') === 'tv';
            const baseUrl = isPerson ? profileImagesBaseUrl : movieImagesBaseUrl;
            const imagePathField = isPerson ? 'profile_path' : 'backdrop_path';
            const nameField = isMovie ? 'title' : 'name';
            return (
              <button
                key={item.get('credit_id') || item.get('id')}
                className={styles.item}
                onClick={() => {
                  if (isPerson) {
                    handleOnClickPerson(item, media, navigateTo, track);
                  }
                  if (isMovie) {
                    handleOnClickMovie(item, navigateTo, track);
                  }
                  if (isTv) {
                    handleOnClickTv(item, navigateTo, track);
                  }
                }}
              >
                <div
                  className={styles.image}
                  style={{ backgroundImage: getImageUrl(baseUrl, item.get(imagePathField)) }}
                />
                <div className={styles.info}>
                  <p className={classnames(typography.simon, styles.name)}>{item.get(nameField)}</p>
                  {
                    secondaryField
                    ? (<p className={classnames(typography.elliot)}>{item.get(secondaryField)}</p>)
                    : null
                  }
                </div>
              </button>
            );
          })
      }
    </div>
  );
};

MediaList.propTypes = {
  className: PropTypes.string,
  track: PropTypes.func.isRequired,
  navigateTo: PropTypes.func.isRequired,
  profileImagesBaseUrl: PropTypes.string.isRequired,
  movieImagesBaseUrl: PropTypes.string.isRequired,
  secondaryField: PropTypes.string,
  media: PropTypes.string,
  /* eslint react/forbid-prop-types: 0 */
  items: PropTypes.object.isRequired,
  displayCount: PropTypes.number
};

MediaList.defaultProps = {
  className: 'some-items',
  secondaryField: null,
  displayCount: 4,
  media: 'all'
};

export default MediaList;
