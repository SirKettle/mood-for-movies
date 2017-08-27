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

const getSortedCrewArray = (crew, isMovie) => {
  const crewArray = crew.toArray();

  if (isMovie) {
    // Make sure job Director is first.
    const directors = crewArray.filter(person => person.get('job') === 'Director');
    const others = crewArray.filter(person => person.get('job') !== 'Director');
    return directors.concat(others);
  }

  return crewArray;
};

export const currentResultCrewSelector = createSelector(
  currentResultCreditsSelector,
  moodSelectors.isMoviesMediaSelector,
  (currentResultCredits, isMovies) => {
    if (!currentResultCredits) {
      return Immutable.List();
    }
    
    const allCrew = currentResultCredits.get('crew');
    const sortedCrewArray = getSortedCrewArray(allCrew, isMovies);
    const uniqueCrewArray = uniqBy(person => person.get('id'), sortedCrewArray);
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
