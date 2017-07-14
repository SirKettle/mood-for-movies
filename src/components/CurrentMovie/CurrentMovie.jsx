import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { loadMovies, loadConfiguration } from '../../domains/movies/moviesActions';
import * as moviesSelectors from '../../domains/movies/moviesSelectors';
import * as moodSelectors from '../../domains/mood/moodSelectors';
import Movie from '../Movie/Movie';
// import projectorImage from '../../assets/movie_reel.png';
// import reelImage from '../../assets/reel.png';

import styles from './CurrentMovie.css';
import typography from '../../css/typography.css';

const mapStateToProps = (state) => {
  return {
    configuration: moviesSelectors.configurationSelector(state),
    movies: moviesSelectors.moviesSelector(state),
    genres: moodSelectors.genresSelector(state),
    moodsSelected: moodSelectors.moodsSelector(state)
  };
};

const mapDispatchToProps = dispatch => ({
  requestConfiguration: () => { loadConfiguration(dispatch); },
  requestMovies: (args) => { loadMovies(dispatch, args); }
});

export class CurrentMovie extends Component {

  static defaultProps = {
    movies: null,
    configuration: null
  }

  componentWillMount() {
    this.props.requestConfiguration();
  }

  getMovies = () => {
    const { configuration, movies, moodsSelected } = this.props;
    
    if (!configuration || !movies) {
      return null;
    }

    const movieSet = movies.getIn([moodsSelected.join('_'), 'data']);
    
    if (!movieSet || !movieSet.get('total_results')) {
      return null;
    }

    return movieSet;
  }

  submitRequest = () => {
    history.back();
  }

  // renderLoading = () => {
  //   return (
  //     <div className={styles.loading}>
  //       <img
  //         className={classnames(styles.reel, styles.reel1)}
  //         src={reelImage}
  //         alt="reel"
  //         width="70"
  //         height="70"
  //       />
  //       <img
  //         className={classnames(styles.reel, styles.reel2)}
  //         src={reelImage}
  //         alt="reel"
  //         width="70"
  //         height="70"
  //       />
  //       <img
  //         className={classnames(styles.projector)}
  //         src={projectorImage}
  //         alt="projector"
  //         width="596"
  //         height="563"
  //       />
  //     </div>
  //   );
  // }

  renderMovie = () => {
    // return this.renderLoading();
    const { configuration } = this.props;
    const movieSet = this.getMovies();

    if (!movieSet) {
      return (<p>No movies</p>);
    }

    const movie = movieSet.get('results').get(0);
    const posterImgSrc =
    `${configuration.getIn(['images', 'base_url'])}w780${movie.get('poster_path')}`;
    const backdropImgSrc =
    `${configuration.getIn(['images', 'base_url'])}w780${movie.get('backdrop_path')}`;
    const movieProps = {
      className: styles.movie,
      title: movie.get('title'),
      overview: movie.get('overview'),
      posterImgSrc,
      backdropImgSrc
    };

    return (<Movie {...movieProps} />);
  }

  renderButton = () => {
    const { movies } = this.props;
    let buttonText = 'Suggest a movie';
    
    if (movies && !movies.get('total_results')) {
      buttonText = 'Try again - no results';
    }

    return (
      <button
        className={classnames(typography.ted, styles.button)}
        onClick={this.submitRequest}
      >{buttonText}</button>
    );
  }

  render() {
    return (
      <div className={classnames(styles.currentMovie)}>
        { this.renderMovie() }
        { this.renderButton() }
      </div>
    );
  }
}

CurrentMovie.propTypes = {
  requestConfiguration: PropTypes.func.isRequired,
  /* eslint react/forbid-prop-types: 0 */
  movies: PropTypes.object,
  /* eslint react/forbid-prop-types: 0 */
  configuration: PropTypes.object,
  moodsSelected: PropTypes.array.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(CurrentMovie);
