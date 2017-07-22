import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { requestNextMovie } from '../../domains/movies/moviesActions';
import * as moviesSelectors from '../../domains/movies/moviesSelectors';
import * as moodSelectors from '../../domains/mood/moodSelectors';
import Loading from '../Loading/Loading';
import Movie from '../Movie/Movie';
import loadingStates from '../../constants/loadingStates';

import styles from './CurrentMovie.css';
import typography from '../../css/typography.css';

const mapStateToProps = (state) => {
  return {
    configuration: moviesSelectors.configurationSelector(state),
    currentMovie: moviesSelectors.currentMovieSelector(state),
    loadingStatus: moviesSelectors.currentMoviesLoadingStatusSelector(state),
    moodsKey: moodSelectors.moodsKeySelector(state)
  };
};

const mapDispatchToProps = dispatch => ({
  requestNext: (args) => { requestNextMovie(dispatch, args); }
});

export class CurrentMovie extends Component {

  static defaultProps = {
    currentMovie: null,
    configuration: null
  }

  getIsLoading = () => {
    const { loadingStatus } = this.props;
    return loadingStatus === loadingStates.LOADING;
  }

  getButtonText = () => {
    if (this.getIsLoading()) {
      return 'Loading...';
    }
    if (!this.props.currentMovie) {
      return 'Try something else';
    }
    return 'Suggest another';
  }

  getImgSrc = (srcKey) => {
    const { configuration, currentMovie } = this.props;
    const src = currentMovie.get(srcKey);
    
    if (src) {
      return `${configuration.getIn(['images', 'base_url'])}w780${src}`;
    }

    return null;
  }

  submitRequest = () => {
    if (!this.props.currentMovie) {
      history.back();
      return;
    }
    this.props.requestNext({
      moodsKey: this.props.moodsKey
    });
  }

  renderMovie = () => {
    const { currentMovie } = this.props;

    if (!currentMovie) {
      return (<p>No movies</p>);
    }

    const movieProps = {
      className: styles.movie,
      title: currentMovie.get('title'),
      overview: currentMovie.get('overview'),
      posterImgSrc: this.getImgSrc('poster_path'),
      imgSrc: this.getImgSrc('backdrop_path'),
      voteCount: currentMovie.get('vote_count'),
      voteAverage: currentMovie.get('vote_average'),
      popularity: currentMovie.get('popularity'),
      genreIds: currentMovie.get('genre_ids').toArray(),
      releaseDate: currentMovie.get('release_date')
    };

    return (<Movie {...movieProps} />);
  }

  renderButton = () => {
    return (
      <button
        disabled={this.getIsLoading()}
        className={classnames(typography.ted, styles.button)}
        onClick={this.submitRequest}
      >{this.getButtonText()}</button>
    );
  }

  render() {
    const { loadingStatus } = this.props;
    return (
      <div className={classnames(styles.currentMovie)}>
        <Loading className={styles.loading} loadingStatus={loadingStatus}>
          <div className={styles.movieWrapper}>
            { this.renderMovie() }
            { this.renderButton() }
          </div>
        </Loading>
      </div>
    );
  }
}

CurrentMovie.propTypes = {
  requestNext: PropTypes.func.isRequired,
  /* eslint react/forbid-prop-types: 0 */
  currentMovie: PropTypes.object,
  loadingStatus: PropTypes.string.isRequired,
  /* eslint react/forbid-prop-types: 0 */
  configuration: PropTypes.object,
  moodsKey: PropTypes.string.isRequired
};

export const Connected = connect(mapStateToProps, mapDispatchToProps)(CurrentMovie);
