import { createSelector } from 'reselect';
import { SERVICES } from './availabilityActions';
import { currentMovieSelector } from '../movies/moviesSelectors';

export const availabilitySelector = state => state.availability;

export const currentMovieNetflixSelector = createSelector(
  availabilitySelector,
  currentMovieSelector,
  (availability, currentMovie) => {
    if (!availability || !currentMovie) {
      return null;
    }
    return availability.getIn([currentMovie.get('id'), SERVICES.NETFLIX, 'data']) || null;
  }
);

const getIsMatch = (result, currentMovie) => {
  const trackName = result.get('trackName');
  const releaseDate = result.get('releaseDate');
  if (trackName && trackName.indexOf(currentMovie.get('title')) !== -1) {
    return Boolean(releaseDate &&
      releaseDate.slice(0, 4) === currentMovie.get('release_date').slice(0, 4));
  }
  return false;
};

export const currentMovieItunesSelector = createSelector(
  availabilitySelector,
  currentMovieSelector,
  (availability, currentMovie) => {
    if (!availability || !currentMovie) {
      return null;
    }
    const itunesData = availability.getIn([currentMovie.get('id'), SERVICES.ITUNES, 'data']);

    if (!itunesData) {
      return null;
    }

    const matches = itunesData.get('results').filter(result => getIsMatch(result, currentMovie));

    if (matches.get(0)) {
      return matches.get(0);
    }

    const getIsMaybeMatch = result => Boolean(result.get('trackName') === currentMovie.get('title'));
    const maybes = itunesData.get('results').filter(getIsMaybeMatch);

    return maybes.get(0) || null;
  }
);
