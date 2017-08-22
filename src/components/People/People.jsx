import React, { PropTypes } from 'react';
import classnames from 'classnames';
import styles from './People.css';
import typography from '../../css/typography.css';

const People = ({
  className,
  // track,
  baseUrl,
  people,
  secondaryField,
  displayCount
}) => {
  console.log('people', people, baseUrl);
  return (
    <div className={classnames(className, styles.people)}>
      {
        people.slice(0, displayCount)
          .map(person => (
            <div
              key={person.get('credit_id')}
              className={styles.person}
            >
              <div
                className={styles.image}
                style={{ backgroundImage: `url(${baseUrl}${person.get('profile_path')})` }}
              />
              <div className={styles.info}>
                <p className={classnames(typography.harrison)}>{person.get('name')}</p>
                <p className={classnames(typography.elliot)}>{person.get(secondaryField)}</p>
              </div>
            </div>
          ))
      }
    </div>
  );
};

People.propTypes = {
  className: PropTypes.string,
  // track: PropTypes.func,
  baseUrl: PropTypes.string.isRequired,
  secondaryField: PropTypes.string,
  /* eslint react/forbid-prop-types: 0 */
  people: PropTypes.object.isRequired,
  displayCount: PropTypes.number
};

People.defaultProps = {
  className: 'some-people',
  secondaryField: 'job',
  displayCount: 4
  // ,track: () => { console.warn('track param not set', arguments); }
};

export default People;
