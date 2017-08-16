import React, { PropTypes } from 'react';
import classnames from 'classnames';
import styles from './Result.css';
import Stars from '../Stars/Stars';
import GetOnItunes from '../GetOnItunes/GetOnItunes';
import NetflixButton from '../NetflixButton/NetflixButton';
import FacebookLike from '../Social/FacebookLike';
import TweetButton from '../Social/TweetButton';
import typography from '../../css/typography.css';
import defaultImage from '../../assets/boys.jpg';
import GENRES from '../../constants/movieGenres';
import MOODS from '../../constants/moods';

const renderGenres = (genreIds) => {
  return Object.keys(GENRES)
    .filter(key => genreIds.indexOf(GENRES[key]) !== -1)
    .join(', ');
};

const renderResultMoods = (genreIds) => {
  return Object.values(MOODS)
    .filter(mood => genreIds.some(id => mood.genres.indexOf(id) !== -1))
    .map(mood => mood.moodFor)
    .sort()
    .join(', ');
};

const Result = ({
  className,
  currentResultPageInfo,
  track,
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
  iTunes
}) => {
  return (
    <div className={classnames(className, styles.result)}>
      <div className={styles.backdrop} style={{ backgroundImage: `url(${posterImgSrc || defaultImage})` }} />
      <div className={styles.scrollWrapper}>
        <div className={styles.contents}>
          
          <div className={classnames(typography.elliot, styles.meta)}>
            <div>{ releaseDate.slice(0, 4) }</div>
            <Stars className={styles.stars} percentage={voteAverage * 10} />
            { currentResultPageInfo ?
              (<span className={styles.pageInfo}>
                {`${currentResultPageInfo.display} of ${currentResultPageInfo.total}`}
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
            { renderResultMoods(genreIds) }
          </p>
          <p className={classnames(typography.bottomMargin, typography.harrison)}>
            { overview }
          </p>
          <div className={classnames(typography.bottomMargin, styles.socialButtons)}>
            <FacebookLike title={title} />
            <TweetButton title={title} />
          </div>
          <div className={styles.availableOn}>
            {
              iTunes ?
              (<GetOnItunes
                iTunesTrack={iTunes}
                title={title}
                track={track}
              />) :
              null
            }
            {
              netflix ?
              (<NetflixButton
                netflixResult={netflix}
                track={track}
              />) :
              null
            }
          </div>
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

Result.propTypes = {
  className: PropTypes.string,
  /* eslint react/forbid-prop-types: 0 */
  currentResultPageInfo: PropTypes.object,
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
  track: PropTypes.func
};

Result.defaultProps = {
  className: 'some-result',
  currentResultPageInfo: null,
  netflix: null,
  iTunes: null,
  posterImgSrc: null,
  imgSrc: null,
  track: () => { console.warn('track param not set', arguments); }
};

export default Result;
