import React, { PropTypes } from 'react';
import classnames from 'classnames';
import styles from './Movie.css';
import typography from '../../css/typography.css';

const Movie = ({ className, title, overview, posterImgSrc, backdropImgSrc }) => {
  return (
    <div className={classnames(className, styles.movie)}>
      <div className={styles.backdrop} style={{ backgroundImage: `url(${posterImgSrc})` }} />
      <div className={styles.contents}>
        <h3 className={classnames(typography.bottomMargin, typography.phil)}>{ title }</h3>
        <p className={classnames(typography.bottomMargin, typography.harrison)}>{ overview }</p>
        <img className={styles.image} alt={title} src={backdropImgSrc} />
      </div>
    </div>
  );
};

Movie.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string.isRequired,
  overview: PropTypes.string.isRequired,
  posterImgSrc: PropTypes.string.isRequired,
  backdropImgSrc: PropTypes.string.isRequired
};

Movie.defaultProps = {
  className: 'some-movie'
};

export default Movie;
