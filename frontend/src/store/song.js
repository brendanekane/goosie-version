import { csrfFetch } from './csrf';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// USING REDUX TOOLKIT

export const fetchSongs = createAsyncThunk('songs/load', async (showId) => {
  const response = await csrfFetch(`/api/shows/${showId}/songs`);

  if (response.ok) {
    const songs = await response.json();
    return songs;
  }
});

const initialState = {
  data: {},
  status: 'idle',
  error: null,
};

export const songSlice = createSlice({
  name: 'song',
  initialState,
  reducers: {
    // loadSongs: (state, action) => {
    //   state.songs[action.payload[0].showId] = action.payload;
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSongs.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchSongs.fulfilled, (state, action) => {
        state.status = 'succeeded';
        console.log(action);
        state.data[action.payload[0].showId] = action.payload;
      })
      .addCase(fetchSongs.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

const songReducer = songSlice.reducer;

export default songReducer;

// OLD STYLE OF REDUX

// const LOAD_SONGS = 'songs/load';

// const loadSongs = (songs) => ({
//   type: LOAD_SONGS,
//   songs,
// });

// export const fetchSongs = (showId) => async (dispatch) => {
//   const response = await csrfFetch(`/api/shows/${showId}/songs`);

//   if (response.ok) {
//     const songs = await response.json();
//     dispatch(loadSongs(songs));
//     return songs;
//   }
// };

// const firstState = {};

// const songReducer = (state = firstState, action) => {
//   switch (action.type) {
//     case LOAD_SONGS:
//       const allShowSongs = {};
//       allShowSongs[action.songs[0].showId] = action.songs;
//       return { ...state, ...allShowSongs };
//     default:
//       return state;
//   }
// };

// export default songReducer;
