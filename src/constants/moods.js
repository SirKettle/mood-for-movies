import GENRES from './movieGenres';

export default {
  LAUGH: {
    shortLabel: 'Laugh',
    moodFor: 'Laughs',
    longLabel: 'Make me laugh!',
    genres: [GENRES.Comedy]
  },
  MUSICAL: {
    shortLabel: 'Tra la la!',
    moodFor: 'Singing',
    longLabel: 'Sing and dance',
    genres: [GENRES.Music]
  },
  CRY: {
    shortLabel: 'Tears',
    moodFor: 'Tears',
    longLabel: 'Make me cry',
    genres: [GENRES.Romance, GENRES.Drama]
  },
  ADVENTURE: {
    shortLabel: 'Adventure',
    moodFor: 'Adventure',
    longLabel: 'Take me on an adventure!',
    genres: [GENRES.Adventure]
  },
  THRILL: {
    shortLabel: 'Thrill',
    moodFor: 'Thrills',
    longLabel: 'On the edge of my seat',
    genres: [GENRES.Action, GENRES.Crime, GENRES.Thriller]
  },
  CUDDLE: {
    shortLabel: 'Cuddle',
    moodFor: 'Cuddles',
    longLabel: 'I fancy a snuggle',
    genres: [GENRES.Romance]
  },
  FANTASY: {
    shortLabel: 'Fantasy',
    moodFor: 'Fantasy',
    longLabel: 'Escape this world',
    genres: [GENRES.Fantasy, GENRES.ScienceFiction]
  },
  SCARE: {
    shortLabel: 'Scare',
    moodFor: 'Scares',
    longLabel: 'Brown pants time',
    genres: [GENRES.Horror, GENRES.Mystery]
  },
  BLOOD: {
    shortLabel: 'Blood',
    moodFor: 'Blood',
    longLabel: 'I want to see some fighting',
    genres: [GENRES.Western, GENRES.War]
  },
  LEARN: {
    shortLabel: 'Learn',
    moodFor: 'Learning',
    longLabel: 'Educate me',
    genres: [GENRES.Documentary, GENRES.History]
  },
  FAMILY: {
    shortLabel: 'Family',
    moodFor: 'Family fun',
    longLabel: 'Kid friendly',
    genres: [GENRES.Family]
  },
  ANIMATION: {
    shortLabel: 'Animation',
    moodFor: 'Animation',
    longLabel: 'Some moving illustrations',
    genres: [GENRES.Animation]
  }
};
