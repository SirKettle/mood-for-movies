import React from 'react';
import Immutable from 'immutable';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, number, text } from '@storybook/addon-knobs';
import Result from './Result';
import Story from '../../storybook/story';
import GENRES from '../../constants/movieGenres';
import boysCloseUp from '../../assets/boysCloseUp.jpg';

const getGenresIds = () => {
  const genreIds = [];
  Object.keys(GENRES).forEach((key) => {
    const genreId = GENRES[key];
    if (boolean(key, false)) {
      genreIds.push(genreId);
    }
  });
  return genreIds;
};

const getProps = () => ({
  title: text('title', 'The Result Title II'),
  overview: text('overview', 'This is the movie summary. A little bit of info about the plot and the characters may be found here.'),
  releaseDate: text('releaseDate', '1989-07-07'),
  netflix: boolean('Netflix', true) ?
    Immutable.Map({ show_id: 123456789 }) :
    null,
  iTunes: boolean('iTunes', true) ?
    Immutable.Map({ trackViewUrl: '#' }) :
    null,
  voteCount: number('voteCount', 345),
  voteAverage: number('voteAverage', 6, {
    range: true,
    min: 1,
    max: 10,
    step: 0.1
  }),
  popularity: number('popularity', 1.3453),
  posterImgSrc: text('posterImgSrc', '') || null,
  imgSrc: text('backdropImgSrc', boysCloseUp) || null,
  genreIds: getGenresIds()
});

storiesOf('Result', module)
  .addDecorator(withKnobs)
  .add('component', () => (
    <Story
      title="Result"
      summary="Used while loading something"
      displayInfo={boolean('displayInfo', false)}
    >
      <Result {...getProps()} />
    </Story>
  ));
