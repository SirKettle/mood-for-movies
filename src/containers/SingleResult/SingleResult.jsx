import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { actions as routerActions } from 'redux-router5';
import { loadSingleResult } from '../../domains/results/resultsActions';
import { loadCredits } from '../../domains/credits/creditsActions';
import { requestNetflixAvailability, requestItunesAvailability } from '../../domains/availability/availabilityActions';
import { trackClick } from '../../domains/ui/uiActions';
import * as resultsSelectors from '../../domains/results/resultsSelectors';
import * as routerSelectors from '../../domains/router/routerSelectors';
import * as moodSelectors from '../../domains/mood/moodSelectors';
import * as availabilitySelectors from '../../domains/availability/availabilitySelectors';
import * as creditsSelectors from '../../domains/credits/creditsSelectors';
import loadingStates from '../../constants/loadingStates';
import Loading from '../../components/Loading/Loading';
import Result from '../../components/Result/Result';
import NoResults from '../../components/NoResults/NoResults';
import { Connected as Header } from '../Header/Header';
import styles from '../Results.css';

const mapStateToProps = (state) => {
  return {
    profileImagesBaseUrl: resultsSelectors.profileImagesBaseUrlSelector(state),
    movieImagesBaseUrl: resultsSelectors.movieImagesBaseUrlSelector(state),
    currentResult: resultsSelectors.currentResultSelector(state),
    currentResultNetflix: availabilitySelectors.currentResultNetflixSelector(state),
    currentResultItunes: availabilitySelectors.currentResultItunesSelector(state),
    loadingStatus: resultsSelectors.currentSingleResultLoadingStatusSelector(state),
    activeRoute: routerSelectors.activeRouteSelector(state),
    currentMedia: moodSelectors.currentMediaSelector(state),
    cast: creditsSelectors.currentResultCastSelector(state),
    crew: creditsSelectors.currentResultCrewSelector(state)
  };
};

const mapDispatchToProps = dispatch => ({
  requestSingleResult: () => { dispatch(loadSingleResult()); },
  requestCredits: (result) => { dispatch(loadCredits(result)); },
  isOnNetflix: (result) => { dispatch(requestNetflixAvailability(result)); },
  isOnItunes: (result) => { dispatch(requestItunesAvailability(result)); },
  track: (key, data) => { trackClick(dispatch, key, data); },
  navigateTo: (name, params) => dispatch(routerActions.navigateTo(name, params))
});

export class SingleResult extends Component {

  static defaultProps = {
    currentResult: null,
    currentResultNetflix: null,
    currentResultItunes: null,
    currentPersonName: null,
    profileImagesBaseUrl: null,
    movieImagesBaseUrl: null
  }

  state = {
    swipeClass: null
  }

  componentWillMount() {
    const { requestSingleResult } = this.props;
    requestSingleResult();
  }

  componentDidUpdate(prevProps) {
    const { currentResult, isOnNetflix,
      isOnItunes, requestCredits
    } = this.props;

    if (currentResult && !prevProps.currentResult) {
      isOnNetflix(currentResult);
      isOnItunes(currentResult);
      requestCredits(currentResult);
    }
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

  renderResult = () => {
    const { currentResult, currentMedia,
      currentResultItunes, currentResultNetflix, track,
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
      genreIds: currentResult.get('genres').toArray().map(genre => genre.id),
      releaseDate: currentResult.get(releaseDateLabel),
      netflix: currentResultNetflix,
      iTunes: currentResultItunes,
      currentMedia,
      currentPersonName,
      peopleImgBaseUrl: profileImagesBaseUrl,
      sortBy: null,
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
    return (
      <div className={classnames(styles.currentResult)}>
        <Loading className={styles.loading} loadingStatus={loadingStatus}>
          <div className={styles.resultWrapper}>
            <Header
              className={headerClassNames}
              includeLinks={['search', 'about']}
            />
            { posterImgSrc ?
              (<div className={styles.backdrop} style={{ backgroundImage: `url(${posterImgSrc})` }} />)
              : null
            }
            { this.renderResult() }
          </div>
        </Loading>
      </div>
    );
  }
}

SingleResult.propTypes = {
  currentMedia: PropTypes.string.isRequired,
  requestSingleResult: PropTypes.func.isRequired,
  requestCredits: PropTypes.func.isRequired,
  track: PropTypes.func.isRequired,
  navigateTo: PropTypes.func.isRequired,
  isOnNetflix: PropTypes.func.isRequired,
  isOnItunes: PropTypes.func.isRequired,
  /* eslint react/forbid-prop-types: 0 */
  currentResult: PropTypes.object,
  /* eslint react/forbid-prop-types: 0 */
  currentResultNetflix: PropTypes.object,
  /* eslint react/forbid-prop-types: 0 */
  currentResultItunes: PropTypes.object,
  loadingStatus: PropTypes.string.isRequired,
  profileImagesBaseUrl: PropTypes.string,
  movieImagesBaseUrl: PropTypes.string,
  /* eslint react/forbid-prop-types: 0 */
  // activeRoute: PropTypes.object.isRequired,
  currentPersonName: PropTypes.string,
  /* eslint react/forbid-prop-types: 0 */
  cast: PropTypes.object.isRequired,
  /* eslint react/forbid-prop-types: 0 */
  crew: PropTypes.object.isRequired
};

export const Connected = connect(mapStateToProps, mapDispatchToProps)(SingleResult);
