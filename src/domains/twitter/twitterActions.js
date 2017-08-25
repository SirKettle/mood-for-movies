import 'whatwg-fetch';

export const actionTypes = {
  LOAD_TWEETS_PENDING: 'LOAD_TWEETS_PENDING',
  LOAD_TWEETS_SUCCESS: 'LOAD_TWEETS_SUCCESS',
  LOAD_TWEETS_ERROR: 'LOAD_TWEETS_ERROR'
};

export const loadTweets = (dispatch) => {
  dispatch({
    type: actionTypes.LOAD_TWEETS_PENDING
  });

  return fetch('http://server.willthirkettle.co.uk/api/tweets.php', {
    method: 'GET'
  }).then((response) => {
    return response.json();
  }, (error) => {
    console.log(error);
  }).then((payload) => {
    dispatch({
      type: actionTypes.LOAD_TWEETS_SUCCESS,
      payload
    });
  });
};
