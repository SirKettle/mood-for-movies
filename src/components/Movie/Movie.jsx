import React, { PropTypes } from 'react';
import classnames from 'classnames';
import styles from './Movie.css';
import typography from '../../css/typography.css';
import defaultImage from '../../assets/boys.jpg';

const Movie = ({
  className,
  title,
  overview,
  posterImgSrc,
  imgSrc,
  voteCount,
  voteAverage,
  popularity,
  genreIds,
  releaseDate
}) => {
  console.log(voteCount, voteAverage, popularity, genreIds, releaseDate);
  
  return (
    <div className={classnames(className, styles.movie)}>
      <div className={styles.backdrop} style={{ backgroundImage: `url(${posterImgSrc || defaultImage})` }} />
      <div className={styles.contents}>
        <h3 className={classnames(typography.phil)}>{ title }</h3>
        <p className={classnames(typography.bottomMargin, typography.elliot)}>
          { releaseDate.slice(0, 4) } - { voteAverage * 10 }%
        </p>
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
  imgSrc: PropTypes.string,
  voteCount: PropTypes.number.isRequired,
  voteAverage: PropTypes.number.isRequired,
  popularity: PropTypes.number.isRequired,
  genreIds: PropTypes.arrayOf(PropTypes.number).isRequired,
  releaseDate: PropTypes.string.isRequired
};

Movie.defaultProps = {
  className: 'some-movie',
  posterImgSrc: null,
  imgSrc: null
};

export default Movie;
