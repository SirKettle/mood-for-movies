import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, select } from '@storybook/addon-knobs';
import loadingStates from '../../constants/loadingStates';
import Loading from './Loading';
import Story from '../../storybook/story';

storiesOf('Loading', module)
  .addDecorator(withKnobs)
  .add('hmm', () => (
    <Story
      title="Loading"
      summary="Used while loading something"
    >
      <Loading
        loadingStatus={select('loadingStatus', Object.values(loadingStates), loadingStates.LOADING)}
      >
        <div styles={{ padding: '100px' }}>
          Something being loaded
        </div>
      </Loading>
    </Story>
  ));
