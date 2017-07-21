import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, number } from '@storybook/addon-knobs';
import Stars from './Stars';
import Story from '../../storybook/story';
import styles from '../../storybook/story.css';

const getProps = () => ({
  percentage: number('percentage', 50, {
    range: true,
    min: 0,
    max: 100,
    step: 1
  }),
  stars: number('stars', 5, {
    range: true,
    min: 1,
    max: 10,
    step: 1
  })
});

storiesOf('Stars', module)
  .addDecorator(withKnobs)
  .add('comp', () => (
    <Story
      title="Stars for ratings"
      summary="Pretty way to display a percentage rating"
    >
      <div className={styles.padded}>
        <Stars {...getProps()} />
      </div>
    </Story>
  ));
