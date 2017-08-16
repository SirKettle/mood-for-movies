import { createSelector } from 'reselect';
import { SERVICES } from './availabilityActions';
import * as resultsSelectors from '../results/resultsSelectors';
import * as moodSelectors from '../mood/moodSelectors';

export const availabilitySelector = state => state.availability;

export const currentResultNetflixSelector = createSelector(
  availabilitySelector,
  resultsSelectors.currentResultSelector,
  (availability, currentResult) => {
    if (!availability || !currentResult) {
      return null;
    }
    return availability.getIn([currentResult.get('id'), SERVICES.NETFLIX, 'data']) || null;
  }
);

const getIsMatch = (result, currentResult, currentMedia) => {
  const trackName = result.get('trackName') || result.get('artistName');
  const releaseDate = result.get('releaseDate');
  const titleLabel = moodSelectors.getMediaTitleLabel(currentMedia);
  const releaseDateLabel = moodSelectors.getMediaReleaseDateLabel(currentMedia);
  const resultTitle = currentResult.get(titleLabel);
  const resultReleaseDate = currentResult.get(releaseDateLabel);
  if (trackName && trackName.indexOf(resultTitle) !== -1) {
    return Boolean(releaseDate &&
      releaseDate.slice(0, 4) === resultReleaseDate.slice(0, 4));
  }
  return false;
};

export const currentResultItunesSelector = createSelector(
  availabilitySelector,
  resultsSelectors.currentResultSelector,
  moodSelectors.currentMediaSelector,
  (availability, currentResult, currentMedia) => {
    if (!availability || !currentResult) {
      return null;
    }
    const itunesData = availability.getIn([currentResult.get('id'), SERVICES.ITUNES, 'data']);

    if (!itunesData) {
      return null;
    }

    const matches = itunesData.get('results').filter(result => getIsMatch(result, currentResult, currentMedia));

    if (matches.get(0)) {
      return matches.get(0);
    }

    const titleLabel = moodSelectors.getMediaTitleLabel(currentMedia);
    const getIsMaybeMatch = result => Boolean(
      result.get('trackName') === currentResult.get(titleLabel)
    );
    const maybes = itunesData.get('results').filter(getIsMaybeMatch);

    return maybes.get(0) || null;
  }
);
