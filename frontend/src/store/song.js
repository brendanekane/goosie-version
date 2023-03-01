import { csrfFetch } from './csrf';

const LOAD_SONGS = 'songs/load';

const loadSongs = (songs) => ({
  type: LOAD_SONGS,
  songs,
});

export const fetchSongs = (showId) => async (dispatch) => {
  const response = await csrfFetch(`/api/shows/${showId}/songs`);

  if (response.ok) {
    const songs = await response.json();
    dispatch(loadSongs(songs));
    return songs;
  }
};

const initialState = {};

const songReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_SONGS:
      const allShowSongs = {};
      allShowSongs[action.songs[0].showId] = action.songs;
      return { ...state, ...allShowSongs };
    default:
      return state;
  }
};

export default songReducer;
