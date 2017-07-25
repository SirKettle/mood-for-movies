import { createSelector } from 'reselect';
import { currentMovieSelector } from '../movies/moviesSelectors';

export const availabilitySelector = state => state.availability;

export const currentMovieNetflixSelector = createSelector(
  availabilitySelector,
  currentMovieSelector,
  (availability, currentMovie) => {
    if (!availability || !currentMovie) {
      return null;
    }
    return availability.getIn(['netflix', currentMovie.get('id'), 'data']) || null;
  }
);
