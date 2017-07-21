import React, { PropTypes } from 'react';
import classnames from 'classnames';
import styles from './Stars.css';

const getKey = () => `k_${Math.random()}`;

const renderStar = () => (<span key={getKey()}>★</span>);

const Stars = ({
  className,
  percentage,
  stars
}) => {
  const starWidth = 20;
  const starIndices = [];
  let counter = 0;
  while (counter < stars) {
    starIndices.push(counter);
    counter += 1;
  }
  return (
    <div className={classnames(className, styles.stars)} style={{ width: `${starWidth * stars}px` }}>
      <div className={styles.top} style={{ width: `${percentage}%` }}>
        { starIndices.map(() => renderStar()) }
      </div>
      <div className={styles.bottom}>
        { starIndices.map(() => renderStar()) }
      </div>
    </div>
  );
};

Stars.propTypes = {
  className: PropTypes.string,
  percentage: PropTypes.number.isRequired,
  stars: PropTypes.number
};

Stars.defaultProps = {
  className: 'stars',
  stars: 5
};

export default Stars;
