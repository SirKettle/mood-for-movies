import React, { PropTypes } from 'react';
import classnames from 'classnames';
import styles from './NoResults.css';
import typography from '../../css/typography.css';

const getTitleText = media => `Sorry, we cannot find any ${media === 'tv' ? 'shows' : 'movies'} based on your moods`;
const getHintText = media => `Hint: A smaller selection of mood combinations will usually result in more ${media === 'tv' ? 'shows' : 'movie matches'}...`;

const NoResults = ({
  className,
  currentMedia
}) => {
  return (
    <div className={classnames(className, styles.noResults)}>
      <h2 className={classnames(typography.bottomMargin, typography.will)}>
        {getTitleText(currentMedia)}
      </h2>
      <p className={typography.harrison}>
        {getHintText(currentMedia)}
      </p>
    </div>
  );
};

NoResults.propTypes = {
  className: PropTypes.string,
  currentMedia: PropTypes.string.isRequired
};

NoResults.defaultProps = {
  className: 'no-results'
};

export default NoResults;
