import React, { PropTypes } from 'react';
import classnames from 'classnames';
import styles from './Movie.css';
import Stars from '../Stars/Stars';
import typography from '../../css/typography.css';
import defaultImage from '../../assets/boys.jpg';

const Movie = ({
  className,
  currentMoviePageInfo,
  title,
  overview,
  posterImgSrc,
  imgSrc,
  voteCount,
  voteAverage,
  popularity,
  genreIds,
  releaseDate,
  netflix,
  iTunes,
  el
}) => {
  console.log(voteCount, popularity, genreIds);
  
  return (
    <div ref={el} className={classnames(className, styles.movie)}>
      <div className={styles.backdrop} style={{ backgroundImage: `url(${posterImgSrc || defaultImage})` }} />
      <div className={styles.contents}>
        
        <div className={classnames(typography.elliot, styles.meta)}>
          <div>{ releaseDate.slice(0, 4) }</div>
          <Stars className={styles.stars} percentage={voteAverage * 10} />
          <div>{ voteAverage * 10 }%</div>
          { currentMoviePageInfo ?
            (<span className={styles.pageInfo}>
              {`${currentMoviePageInfo.display} of ${currentMoviePageInfo.total}`}
            </span>) :
            null
          }
        </div>

        <h2 className={classnames(typography.bottomMargin, typography.phil)}>{ title }</h2>
        {
          imgSrc ?
          (<img
            className={classnames(typography.bottomMargin, styles.image)}
            alt={title} src={imgSrc}
          />) :
          null
        }
        <p className={classnames(typography.bottomMargin, typography.harrison)}>{ overview }</p>

        <hr />

        <h3 className={classnames(typography.bottomMargin, typography.tom)}>Watch it here</h3>
        {
          netflix ?
          (<div className={classnames(typography.bottomMargin, typography.harrison)}>
            <a
              href={`https://www.netflix.com/watch/${netflix.get('show_id')}`}
              target="_blank"
              rel="noopener noreferrer"
            >Netflix</a>
          </div>) :
          null
        }
        {
          iTunes ?
          (<div className={classnames(typography.bottomMargin, typography.harrison)}>
            <a
              href={iTunes.get('trackViewUrl')}
              target="_blank"
              rel="noopener noreferrer"
            >iTunes</a>
          </div>) :
          null
        }
      </div>
    </div>
  );
};

Movie.propTypes = {
  className: PropTypes.string,
  /* eslint react/forbid-prop-types: 0 */
  currentMoviePageInfo: PropTypes.object,
  /* eslint react/forbid-prop-types: 0 */
  netflix: PropTypes.object,
  /* eslint react/forbid-prop-types: 0 */
  iTunes: PropTypes.object,
  title: PropTypes.string.isRequired,
  overview: PropTypes.string.isRequired,
  posterImgSrc: PropTypes.string,
  imgSrc: PropTypes.string,
  voteCount: PropTypes.number.isRequired,
  voteAverage: PropTypes.number.isRequired,
  popularity: PropTypes.number.isRequired,
  genreIds: PropTypes.arrayOf(PropTypes.number).isRequired,
  releaseDate: PropTypes.string.isRequired,
  el: PropTypes.func
};

Movie.defaultProps = {
  className: 'some-movie',
  currentMoviePageInfo: null,
  netflix: null,
  iTunes: null,
  posterImgSrc: null,
  imgSrc: null,
  el: () => {}
};

export default Movie;
