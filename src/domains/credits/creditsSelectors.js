import { createSelector } from 'reselect';
import Immutable from 'immutable';
import * as resultsSelectors from '../results/resultsSelectors';
import * as moodSelectors from '../mood/moodSelectors';

export const creditsSelector = state => state.credits;

export const currentResultCreditsSelector = createSelector(
  creditsSelector,
  resultsSelectors.currentResultSelector,
  moodSelectors.currentMediaSelector,
  (credits, currentResult, currentMedia) => {
    if (!currentResult) {
      return null;
    }

    return credits.getIn([currentMedia, currentResult.get('id'), 'data']);
  }
);

export const currentResultCrewSelector = createSelector(
  currentResultCreditsSelector,
  (currentResultCredits) => {
    if (!currentResultCredits) {
      return Immutable.List();
    }

    return currentResultCredits.get('crew');
  }
);

export const currentResultCastSelector = createSelector(
  currentResultCreditsSelector,
  (currentResultCredits) => {
    if (!currentResultCredits) {
      return Immutable.List();
    }

    return currentResultCredits.get('cast');
  }
);

export const currentResultDirectorSelector = createSelector(
  currentResultCrewSelector,
  currentResultCrew => currentResultCrew.find(member => member.get('job') === 'Director')
);
