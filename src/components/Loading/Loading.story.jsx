import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, select, text } from '@storybook/addon-knobs';
import loadingStates from '../../constants/loadingStates';
import Loading from './Loading';
import Story from '../../storybook/story';
import styles from '../../storybook/story.css';

storiesOf('Loading', module)
  .addDecorator(withKnobs)
  .add('hmm', () => (
    <Story
      title="Loading"
      summary="Used while loading something"
    >
      <Loading
        loadingStatus={select('loadingStatus', Object.values(loadingStates), loadingStates.LOADING)}
        loadingText={text('loadingText', 'Finding movies')}
      >
        <div className={styles.padded}>
          Something being loaded
        </div>
      </Loading>
    </Story>
  ));
