import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { loadMovies, loadConfiguration } from '../../domains/movies/moviesActions';
import { setMood } from '../../domains/mood/moodActions';
import * as moviesSelectors from '../../domains/movies/moviesSelectors';
import * as moodSelectors from '../../domains/mood/moodSelectors';
import moods from '../../constants/moods';
import Movie from '../Movie/Movie';

import styles from './DiscoverMovie.css';
import typography from '../../css/typography.css';

const mapStateToProps = (state) => {
  return {
    configuration: moviesSelectors.configurationSelector(state),
    movies: moviesSelectors.moviesSelector(state),
    genres: moodSelectors.genresSelector(state)
  };
};

const mapDispatchToProps = dispatch => ({
  requestConfiguration: () => { loadConfiguration(dispatch); },
  requestMovies: (args) => { loadMovies(dispatch, args); },
  requestSetMood: (moodId, toggleOn = true) => { setMood(dispatch, moodId, toggleOn); }
});

class DiscoverMovie extends Component {

  static defaultProps = {
    movies: null,
    configuration: null
  }

  componentWillMount() {
    this.props.requestConfiguration();
  }

  submitRequest = () => {
    this.props.requestMovies({
      queryParams: {
        with_genres: this.props.genres.join(','),
        'primary_release_date.gte': '1985',
        'primary_release_date.lte': '1990'
      }
    });
  }

  handleToggle = (e, moodKey) => {
    this.props.requestSetMood(moodKey, e.currentTarget.checked);
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
      return null;
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

  renderMoods = () => {
    if (this.canDisplayMovie()) {
      return null;
    }

    return (
      <div className={styles.moods}>
        {
          Object.keys(moods).map((key) => {
            const mood = moods[key];
            const name = `checkbox${key}`;
            return (
              <label className={styles.moodToggle} key={key} htmlFor={name}>
                <input name={name} type="checkbox" onChange={(e) => { this.handleToggle(e, key); }} />
                { mood.longLabel }
              </label>
            );
          })
        }
      </div>
    );
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
      <div className={classnames(styles.discoverMovie)}>
        { this.renderMoods() }
        { this.renderMovie() }
        { this.renderButton() }
      </div>
    );
  }
}

DiscoverMovie.propTypes = {
  requestMovies: PropTypes.func.isRequired,
  requestConfiguration: PropTypes.func.isRequired,
  requestSetMood: PropTypes.func.isRequired,
  /* eslint react/forbid-prop-types: 0 */
  movies: PropTypes.object,
  /* eslint react/forbid-prop-types: 0 */
  configuration: PropTypes.object,
  genres: PropTypes.array.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(DiscoverMovie);
