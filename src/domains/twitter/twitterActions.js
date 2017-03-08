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
    /* eslint-disable no-debugger */
    // debugger;
    return response.json();
    // response.status     //=> number 100–599
    // response.statusText //=> String
    // response.headers    //=> Headers
    // response.url        //=> String
  }, (error) => {
    console.log(error);
    // error.message //=> String
  }).then((payload) => {
    console.log(payload);
    dispatch({
      type: actionTypes.LOAD_TWEETS_SUCCESS,
      payload
    });
  });
};
