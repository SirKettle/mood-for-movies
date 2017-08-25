import React, { PropTypes } from 'react';
import classnames from 'classnames';
import styles from './People.css';
import * as urlUtils from '../../utils/url';
import typography from '../../css/typography.css';

const handleOnClick = (person, media, navigateTo, track) => {
  track('person-button', `${media}_${person.get('id')}_${person.get('name')}`);
  navigateTo('person_results', {
    // can currently only 'discover' movies by person id :/
    media: 'movies',
    personId: person.get('id'),
    personName: urlUtils.encodeUriSafe(person.get('name')),
    page: 1
  });
};

const getImageUrl = (baseUrl, profileUrl) => {
  if (!profileUrl) {
    return 'none';
  }
  return `url(${baseUrl}${profileUrl})`;
};

const People = ({
  className,
  baseUrl,
  people,
  secondaryField,
  displayCount,
  navigateTo,
  track,
  media
}) => {
  return (
    <div className={classnames(className, styles.people)}>
      {
        people.slice(0, displayCount)
          .map(person => (
            <button
              key={person.get('credit_id')}
              className={styles.person}
              onClick={() => {
                handleOnClick(person, media, navigateTo, track);
              }}
            >
              <div
                className={styles.image}
                style={{ backgroundImage: getImageUrl(baseUrl, person.get('profile_path')) }}
              />
              <div className={styles.info}>
                <p className={classnames(typography.simon, styles.name)}>{person.get('name')}</p>
                <p className={classnames(typography.elliot)}>{person.get(secondaryField)}</p>
              </div>
            </button>
          ))
      }
    </div>
  );
};

People.propTypes = {
  className: PropTypes.string,
  track: PropTypes.func.isRequired,
  navigateTo: PropTypes.func.isRequired,
  baseUrl: PropTypes.string.isRequired,
  secondaryField: PropTypes.string,
  media: PropTypes.string.isRequired,
  /* eslint react/forbid-prop-types: 0 */
  people: PropTypes.object.isRequired,
  displayCount: PropTypes.number
};

People.defaultProps = {
  className: 'some-people',
  secondaryField: 'job',
  displayCount: 4
};

export default People;
