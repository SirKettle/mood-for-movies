import 'whatwg-fetch';

export const actionTypes = {
  REQUEST_SET_MOOD: 'REQUEST_SET_MOOD'
};

export const setMood = (dispatch, moodId, toggleOn = true) => {
  dispatch({
    type: actionTypes.REQUEST_SET_MOOD,
    payload: {
      moodId,
      toggleOn
    }
  });
};
