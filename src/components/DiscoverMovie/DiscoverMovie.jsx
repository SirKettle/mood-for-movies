import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { loadMovies, loadConfiguration } from '../../domains/movies/moviesActions';
import * as moviesSelectors from '../../domains/movies/moviesSelectors';
import GENRES from '../../constants/movieGenres';

// import styles from './styles.css';

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
        with_genres: [
          // GENRES.Action,
          // GENRES.Adventure,
          // GENRES.Animation,
          GENRES.Comedy,
          // GENRES.Crime,
          // GENRES.Documentary,
          // GENRES.Drama,
          GENRES.Family
          // GENRES.Fantasy,
          // GENRES.History,
          // GENRES.Horror,
          // GENRES.Music,
          // GENRES.Mystery,
          // GENRES.Romance,
          // GENRES['Science Fiction'],
          // GENRES['TV Movie'],
          // GENRES.Thriller,
          // GENRES.War,
          // GENRES.Western
        ].join(','),
        'primary_release_date.gte': '1985',
        'primary_release_date.lte': '1990'
      }
    });
  }

  renderMovie = () => {
    const { configuration, movies } = this.props;

    if (!configuration || !movies) {
      return null;
    }

    const movie = movies.get('results').get(0);
    // <img src={ backdrop_path }

    return (
      <div>
        <h3>{ movie.get('title') }</h3>
        <p>{ movie.get('overview') }</p>
        <img alt={movie.get('title')} src={`${configuration.getIn(['images', 'base_url'])}w780${movie.get('backdrop_path')}`} />
      </div>
    );
  }

  render() {
    return (
      <div className="discoverMovie">
        <button onClick={this.submitRequest}>Suggest a movie</button>
        { this.renderMovie() }
      </div>
    );
  }
}

DiscoverMovie.propTypes = {
  requestMovies: PropTypes.func.isRequired,
  requestConfiguration: PropTypes.func.isRequired,
  /* eslint react/forbid-prop-types: 0 */
  movies: PropTypes.object,
  /* eslint react/forbid-prop-types: 0 */
  configuration: PropTypes.object
};

export default connect(mapStateToProps, mapDispatchToProps)(DiscoverMovie);
