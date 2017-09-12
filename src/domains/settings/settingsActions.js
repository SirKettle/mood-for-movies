import Cookie from 'js.cookie';
import cookies from '../../constants/cookies';

export const actionTypes = {
  REQUEST_SORT_BY: 'REQUEST_SORT_BY'
};

export const requestSort = sortKey => (dispatch) => {
  dispatch({
    type: actionTypes.REQUEST_SORT_BY,
    payload: sortKey
  });
  
  Cookie.set(cookies.SETTINGS_SORT_KEY, sortKey);
};
