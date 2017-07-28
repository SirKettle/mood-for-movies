import React, { PropTypes } from 'react';
import classnames from 'classnames';
import styles from './NoResults.css';
import typography from '../../css/typography.css';

const NoResults = ({
  className
}) => {
  return (
    <div className={classnames(className, styles.noResults)}>
      <h2 className={classnames(typography.bottomMargin, typography.phil)}>
        Sorry, we cannot find any movies based on your moods
      </h2>
      <p className={typography.harrison}>
        Hint: A smaller selection of mood combinations will usually result in more movie matches...
      </p>
    </div>
  );
};

NoResults.propTypes = {
  className: PropTypes.string
};

NoResults.defaultProps = {
  className: 'no-results'
};

export default NoResults;
