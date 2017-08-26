import { createSelector } from 'reselect';
import Immutable from 'immutable';
import { uniqBy } from 'ramda';
import * as resultsSelectors from '../results/resultsSelectors';
import * as moodSelectors from '../mood/moodSelectors';

export const CREW_TO_DISPLAY = 4;

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
    
    const allCrew = currentResultCredits.get('crew');
    const uniqueCrewArray = uniqBy(person => person.get('id'), allCrew.toArray());
    const combinedCrewArray = uniqueCrewArray
    .slice(0, CREW_TO_DISPLAY)
    // This looks a little expensive so lets just
    // calculate on the first 4 which is what we use
    .map((person) => {
      return person.set(
        'jobs', allCrew
          .filter(mem => mem.get('id') === person.get('id'))
          .map(mem => mem.get('job'))
          .join(', ')
      );
    });

    return Immutable.List(combinedCrewArray);
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
