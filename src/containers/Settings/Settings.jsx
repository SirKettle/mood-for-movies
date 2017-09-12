import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { actions as routerActions } from 'redux-router5';
import * as settingsActions from '../../domains/settings/settingsActions';
import { trackClick } from '../../domains/ui/uiActions';
import * as settingsSelectors from '../../domains/settings/settingsSelectors';
import Header from '../../components/Header/Header';
import RadioGroup from '../../components/RadioGroup/RadioGroup';
import styles from './Settings.css';
import typography from '../../css/typography.css';

const mapStateToProps = (state) => {
  return {
    sort: settingsSelectors.sortSelector(state)
  };
};

const mapDispatchToProps = dispatch => ({
  requestSort: (sortKey) => { dispatch(settingsActions.requestSort(sortKey)); },
  track: (key, data) => { trackClick(dispatch, key, data); },
  navigateTo: (name, params) => dispatch(routerActions.navigateTo(name, params))
});

export class Settings extends Component {

  static defaultProps = {
    sort: undefined
  }

  getHeaderMenuItems = () => {
    const { navigateTo } = this.props;
    return [{
      label: 'Results',
      onClick: () => { window.history.back(); }
    }, {
      label: 'About',
      onClick: () => { navigateTo('about'); }
    }];
  }

  handleSortChange = (event, sortKey) => {
    const { track } = this.props;
    track('settings-sort-radio-button', sortKey);
    this.props.requestSort(sortKey);
  }

  render() {
    return (
      <div className={classnames(styles.settings)}>
        <Header
          className={styles.header}
          menuItems={this.getHeaderMenuItems()}
        />
        <div className={styles.contents}>
          <h3 className={classnames(typography.bottomMargin, typography.will)}>
            Sort settings
          </h3>
          <RadioGroup
            className={styles.radioGroup}
            options={settingsSelectors.sortOptions}
            value={this.props.sort}
            onSelected={this.handleSortChange}
          />
        </div>
      </div>
    );
  }
}

Settings.propTypes = {
  requestSort: PropTypes.func.isRequired,
  track: PropTypes.func.isRequired,
  navigateTo: PropTypes.func.isRequired,
  sort: PropTypes.string
};

export const Connected = connect(mapStateToProps, mapDispatchToProps)(Settings);
