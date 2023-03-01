import { csrfFetch } from './csrf';

const LOAD_SHOWS = 'shows/load';
const ADD_SHOW = 'shows/add';

const loadAllShows = (shows) => ({
  type: LOAD_SHOWS,
  shows,
});

const addShow = (show) => ({
  type: ADD_SHOW,
  show,
});

export const getAllShows = () => async (dispatch) => {
  const response = await fetch('/api/shows');

  if (response.ok) {
    const shows = await response.json();
    dispatch(loadAllShows(shows));
    return shows;
  }
};

export const createOneShow = (show) => async (dispatch) => {
  const response = await csrfFetch('/api/shows', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(show),
  });

  if (response.ok) {
    const show = await response.json();
    dispatch(addShow(show));
    return show;
  }
};

const initialState = {};

const showReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_SHOWS:
      const allShows = {};
      action.shows.forEach((show) => (allShows[show.id] = show));
      return { ...state, ...allShows };
    case ADD_SHOW:
      return {
        ...state,
        [action.show.id]: action.show,
      };
    default:
      return state;
  }
};

export default showReducer;
