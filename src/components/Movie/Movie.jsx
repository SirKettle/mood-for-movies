import React, { PropTypes } from 'react';
import classnames from 'classnames';
import styles from './Movie.css';

const Movie = ({ className, title, overview, imgSrc }) => {
  return (
    <div className={classnames(className, styles.movie)}>
      <div className={styles.backdrop} style={{ backgroundImage: `url(${imgSrc})` }} />
      <div className={styles.contents}>
        <h3>{ title }</h3>
        <p>{ overview }</p>
        <img className={styles.image} alt={title} src={imgSrc} />
      </div>
    </div>
  );
};

Movie.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string.isRequired,
  overview: PropTypes.string.isRequired,
  imgSrc: PropTypes.string.isRequired
};

Movie.defaultProps = {
  className: 'some-movie'
};

export default Movie;
