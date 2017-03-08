import { createSelector } from 'reselect';

export const modelSelector = (state) => {
  /* eslint-disable no-debugger */
  // debugger;
  return state.twitter;
};

export const tweetsSelector = createSelector(
  modelSelector,
  model => model.get('data')
);
