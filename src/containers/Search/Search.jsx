import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { actions as routerActions } from 'redux-router5';
import { searchItems } from '../../domains/search/searchActions';
import { trackClick } from '../../domains/ui/uiActions';
import * as resultsSelectors from '../../domains/results/resultsSelectors';
import * as searchSelectors from '../../domains/search/searchSelectors';
import { Connected as Header } from '../Header/Header';
import MediaList from '../../components/MediaList/MediaList';
import styles from './Search.css';
import typography from '../../css/typography.css';

const mapStateToProps = (state) => {
  return {
    profileImagesBaseUrl: resultsSelectors.profileImagesBaseUrlSelector(state),
    movieImagesBaseUrl: resultsSelectors.movieImagesBaseUrlSelector(state),
    items: searchSelectors.itemsSelector(state)
    // loadingStatus: resultsSelectors.currentSearchLoadingStatusSelector(state),
  };
};

const mapDispatchToProps = dispatch => ({
  requestSearch: (query) => { dispatch(searchItems(query)); },
  track: (key, data) => { trackClick(dispatch, key, data); },
  navigateTo: (name, params) => dispatch(routerActions.navigateTo(name, params))
});

export class Search extends Component {

  static defaultProps = {
    items: null,
    profileImagesBaseUrl: null,
    movieImagesBaseUrl: null
  }

  state = {
    timer: null
  }

  componentWillUnmount() {
    window.clearTimeout(this.state.timer);
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

  renderItems = () => {
    const { items, track, navigateTo, profileImagesBaseUrl, movieImagesBaseUrl } = this.props;

    if (!items) {
      return null;
    }
    
    const props = {
      className: styles.items,
      track,
      navigateTo,
      profileImagesBaseUrl,
      movieImagesBaseUrl,
      items,
      displayCount: 20
    };

    return (<MediaList {...props} />);
  }

  render() {
    return (
      <div className={classnames(styles.search)}>
        <Header
          className={styles.header}
          includeLinks={['back', 'about']}
        />
        <div className={styles.contents}>
          <h3 className={classnames(typography.bottomMargin, typography.will)}>
            Search for your favourite movie, tv show, or one of the cast and crew
          </h3>
          <div className={styles.form}>
            <input
              className={classnames(typography.harrison, styles.input)}
              type="text"
              onChange={this.handleQueryChange}
              placeholder="Start typing to search..."
              autoFocus
            />
          </div>
          <hr />
          { this.renderItems() }
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
  items: PropTypes.object,
  profileImagesBaseUrl: PropTypes.string,
  movieImagesBaseUrl: PropTypes.string
};

export const Connected = connect(mapStateToProps, mapDispatchToProps)(Search);
