import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, select } from '@storybook/addon-knobs';
import loadingStates from '../../constants/loadingStates';
import Loading from './Loading';

storiesOf('Loading', module)
  .addDecorator(withKnobs)
  .add('hmm', () => (
    <Loading loadingStatus={select('loadingStatus', Object.values(loadingStates))}>
      <div styles={{ padding: '100px' }}>
        Something being loaded
      </div>
    </Loading>
  ));
