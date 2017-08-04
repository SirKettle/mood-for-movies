import React, { PropTypes } from 'react';
import classnames from 'classnames';
import styles from './Movie.css';
import Stars from '../Stars/Stars';
// import GetOnItunes from '../GetOnItunes/GetOnItunes';
import typography from '../../css/typography.css';
import defaultImage from '../../assets/boys.jpg';
import GENRES from '../../constants/movieGenres';
import MOODS from '../../constants/moods';

const renderGenres = (genreIds) => {
  return Object.keys(GENRES)
    .filter(key => genreIds.indexOf(GENRES[key]) !== -1)
    .join(', ');
};

const renderMovieMoods = (genreIds) => {
  return Object.values(MOODS)
    .filter(mood => genreIds.some(id => mood.genres.indexOf(id) !== -1))
    .map(mood => mood.moodFor)
    .sort()
    .join(', ');
};

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
  console.log(!!iTunes, voteCount, popularity);
  // {
  //   iTunes ?
  //   (<GetOnItunes
  //     className={typography.bottomMargin}
  //     iTunesTrack={iTunes}
  //   />) :
  //   null
  // }
  
  return (
    <div ref={el} className={classnames(className, styles.movie)}>
      <div className={styles.backdrop} style={{ backgroundImage: `url(${posterImgSrc || defaultImage})` }} />
      <div className={styles.scrollWrapper}>
        <div className={styles.contents}>
          
          <div className={classnames(typography.elliot, styles.meta)}>
            <div>{ releaseDate.slice(0, 4) }</div>
            <Stars className={styles.stars} percentage={voteAverage * 10} />
            { currentMoviePageInfo ?
              (<span className={styles.pageInfo}>
                {`${currentMoviePageInfo.display} of ${currentMoviePageInfo.total}`}
              </span>) :
              null
            }
          </div>

          <h2 className={classnames(typography.bottomMargin, typography.will)}>{ title }</h2>
          {
            imgSrc ?
            (<img
              className={classnames(typography.bottomMargin, styles.image)}
              alt={title} src={imgSrc}
            />) :
            null
          }
          <p className={classnames(typography.bottomMargin, typography.elliot)}>
            { renderMovieMoods(genreIds) }
          </p>
          <p className={classnames(typography.bottomMargin, typography.harrison)}>{ overview }</p>
          {
            netflix ?
            (<div className={classnames(typography.bottomMargin, typography.harrison)}>
              <a
                href={`https://www.netflix.com/watch/${netflix.get('show_id')}`}
                target="_blank"
                rel="noopener noreferrer"
              >Watch on Netflix</a>
            </div>) :
            null
          }
          <hr />
          <p className={classnames(typography.bottomMargin, typography.elliot)}>
            { renderGenres(genreIds) }
          </p>
          <p className={classnames(typography.bottomMargin, typography.elliot)}>
            Number of votes: { voteCount }
          </p>
          <p className={classnames(typography.bottomMargin, typography.elliot)}>
            Vote average: { voteAverage } / 10
          </p>
          <p className={classnames(typography.bottomMargin, typography.elliot)}>
            TMDb Popularity score: { popularity }
          </p>
        </div>
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
