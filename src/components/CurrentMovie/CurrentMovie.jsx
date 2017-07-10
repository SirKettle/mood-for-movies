import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { loadMovies, loadConfiguration } from '../../domains/movies/moviesActions';
import * as moviesSelectors from '../../domains/movies/moviesSelectors';
import Movie from '../Movie/Movie';

import styles from './CurrentMovie.css';
import typography from '../../css/typography.css';

const mapStateToProps = (state) => {
  return {
    configuration: moviesSelectors.configurationSelector(state),
    movies: moviesSelectors.moviesSelector(state)
  };
};

const mapDispatchToProps = dispatch => ({
  requestConfiguration: () => { loadConfiguration(dispatch); },
  requestMovies: (args) => { loadMovies(dispatch, args); }
});

class CurrentMovie extends Component {

  static defaultProps = {
    movies: null,
    configuration: null
  }

  componentWillMount() {
    this.props.requestConfiguration();
  }

  submitRequest = () => {
    history.back();
  }

  canDisplayMovie = () => {
    const { configuration, movies } = this.props;

    if (!configuration || !movies || !movies.get('total_results')) {
      return false;
    }

    return true;
  }

  renderMovie = () => {
    const { configuration, movies } = this.props;

    if (!this.canDisplayMovie()) {
      return (<p>Error: should not see this</p>);
    }

    const movie = movies.get('results').get(0);
    const posterImgSrc = `${configuration.getIn(['images', 'base_url'])}w780${movie.get('poster_path')}`;
    const backdropImgSrc = `${configuration.getIn(['images', 'base_url'])}w780${movie.get('backdrop_path')}`;
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
  configuration: PropTypes.object
};

export default connect(mapStateToProps, mapDispatchToProps)(CurrentMovie);
