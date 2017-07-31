import GENRES from './movieGenres';

export default {
  LAUGH: {
    shortLabel: 'Laugh',
    longLabel: 'Make me laugh!',
    genres: [GENRES.Comedy]
  },
  MUSICAL: {
    shortLabel: 'Tra la la!',
    longLabel: 'Sing and dance',
    genres: [GENRES.Music]
  },
  CRY: {
    shortLabel: 'Tears',
    longLabel: 'Make me cry',
    genres: [GENRES.Romance, GENRES.Drama]
  },
  ADVENTURE: {
    shortLabel: 'Adventure',
    longLabel: 'Take me on an adventure!',
    genres: [GENRES.Adventure]
  },
  THRILL: {
    shortLabel: 'Thrill',
    longLabel: 'On the edge of my seat',
    genres: [GENRES.Action, GENRES.Crime, GENRES.Thriller]
  },
  CUDDLE: {
    shortLabel: 'Cuddle',
    longLabel: 'I fancy a snuggle',
    genres: [GENRES.Romance]
  },
  FANTASY: {
    shortLabel: 'Fantasy',
    longLabel: 'Escape this world',
    genres: [GENRES.Fantasy, GENRES.ScienceFiction]
  },
  SCARE: {
    shortLabel: 'Scare',
    longLabel: 'Brown pants time',
    genres: [GENRES.Horror, GENRES.Mystery]
  },
  BLOOD: {
    shortLabel: 'Blood',
    longLabel: 'I want to see some fighting',
    genres: [GENRES.Western, GENRES.War]
  },
  LEARN: {
    shortLabel: 'Learn',
    longLabel: 'Educate me',
    genres: [GENRES.Documentary, GENRES.History]
  },
  FAMILY: {
    shortLabel: 'Family',
    longLabel: 'Kid friendly',
    genres: [GENRES.Family]
  },
  ANIMATION: {
    shortLabel: 'Animation',
    longLabel: 'Some moving illustrations',
    genres: [GENRES.Animation]
  }
};
