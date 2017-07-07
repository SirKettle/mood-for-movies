import GENRES from './movieGenres';

export default {
  LAUGH: {
    shortLabel: 'Laugh',
    longLabel: 'Make me laugh!',
    genres: [GENRES.Comedy]
  },
  CRY: {
    shortLabel: 'Cry',
    longLabel: 'I want to have a good cry',
    genres: [GENRES.Romance, GENRES.Drama]
  },
  ADVENTURE: {
    shortLabel: 'Adventure',
    longLabel: 'Take me on a wild adventure!',
    genres: [GENRES.Adventure]
  },
  THRILL: {
    shortLabel: 'Thrill',
    longLabel: 'I want thrills, they\'re electrifying',
    genres: [GENRES.Action, GENRES.Crime, GENRES.Thriller]
  },
  CUDDLE: {
    shortLabel: 'Cuddle',
    longLabel: 'I fancy a snuggle on the sofa',
    genres: [GENRES.Romance]
  },
  FANTASY: {
    shortLabel: 'Fantasy',
    longLabel: 'I want to escape this world',
    genres: [GENRES.Fantasy, GENRES.ScienceFiction]
  },
  SCARE: {
    shortLabel: 'Scare',
    longLabel: 'Make me jump and shit my pants',
    genres: [GENRES.Horror, GENRES.Mystery]
  },
  BLOOD: {
    shortLabel: 'Blood',
    longLabel: 'I want to see gore and all that fake blood',
    genres: [GENRES.Horror, GENRES.War]
  },
  LEARN: {
    shortLabel: 'Learn',
    longLabel: 'Educate me please',
    genres: [GENRES.Documentary, GENRES.History]
  },
  FAMILY: {
    shortLabel: 'Family',
    longLabel: 'With the kids',
    genres: [GENRES.Family]
  }
};
