import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import { equals, omit } from 'ramda';
import { connect } from 'react-redux';
import { actions as routerActions } from 'redux-router5';
import { loadResults, requestNextResult } from '../../domains/results/resultsActions';
import { loadCredits } from '../../domains/credits/creditsActions';
import { requestNetflixAvailability, requestItunesAvailability } from '../../domains/availability/availabilityActions';
import { trackClick } from '../../domains/ui/uiActions';
import * as resultsSelectors from '../../domains/results/resultsSelectors';
import * as routerSelectors from '../../domains/router/routerSelectors';
import * as moodSelectors from '../../domains/mood/moodSelectors';
import * as availabilitySelectors from '../../domains/availability/availabilitySelectors';
import * as creditsSelectors from '../../domains/credits/creditsSelectors';
import loadingStates from '../../constants/loadingStates';
import preloadImages from '../../utils/preloadImages';
import Loading from '../../components/Loading/Loading';
import Result from '../../components/Result/Result';
import NoResults from '../../components/NoResults/NoResults';
import Header from '../../components/Header/Header';
import styles from './Results.css';
import typography from '../../css/typography.css';

const mapStateToProps = (state) => {
  return {
    configuration: resultsSelectors.configurationSelector(state),
    currentResult: resultsSelectors.currentResultSelector(state),
    currentResultNetflix: availabilitySelectors.currentResultNetflixSelector(state),
    currentResultItunes: availabilitySelectors.currentResultItunesSelector(state),
    nextResult: resultsSelectors.nextResultSelector(state),
    currentResultPageInfo: resultsSelectors.currentResultPageInfoSelector(state),
    loadingStatus: resultsSelectors.currentResultsLoadingStatusSelector(state),
    activeRoute: routerSelectors.activeRouteSelector(state),
    moodForKey: moodSelectors.moodForKeySelector(state),
    currentPersonName: moodSelectors.currentPersonNameSelector(state),
    currentMedia: moodSelectors.currentMediaSelector(state),
    cast: creditsSelectors.currentResultCastSelector(state),
    crew: creditsSelectors.currentResultCrewSelector(state)
  };
};

const mapDispatchToProps = dispatch => ({
  requestResults: () => { dispatch(loadResults()); },
  requestCredits: (result) => { dispatch(loadCredits(result)); },
  requestNext: (args) => { dispatch(requestNextResult(args)); },
  isOnNetflix: (result) => { dispatch(requestNetflixAvailability(result)); },
  isOnItunes: (result) => { dispatch(requestItunesAvailability(result)); },
  track: (key, data) => { trackClick(dispatch, key, data); },
  navigateTo: (name, params) => dispatch(routerActions.navigateTo(name, params))
});

export class Results extends Component {

  static defaultProps = {
    currentResult: null,
    nextResult: null,
    currentResultPageInfo: null,
    currentResultNetflix: null,
    currentResultItunes: null,
    currentPersonName: null,
    configuration: null
  }

  componentWillMount() {
    const { requestResults } = this.props;
    requestResults();
  }

  componentDidUpdate(prevProps) {
    const { currentResult, nextResult, isOnNetflix,
      isOnItunes, requestResults, requestCredits } = this.props;

    if (this.getIsNewResult(prevProps)) {
      // check for availability
      isOnNetflix(currentResult);
      isOnItunes(currentResult);
      requestCredits(currentResult);
      
      // scroll to top
      window.scrollTo(0, 0);

      if (nextResult) {
        // preload images for next result
        preloadImages([
          this.getImgSrc(nextResult, 'poster_path'),
          this.getImgSrc(nextResult, 'backdrop_path')
        ]);
      }
    }

    if (this.getIsNewRoute(prevProps)) {
      requestResults();
      // scroll to top - we need to do this here because,
      // when searhing by person, the result can be the same
      window.scrollTo(0, 0);
    }
  }

  getHeaderMenuItems = () => {
    const { currentResultPageInfo } = this.props;
    const showPagination = currentResultPageInfo && currentResultPageInfo.total > 1;
    if (this.getIsLoading() || !showPagination) {
      return null;
    }
    return [{
      label: '<',
      onClick: this.handleRequestPrevious,
      className: typography.phil
    }, {
      label: '>',
      onClick: this.handleRequestNext,
      className: typography.phil
    }];
  }

  getIsNewRoute = (prevProps) => {
    return !equals(
      omit(['page'], this.props.activeRoute.params),
      omit(['page'], prevProps.activeRoute.params)
    );
  }

  getIsNewResult = (prevProps) => {
    const { currentResult, loadingStatus } = this.props;

    if (currentResult && loadingStatus === loadingStates.COMPLETE) {
      // is first result...
      if (prevProps.loadingStatus === loadingStates.LOADING) {
        return true;
      }
      // if is a change of result
      if (
        currentResult &&
        prevProps.currentResult &&
        currentResult.get('id') !== prevProps.currentResult.get('id')
      ) {
        return true;
      }
    }
    return false;
  }

  getIsLoading = () => {
    const { loadingStatus } = this.props;
    return loadingStatus === loadingStates.LOADING;
  }

  getImgSrc = (result, srcKey) => {
    const { configuration } = this.props;
    const src = result.get(srcKey);
    
    if (src) {
      return `${configuration.getIn(['images', 'base_url'])}w780${src}`;
    }

    return null;
  }

  handlePaginationRequest = (previous) => {
    const { track } = this.props;
    track('results-pagination-button', previous ? 'previous' : 'next');
    this.props.requestNext({
      moodForKey: this.props.moodForKey,
      previous
    });
  }

  handleRequestNext = () => {
    this.handlePaginationRequest(false);
  }

  handleRequestPrevious = () => {
    this.handlePaginationRequest(true);
  }

  renderResult = () => {
    const { currentResult, currentResultPageInfo, currentMedia,
      currentResultItunes, currentResultNetflix, track,
      currentPersonName, navigateTo, configuration, cast, crew
    } = this.props;

    if (!currentResult) {
      return (
        <NoResults
          currentMedia={currentMedia}
          className={styles.noResults}
        />
      );
    }

    const releaseDateLabel = moodSelectors.getMediaReleaseDateLabel(currentMedia);
    const titleLabel = moodSelectors.getMediaTitleLabel(currentMedia);

    const resultProps = {
      track,
      navigateTo,
      className: styles.result,
      title: currentResult.get(titleLabel),
      overview: currentResult.get('overview'),
      posterImgSrc: this.getImgSrc(currentResult, 'poster_path'),
      imgSrc: this.getImgSrc(currentResult, 'backdrop_path'),
      voteCount: currentResult.get('vote_count'),
      voteAverage: currentResult.get('vote_average'),
      popularity: currentResult.get('popularity'),
      genreIds: currentResult.get('genre_ids').toArray(),
      releaseDate: currentResult.get(releaseDateLabel),
      netflix: currentResultNetflix,
      iTunes: currentResultItunes,
      currentResultPageInfo,
      currentMedia,
      currentPersonName,
      peopleImgBaseUrl: `${configuration.getIn(['images', 'base_url'])}w185`,
      cast,
      crew
    };

    return (<Result {...resultProps} />);
  }

  render() {
    const { loadingStatus, currentResult } = this.props;
    const getIsLoaded = currentResult &&
      loadingStatus === loadingStates.COMPLETE;
    const headerClassNames = classnames(
      styles.header, {
        [styles.loadedHeader]: getIsLoaded
      }
    );
    return (
      <div className={classnames(styles.currentResult)}>
        <Loading className={styles.loading} loadingStatus={loadingStatus}>
          <div className={styles.resultWrapper}>
            <Header
              className={headerClassNames}
              menuItems={this.getHeaderMenuItems()}
            />
            { this.renderResult() }
          </div>
        </Loading>
      </div>
    );
  }
}

Results.propTypes = {
  currentMedia: PropTypes.string.isRequired,
  requestResults: PropTypes.func.isRequired,
  requestCredits: PropTypes.func.isRequired,
  track: PropTypes.func.isRequired,
  navigateTo: PropTypes.func.isRequired,
  isOnNetflix: PropTypes.func.isRequired,
  isOnItunes: PropTypes.func.isRequired,
  requestNext: PropTypes.func.isRequired,
  /* eslint react/forbid-prop-types: 0 */
  currentResult: PropTypes.object,
  /* eslint react/forbid-prop-types: 0 */
  currentResultNetflix: PropTypes.object,
  /* eslint react/forbid-prop-types: 0 */
  currentResultItunes: PropTypes.object,
  /* eslint react/forbid-prop-types: 0 */
  nextResult: PropTypes.object,
  /* eslint react/forbid-prop-types: 0 */
  currentResultPageInfo: PropTypes.object,
  loadingStatus: PropTypes.string.isRequired,
  /* eslint react/forbid-prop-types: 0 */
  configuration: PropTypes.object,
  /* eslint react/forbid-prop-types: 0 */
  activeRoute: PropTypes.object.isRequired,
  moodForKey: PropTypes.string.isRequired,
  currentPersonName: PropTypes.string,
  /* eslint react/forbid-prop-types: 0 */
  cast: PropTypes.object.isRequired,
  /* eslint react/forbid-prop-types: 0 */
  crew: PropTypes.object.isRequired
};

export const Connected = connect(mapStateToProps, mapDispatchToProps)(Results);
