import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { actions as routerActions } from 'redux-router5';
import { searchPeople } from '../../domains/search/searchActions';
import { trackClick } from '../../domains/ui/uiActions';
import * as resultsSelectors from '../../domains/results/resultsSelectors';
import * as searchSelectors from '../../domains/search/searchSelectors';
import Header from '../../components/Header/Header';
import People from '../../components/People/People';
import styles from './Search.css';
import typography from '../../css/typography.css';

const mapStateToProps = (state) => {
  return {
    profileImagesBaseUrl: resultsSelectors.profileImagesBaseUrlSelector(state),
    people: searchSelectors.peopleSelector(state)
    // loadingStatus: resultsSelectors.currentSearchLoadingStatusSelector(state),
  };
};

const mapDispatchToProps = dispatch => ({
  requestSearch: (query) => { dispatch(searchPeople(query)); },
  track: (key, data) => { trackClick(dispatch, key, data); },
  navigateTo: (name, params) => dispatch(routerActions.navigateTo(name, params))
});

export class Search extends Component {

  static defaultProps = {
    people: null,
    profileImagesBaseUrl: null
  }

  state = {
    timer: null
  }

  componentWillUnmount() {
    window.clearTimeout(this.state.timer);
  }

  getHeaderMenuItems = () => {
    const { navigateTo } = this.props;
    return [{
      label: 'About',
      onClick: () => { navigateTo('about'); }
    }];
  }

  requestQuery = (query) => {
    window.clearTimeout(this.state.timer);

    if (query.length > 2) {
      this.setState({
        timer: window.setTimeout(() => {
          this.props.requestSearch(query);
        }, 500)
      });
    }
  }

  handleQueryChange = (event) => {
    this.requestQuery(event.target.value);
  }

  renderPeople = () => {
    const { people, track, navigateTo, profileImagesBaseUrl } = this.props;

    if (!people) {
      return null;
    }
    
    const peopleProps = {
      className: styles.people,
      track,
      navigateTo,
      baseUrl: profileImagesBaseUrl,
      people,
      displayCount: 20
    };

    return (<People {...peopleProps} />);
  }

  render() {
    return (
      <div className={classnames(styles.search)}>
        <Header
          className={styles.header}
          menuItems={this.getHeaderMenuItems()}
        />
        <div className={styles.contents}>
          <h3 className={classnames(typography.bottomMargin, typography.will)}>
            Search for your favourite star or director
          </h3>
          <div className={styles.form}>
            <input
              className={classnames(typography.harrison, styles.input)}
              type="text"
              onChange={this.handleQueryChange}
              placeholder="Name of person..."
              autoFocus
            />
          </div>
          <hr />
          { this.renderPeople() }
        </div>
      </div>
    );
  }
}

Search.propTypes = {
  requestSearch: PropTypes.func.isRequired,
  track: PropTypes.func.isRequired,
  navigateTo: PropTypes.func.isRequired,
  /* eslint react/forbid-prop-types: 0 */
  people: PropTypes.object,
  profileImagesBaseUrl: PropTypes.string
};

export const Connected = connect(mapStateToProps, mapDispatchToProps)(Search);
