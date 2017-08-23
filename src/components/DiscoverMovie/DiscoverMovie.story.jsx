import React from 'react';
import Immutable from 'immutable';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean } from '@storybook/addon-knobs';
import { DiscoverMovie } from './DiscoverMovie';
import Story from '../../storybook/story';
import MOODS from '../../constants/moods';
// import styles from '../../storybook/story.css';

const getSelected = () => {
  const selected = [];
  Object.keys(MOODS).forEach((key) => {
    if (boolean(key, false)) {
      selected.push(key);
    }
  });
  return Immutable.List(selected);
};

const getProps = () => ({
  track: () => {},
  requestMovies: () => {},
  requestSetMood: () => {},
  genreGroups: [],
  moodForKey: getSelected().size ? 'something' : '',
  moodsSelected: getSelected()
});

storiesOf('DiscoverMovie', module)
  .addDecorator(withKnobs)
  .add('view', () => (
    <Story
      title="DiscoverMovie"
      summary="View which displays the mood options plus actions"
      displayInfo={boolean('displayInfo', false)}
    >
      <DiscoverMovie {...getProps()} />
    </Story>
  ));
