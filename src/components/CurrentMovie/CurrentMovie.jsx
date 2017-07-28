import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { requestNextMovie } from '../../domains/movies/moviesActions';
import { requestNetflixAvailability, requestItunesAvailability } from '../../domains/availability/availabilityActions';
import * as moviesSelectors from '../../domains/movies/moviesSelectors';
import * as moodSelectors from '../../domains/mood/moodSelectors';
import * as availabilitySelectors from '../../domains/availability/availabilitySelectors';
import Loading from '../Loading/Loading';
import Movie from '../Movie/Movie';
import NoResults from '../NoResults/NoResults';
import loadingStates from '../../constants/loadingStates';
import preloadImages from '../../utils/preloadImages';

import styles from './CurrentMovie.css';
import typography from '../../css/typography.css';

const mapStateToProps = (state) => {
  return {
    configuration: moviesSelectors.configurationSelector(state),
    currentMovie: moviesSelectors.currentMovieSelector(state),
    currentMovieNetflix: availabilitySelectors.currentMovieNetflixSelector(state),
    currentMovieItunes: availabilitySelectors.currentMovieItunesSelector(state),
    nextMovie: moviesSelectors.nextMovieSelector(state),
    currentMoviePageInfo: moviesSelectors.currentMoviePageInfoSelector(state),
    loadingStatus: moviesSelectors.currentMoviesLoadingStatusSelector(state),
    moodsKey: moodSelectors.moodsKeySelector(state)
  };
};

const mapDispatchToProps = dispatch => ({
  requestNext: (args) => { requestNextMovie(dispatch, args); },
  isOnNetflix: (movie) => { dispatch(requestNetflixAvailability(movie)); },
  isOnItunes: (movie) => { dispatch(requestItunesAvailability(movie)); }
});

export class CurrentMovie extends Component {

  static defaultProps = {
    currentMovie: null,
    nextMovie: null,
    currentMoviePageInfo: null,
    currentMovieNetflix: null,
    currentMovieItunes: null,
    configuration: null
  }

  componentWillMount() {
    const { moodsKey } = this.props;
    if (!moodsKey) {
      window.location.href = '/';
    }
  }

  componentDidUpdate(prevProps) {
    const { currentMovie, nextMovie, isOnNetflix, isOnItunes } = this.props;

    if (this.getIsNewMovie(prevProps)) {
      // check for availability
      isOnNetflix(currentMovie);
      isOnItunes(currentMovie);

      if (nextMovie) {
        // preload images for next movie
        console.log('preload nextMovie images', nextMovie.get('title'));
        preloadImages([
          this.getImgSrc(nextMovie, 'poster_path'),
          this.getImgSrc(nextMovie, 'backdrop_path')
        ]);
      }
    }
  }

  getIsNewMovie = (prevProps) => {
    const { currentMovie, loadingStatus } = this.props;

    if (currentMovie && loadingStatus === loadingStates.COMPLETE) {
      // is first movie...
      if (prevProps.loadingStatus === loadingStates.LOADING) {
        return true;
      }
      // if is a change of movie
      if (
        currentMovie &&
        prevProps.currentMovie &&
        currentMovie.get('id') !== prevProps.currentMovie.get('id')
      ) {
        return true;
      }
    }
    return false;
  }

  getIsLoading = () => {
    const { loadingStatus } = this.props;
    return loadingStatus === loadingStates.LOADING;
  }

  getImgSrc = (movie, srcKey) => {
    const { configuration } = this.props;
    const src = movie.get(srcKey);
    
    if (src) {
      return `${configuration.getIn(['images', 'base_url'])}w780${src}`;
    }

    return null;
  }

  setMovieEl = (movie) => {
    this.movie = movie;
  }

  handlePaginationRequest = (previous) => {
    this.movie.scrollTop = 0;
    this.props.requestNext({
      moodsKey: this.props.moodsKey,
      previous
    });
  }

  handleRequestNext = () => {
    this.handlePaginationRequest(false);
  }

  handleRequestPrevious = () => {
    this.handlePaginationRequest(true);
  }

  renderMovie = () => {
    const { currentMovie, currentMoviePageInfo,
      currentMovieNetflix, currentMovieItunes } = this.props;

    if (!currentMovie) {
      return (
        <NoResults
          className={styles.noResults}
        />
      );
    }

    const movieProps = {
      className: styles.movie,
      title: currentMovie.get('title'),
      overview: currentMovie.get('overview'),
      posterImgSrc: this.getImgSrc(currentMovie, 'poster_path'),
      imgSrc: this.getImgSrc(currentMovie, 'backdrop_path'),
      voteCount: currentMovie.get('vote_count'),
      voteAverage: currentMovie.get('vote_average'),
      popularity: currentMovie.get('popularity'),
      genreIds: currentMovie.get('genre_ids').toArray(),
      releaseDate: currentMovie.get('release_date'),
      netflix: currentMovieNetflix,
      iTunes: currentMovieItunes,
      currentMoviePageInfo,
      el: this.setMovieEl
    };

    return (<Movie {...movieProps} />);
  }

  renderNextButton = () => {
    return (
      <button
        className={classnames(typography.ted, styles.button)}
        onClick={this.handleRequestNext}
      >&gt;</button>
    );
  }

  renderPreviousButton = () => {
    return (
      <button
        className={classnames(typography.ted, styles.button)}
        onClick={this.handleRequestPrevious}
      >&lt;</button>
    );
  }

  renderActions = () => {
    const { currentMoviePageInfo } = this.props;
    const showPagination = currentMoviePageInfo && currentMoviePageInfo.total > 1;
    return (
      <div className={styles.actions}>
        <button
          onClick={() => { history.back(); }}
          className={classnames(typography.ted, styles.button)}
        >Options</button>
        { showPagination ? this.renderPreviousButton() : null }
        { showPagination ? this.renderNextButton() : null }
      </div>
    );
  }

  render() {
    const { loadingStatus } = this.props;
    return (
      <div className={classnames(styles.currentMovie)}>
        <Loading className={styles.loading} loadingStatus={loadingStatus}>
          <div className={styles.movieWrapper}>
            { this.renderMovie() }
            { this.renderActions() }
          </div>
        </Loading>
      </div>
    );
  }
}

CurrentMovie.propTypes = {
  isOnNetflix: PropTypes.func.isRequired,
  isOnItunes: PropTypes.func.isRequired,
  requestNext: PropTypes.func.isRequired,
  /* eslint react/forbid-prop-types: 0 */
  currentMovie: PropTypes.object,
  /* eslint react/forbid-prop-types: 0 */
  currentMovieNetflix: PropTypes.object,
  /* eslint react/forbid-prop-types: 0 */
  currentMovieItunes: PropTypes.object,
  /* eslint react/forbid-prop-types: 0 */
  nextMovie: PropTypes.object,
  /* eslint react/forbid-prop-types: 0 */
  currentMoviePageInfo: PropTypes.object,
  loadingStatus: PropTypes.string.isRequired,
  /* eslint react/forbid-prop-types: 0 */
  configuration: PropTypes.object,
  moodsKey: PropTypes.string.isRequired
};

export const Connected = connect(mapStateToProps, mapDispatchToProps)(CurrentMovie);
