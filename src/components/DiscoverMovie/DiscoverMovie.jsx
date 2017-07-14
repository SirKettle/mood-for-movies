import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { loadMovies, loadConfiguration } from '../../domains/movies/moviesActions';
import { setMood } from '../../domains/mood/moodActions';
import * as moviesSelectors from '../../domains/movies/moviesSelectors';
import * as moodSelectors from '../../domains/mood/moodSelectors';
import moods from '../../constants/moods';

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

  getIsChecked = (key) => {
    return this.props.moodsSelected.indexOf(key) !== -1;
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
      <div className={styles.moods}>
        {
          Object.keys(moods).map((key) => {
            const mood = moods[key];
            const name = `checkbox${key}`;
            return (
              <label className={styles.moodToggle} key={key} htmlFor={name}>
                <input
                  name={name}
                  type="checkbox"
                  onChange={(e) => { this.handleToggle(e, key); }}
                  checked={this.getIsChecked(key)}
                />
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
  genres: PropTypes.array.isRequired,
  moodsSelected: PropTypes.array.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(DiscoverMovie);
