import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text } from '@storybook/addon-knobs';
import Movie from './Movie';
import Story from '../../storybook/story';
// import styles from '../../storybook/story.css';

const getProps = () => ({
  title: text('title', 'The Movie Title II'),
  overview: text('overview', 'This is the movie summary. A little bit of info about the plot and the characters may be found here.'),
  posterImgSrc: text('posterImgSrc', '') || null,
  imgSrc: text('backdropImgSrc', '') || null
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
