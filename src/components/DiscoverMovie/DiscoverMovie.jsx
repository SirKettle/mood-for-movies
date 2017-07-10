import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { loadMovies, loadConfiguration } from '../../domains/movies/moviesActions';
import { setMood } from '../../domains/mood/moodActions';
import * as moviesSelectors from '../../domains/movies/moviesSelectors';
import * as moodSelectors from '../../domains/mood/moodSelectors';
import moods from '../../constants/moods';
import Movie from '../Movie/Movie';

import styles from './styles.css';

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

  renderMovie = () => {
    const { configuration, movies } = this.props;

    if (!configuration || !movies) {
      return null;
    }

    if (!movies.get('total_results')) {
      return <p>No results</p>;
    }

    const movie = movies.get('results').get(0);
    const imgSrc = `${configuration.getIn(['images', 'base_url'])}w780${movie.get('poster_path')}`;

    return (<Movie
      className={styles.movie}
      title={movie.get('title')}
      overview={movie.get('overview')}
      imgSrc={imgSrc}
    />);
  }

  render() {
    return (
      <div className={classnames('some-class', styles.discoverMovie)}>
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
        <button onClick={this.submitRequest}>Suggest a movie</button>
        { this.renderMovie() }
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
