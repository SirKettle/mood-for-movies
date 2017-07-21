import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, number, text } from '@storybook/addon-knobs';
import Movie from './Movie';
import Story from '../../storybook/story';
import GENRES from '../../constants/movieGenres';
// import styles from '../../storybook/story.css';

const getGenresIds = () => {
  const genreIds = [];
  Object.keys(GENRES).forEach((key, index) => {
    const genreId = GENRES[key];
    if (boolean(key, false)) {
      genreIds.push(genreId);
    }
  });
  return genreIds;
};

const getProps = () => ({
  title: text('title', 'The Movie Title II'),
  overview: text('overview', 'This is the movie summary. A little bit of info about the plot and the characters may be found here.'),
  posterImgSrc: text('posterImgSrc', '') || null,
  imgSrc: text('backdropImgSrc', '') || null,
  voteCount: number('voteCount', 345),
  voteAverage: number('voteAverage', 6, {
    range: true,
    min: 1,
    max: 10,
    step: 0.1
  }),
  popularity: number('popularity', 1.3453),
  genreIds: getGenresIds(),
  releaseDate: text('releaseDate', '1989-07-07')
});

storiesOf('Movie', module)
  .addDecorator(withKnobs)
  .add('component', () => (
    <Story
      title="Movie"
      summary="Used while loading something"
    >
      <Movie {...getProps()} />
    </Story>
  ));
