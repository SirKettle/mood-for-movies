import React from 'react';
import Immutable from 'immutable';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean } from '@storybook/addon-knobs';
import MoodOptions from './MoodOptions';
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
  moods: MOODS,
  moodsSelected: getSelected(),
  onSelected: (e, key) => { console.log('Selected', key, e); }
});

storiesOf('MoodOptions', module)
  .addDecorator(withKnobs)
  .add('component', () => (
    <Story
      title="MoodOptions"
      summary="Used to select your mood (genres)"
      displayInfo={boolean('displayInfo', false)}
    >
      <MoodOptions {...getProps()} />
    </Story>
  ));
