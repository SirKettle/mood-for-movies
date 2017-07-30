import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { loadMovies } from '../../domains/movies/moviesActions';
import { setMood } from '../../domains/mood/moodActions';
import * as moodSelectors from '../../domains/mood/moodSelectors';
import Header from '../Header/Header';
import MoodOptions from '../MoodOptions/MoodOptions';
import MOODS from '../../constants/moods';

import styles from './DiscoverMovie.css';
import typography from '../../css/typography.css';

const mapStateToProps = (state) => {
  return {
    genreGroups: moodSelectors.genreGroupsSelector(state),
    moodsSelected: moodSelectors.moodsSelector(state),
    moodsKey: moodSelectors.moodsKeySelector(state)
  };
};

const mapDispatchToProps = dispatch => ({
  requestMovies: (args) => { loadMovies(dispatch, args); },
  requestSetMood: (moodId, toggleOn = true) => { setMood(dispatch, moodId, toggleOn); }
});

export class DiscoverMovie extends Component {

  getHeaderMenuItems = () => {
    return null;
    // return [{
    //   label: 'About',
    //   onClick: () => { window.location.href = '/#/about'; }
    // }, {
    //   label: 'Contact',
    //   onClick: () => { window.location.href = '/#/contact'; }
    // }];
  }

  handleToggle = (e, moodKey) => {
    this.props.requestSetMood(moodKey, e.currentTarget.checked);
  }

  submitRequest = () => {
    const { moodsKey, genreGroups } = this.props;
    this.props.requestMovies({
      moodsKey,
      genreGroups
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
    return (
      <button
        className={classnames(typography.ted, styles.button)}
        onClick={this.submitRequest}
      >Suggest a movie</button>
    );
  }

  render() {
    return (
      <div className={classnames(styles.discoverMovie)}>
        <Header
          className={styles.header}
          menuItems={this.getHeaderMenuItems()}
        />
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
  genreGroups: PropTypes.array.isRequired,
  /* eslint react/forbid-prop-types: 0 */
  moodsSelected: PropTypes.object.isRequired,
  moodsKey: PropTypes.string.isRequired
};

export const Connected = connect(mapStateToProps, mapDispatchToProps)(DiscoverMovie);
