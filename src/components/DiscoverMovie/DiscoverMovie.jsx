import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { loadMovies } from '../../domains/movies/moviesActions';
import { setMood } from '../../domains/mood/moodActions';
import * as moviesSelectors from '../../domains/movies/moviesSelectors';
import * as moodSelectors from '../../domains/mood/moodSelectors';
import MoodOptions from '../MoodOptions/MoodOptions';
import MOODS from '../../constants/moods';

import styles from './DiscoverMovie.css';
import typography from '../../css/typography.css';

const mapStateToProps = (state) => {
  return {
    movies: moviesSelectors.moviesSelector(state),
    genres: moodSelectors.genresSelector(state),
    moodsSelected: moodSelectors.moodsSelector(state)
  };
};

const mapDispatchToProps = dispatch => ({
  requestMovies: (args) => { loadMovies(dispatch, args); },
  requestSetMood: (moodId, toggleOn = true) => { setMood(dispatch, moodId, toggleOn); }
});

export class DiscoverMovie extends Component {

  static defaultProps = {
    movies: null,
    configuration: null
  }

  handleToggle = (e, moodKey) => {
    this.props.requestSetMood(moodKey, e.currentTarget.checked);
  }

  submitRequest = () => {
    this.props.requestMovies({
      moodsKey: this.props.moodsSelected.join('_'),
      queryParams: {
        with_genres: this.props.genres.join(',')
      }
    });
  }

  renderMoods = () => {
    return (
      <MoodOptions
        className={styles.moods}
        moods={MOODS}
        moodsSelected={this.props.moodsSelected}
        onSelected={this.handleToggle}
      />
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
        { this.renderButton() }
      </div>
    );
  }
}

DiscoverMovie.propTypes = {
  requestMovies: PropTypes.func.isRequired,
  requestSetMood: PropTypes.func.isRequired,
  /* eslint react/forbid-prop-types: 0 */
  movies: PropTypes.object,
  /* eslint react/forbid-prop-types: 0 */
  genres: PropTypes.array.isRequired,
  /* eslint react/forbid-prop-types: 0 */
  moodsSelected: PropTypes.object.isRequired
};

export const Connected = connect(mapStateToProps, mapDispatchToProps)(DiscoverMovie);
