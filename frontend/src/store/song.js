import { csrfFetch } from './csrf';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchSongs = createAsyncThunk('songs/load', async (showId) => {
  const response = await csrfFetch(`/api/shows/${showId}/songs`);

  if (response.ok) {
    const songs = await response.json();
    return songs;
  }
});

const initialState = {
  songs: {},
  status: 'idle',
  error: null,
};

export const songSlice = createSlice({
  name: 'song',
  initialState,
  reducers: {
    loadSongs: (state, action) => {
      state.songs[action.payload[0].showId] = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSongs.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchSongs.fulfilled, (state, action) => {
        state.status = 'succeeded';
        console.log(action);
        state.songs[action.payload[0].showId] = action.payload;
      })
      .addCase(fetchSongs.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

const songReducer = songSlice.reducer;

export default songReducer;
