import React, { PropTypes } from 'react';
import classnames from 'classnames';
import styles from './Movie.css';
import typography from '../../css/typography.css';

const Movie = ({ className, title, overview, posterImgSrc, imgSrc }) => {
  return (
    <div className={classnames(className, styles.movie)}>
      <div className={styles.backdrop} style={{ backgroundImage: `url(${posterImgSrc})` }} />
      <div className={styles.contents}>
        <h3 className={classnames(typography.bottomMargin, typography.phil)}>{ title }</h3>
        {
          imgSrc ?
          (<img
            className={classnames(typography.bottomMargin, styles.image)}
            alt={title} src={imgSrc}
          />) :
          null
        }
        <p className={classnames(typography.bottomMargin, typography.harrison)}>{ overview }</p>
      </div>
    </div>
  );
};

Movie.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string.isRequired,
  overview: PropTypes.string.isRequired,
  posterImgSrc: PropTypes.string,
  imgSrc: PropTypes.string
};

Movie.defaultProps = {
  className: 'some-movie',
  posterImgSrc: null,
  imgSrc: null
};

export default Movie;
