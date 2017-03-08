
export const actionTypes = {
  LOAD_TWEETS_PENDING: 'LOAD_TWEETS_PENDING',
  LOAD_TWEETS_SUCCESS: 'LOAD_TWEETS_SUCCESS',
  LOAD_TWEETS_ERROR: 'LOAD_TWEETS_ERROR'
};

export const loadTweets = () => {
  return {
    type: actionTypes.LOAD_TWEETS_PENDING
  };
};
