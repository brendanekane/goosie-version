// example slice of state for session
// {
//   user: {
//     id,
//     email,
//     username,
//     createdAt,
//     updatedAt
//   }
// }

import { csrfFetch } from './csrf';

const SET_SESSION = 'session/setSession',
  REMOVE_SESSION = 'session/removeSession';

const setSession = (user) => {
  return {
    type: SET_SESSION,
    user,
  };
};

const removeSession = () => {
  return {
    type: REMOVE_SESSION,
  };
};

export const loginAndSetSession = (user) => async (dispatch) => {
  const response = await csrfFetch('/api/session', {
    method: 'POST',
    body: JSON.stringify(user),
  });

  if (response.ok) {
    const user = await response.json();
    dispatch(setSession(user));
    return user;
  }
};

export const restoreUser = () => async (dispatch) => {
  const response = await csrfFetch('/api/session');
  const data = await response.json();
  dispatch(setSession(data.user));
  return response;
};

export const logoutAndRemoveSession = () => async (dispatch) => {};

const initialState = { user: null };

const sessionReducer = (state = initialState, action) => {
  let newState = Object.assign({}, state);
  switch (action.type) {
    case SET_SESSION:
      newState.user = action.user;
      return newState;
    case REMOVE_SESSION:
      newState.user = null;
      return newState;
    default:
      return state;
  }
};

export default sessionReducer;
