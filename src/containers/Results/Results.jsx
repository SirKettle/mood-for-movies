import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import Swipeable from 'react-swipeable';
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
    profileImagesBaseUrl: resultsSelectors.profileImagesBaseUrlSelector(state),
    movieImagesBaseUrl: resultsSelectors.movieImagesBaseUrlSelector(state),
    currentResult: resultsSelectors.currentResultSelector(state),
    currentResultNetflix: availabilitySelectors.currentResultNetflixSelector(state),
    currentResultItunes: availabilitySelectors.currentResultItunesSelector(state),
    nextResult: resultsSelectors.nextResultSelector(state),
    previousResult: resultsSelectors.previousResultSelector(state),
    currentResultPageInfo: resultsSelectors.currentResultPageInfoSelector(state),
    loadingStatus: resultsSelectors.currentResultsLoadingStatusSelector(state),
    activeRoute: routerSelectors.activeRouteSelector(state),
    moodForKey: moodSelectors.moodForKeySelector(state),
    currentPersonName: moodSelectors.currentPersonNameSelector(state),
    currentMedia: moodSelectors.currentMediaSelector(state),
    sort: resultsSelectors.resultsSortSelector(state),
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
    previousResult: null,
    currentResultPageInfo: null,
    currentResultNetflix: null,
    currentResultItunes: null,
    currentPersonName: null,
    profileImagesBaseUrl: null,
    movieImagesBaseUrl: null,
    sort: null
  }

  state = {
    swipeClass: null
  }

  componentWillMount() {
    const { requestResults } = this.props;
    requestResults();
  }

  componentWillReceiveProps(prevProps) {
    if (this.getIsNewResult(prevProps) && this.state.swipeClass) {
      if (this.state.swipeClass === 'toLeft') {
        this.setState({ swipeClass: 'fromRight' });
        return;
      }
      if (this.state.swipeClass === 'toRight') {
        this.setState({ swipeClass: 'fromLeft' });
        return;
      }
      this.setState({ swipeClass: null });
    }
  }

  componentDidUpdate(prevProps) {
    const { currentResult, nextResult, previousResult, isOnNetflix,
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

      if (previousResult) {
        // preload images for previous result
        preloadImages([
          this.getImgSrc(previousResult, 'poster_path'),
          this.getImgSrc(previousResult, 'backdrop_path')
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
    const { currentResultPageInfo, navigateTo } = this.props;
    const showPagination = currentResultPageInfo && currentResultPageInfo.total > 1;
    if (this.getIsLoading() || !showPagination) {
      return null;
    }
    return [{
      label: 'Settings',
      onClick: () => { navigateTo('settings'); }
    }, {
      label: '<',
      onClick: this.handleRequestPrevious,
      className: classnames(typography.phil, styles.arrowFont)
    }, {
      label: '>',
      onClick: this.handleRequestNext,
      className: classnames(typography.phil, styles.arrowFont)
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
    const { movieImagesBaseUrl } = this.props;
    const src = result.get(srcKey);
    
    if (src) {
      return `${movieImagesBaseUrl}${src}`;
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

  handleSwipeLeft = () => {
    this.setState({ swipeClass: 'toLeft' });
    setTimeout(this.handleRequestNext, 150);
  }

  handleSwipeRight = () => {
    this.setState({ swipeClass: 'toRight' });
    setTimeout(this.handleRequestPrevious, 150);
  }

  renderResult = () => {
    const { currentResult, currentResultPageInfo, currentMedia,
      currentResultItunes, currentResultNetflix, track, sort,
      currentPersonName, navigateTo, profileImagesBaseUrl, cast, crew
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
    const className = classnames(styles.result, {
      [styles[this.state.swipeClass]]: !!this.state.swipeClass
    });

    const resultProps = {
      track,
      navigateTo,
      className,
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
      peopleImgBaseUrl: profileImagesBaseUrl,
      sortBy: sort ? sort.label : null,
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
    const posterImgSrc = currentResult && this.getImgSrc(currentResult, 'poster_path');
    const swipeConfig = {
      delta: 20,
      flickThreshold: 1.8
    };
    return (
      <div className={classnames(styles.currentResult)}>
        <Loading className={styles.loading} loadingStatus={loadingStatus}>
          <Swipeable
            className={styles.resultWrapper}
            onSwipedLeft={this.handleSwipeLeft}
            onSwipedRight={this.handleSwipeRight}
            {...swipeConfig}
          >
            <Header
              className={headerClassNames}
              menuItems={this.getHeaderMenuItems()}
            />
            { posterImgSrc ?
              (<div className={styles.backdrop} style={{ backgroundImage: `url(${posterImgSrc})` }} />)
              : null
            }
            { this.renderResult() }
          </Swipeable>
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
  previousResult: PropTypes.object,
  /* eslint react/forbid-prop-types: 0 */
  currentResultPageInfo: PropTypes.object,
  loadingStatus: PropTypes.string.isRequired,
  profileImagesBaseUrl: PropTypes.string,
  movieImagesBaseUrl: PropTypes.string,
  /* eslint react/forbid-prop-types: 0 */
  activeRoute: PropTypes.object.isRequired,
  moodForKey: PropTypes.string.isRequired,
  /* eslint react/forbid-prop-types: 0 */
  sort: PropTypes.object,
  currentPersonName: PropTypes.string,
  /* eslint react/forbid-prop-types: 0 */
  cast: PropTypes.object.isRequired,
  /* eslint react/forbid-prop-types: 0 */
  crew: PropTypes.object.isRequired
};

export const Connected = connect(mapStateToProps, mapDispatchToProps)(Results);
