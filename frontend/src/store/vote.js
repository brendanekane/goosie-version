import { csrfFetch } from './csrf';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchSongVotes = createAsyncThunk('votes/load', async (songId) => {
  const response = await csrfFetch(`/api/votes/songs/${songId}`);
  if (response.ok) {
    const votes = await response.json();
    return votes;
  }
});

export const updateVote = createAsyncThunk('votes/update', async (data) => {
  const response = await csrfFetch(`/api/votes/update`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
  if (response.ok) {
    const vote = await response.json();
    // debugger;
    return vote;
  }
});

const initialState = {
  data: {},
  status: 'idle',
  error: null,
};

export const voteSlice = createSlice({
  name: 'vote',
  initialState,
  reducers: {
    loadVotes: (state, action) => {
      state.status = 'succeeded';
      state.data[action.payload[0].songId] = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSongVotes.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchSongVotes.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data[action.payload[0].songId] = action.payload;
      })
      .addCase(fetchSongVotes.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(updateVote.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(updateVote.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // TODO not sure if this is putting updated votes into the store properly
        console.log(action.payload);
        state.data[action.payload[1].songId].push(action.payload[1]);
      })
      .addCase(updateVote.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { loadVotes } = voteSlice.actions;

const voteReducer = voteSlice.reducer;

export default voteReducer;
