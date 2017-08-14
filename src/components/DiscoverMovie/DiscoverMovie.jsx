import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { actions as routerActions } from 'redux-router5';
// import { loadMovies } from '../../domains/movies/moviesActions';
import { setMood } from '../../domains/mood/moodActions';
import { trackClick } from '../../domains/ui/uiActions';
import * as moodSelectors from '../../domains/mood/moodSelectors';
import Header from '../Header/Header';
import MoodOptions from '../MoodOptions/MoodOptions';
import MOODS from '../../constants/moods';
import Button from '../Button/BaseButton';

import styles from './DiscoverMovie.css';
import typography from '../../css/typography.css';

const mapStateToProps = (state) => {
  return {
    moodsSelected: moodSelectors.moodsSelector(state)
  };
};

const mapDispatchToProps = dispatch => ({
  // requestMovies: (args) => { loadMovies(dispatch, args); },
  requestSetMood: (moodId, toggleOn = true) => { setMood(dispatch, moodId, toggleOn); },
  track: (key, data) => { trackClick(dispatch, key, data); },
  navigateTo: (name, params) => dispatch(routerActions.navigateTo(name, params))
});

export class DiscoverMovie extends Component {

  getHeaderMenuItems = () => {
    return [{
      label: 'About',
      onClick: () => { window.location.href = '/#/about'; }
    }];
  }

  handleToggle = (e, moodKey) => {
    this.props.requestSetMood(moodKey, e.currentTarget.checked);
  }

  submitRequest = () => {
    const { moodsSelected, navigateTo, track } = this.props;
    const moodOptions = moodsSelected.join('_').toLowerCase();
    track('suggest-button', moodOptions);
    navigateTo('results', { media: 'movies', options: moodOptions });
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
    const { moodsSelected } = this.props;

    const hasSelected = moodsSelected.size > 0;

    return (
      <Button
        dataRole="suggest-button"
        className={classnames(typography.ted, styles.button, {
          [styles.active]: hasSelected
        })}
        onClick={this.submitRequest}
        disabled={!hasSelected}
      >Suggest a movie</Button>
    );
  }

  render() {
    return (
      <div className={classnames(styles.discoverMovie)}>
        <Header
          className={styles.header}
          menuItems={this.getHeaderMenuItems()}
        />
        <div className={classnames(styles.intro)}>
          <h2 className={classnames(typography.will)}>
            What are you in the mood for today?
          </h2>
        </div>
        { this.renderMoods() }
        { this.renderButton() }
      </div>
    );
  }
}

DiscoverMovie.propTypes = {
  track: PropTypes.func.isRequired,
  navigateTo: PropTypes.func.isRequired,
  // requestMovies: PropTypes.func.isRequired,
  requestSetMood: PropTypes.func.isRequired,
  /* eslint react/forbid-prop-types: 0 */
  moodsSelected: PropTypes.object.isRequired
};

export const Connected = connect(mapStateToProps, mapDispatchToProps)(DiscoverMovie);
