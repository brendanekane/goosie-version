import { csrfFetch } from './csrf';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// USING REDUX TOOLKIT

export const createOneShow = createAsyncThunk('shows/create', async (show) => {
  const response = await csrfFetch('/api/shows', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(show),
  });

  if (response.ok) {
    const show = await response.json();
    return show;
  }
});

export const fetchOneShow = createAsyncThunk('shows/load_one', async (id) => {
  const response = await fetch(`/api/shows/${id}`);

  if (response.ok) {
    const show = await response.json();
    return show;
  }
});

export const fetchAllShows = createAsyncThunk('shows/load_all', async () => {
  const response = await fetch('api/shows');

  if (response.ok) {
    const shows = await response.json();
    return shows;
  }
});

const initialState = {
  data: {},
  status: 'idle',
  error: null,
};

export const showSlice = createSlice({
  name: 'show',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOneShow.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchOneShow.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data[action.payload.id] = action.payload;
      })
      .addCase(fetchOneShow.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchAllShows.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllShows.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchAllShows.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(createOneShow.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createOneShow.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(createOneShow.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

const showReducer = showSlice.reducer;

export default showReducer;

// USING OLD REDUX WAY

// const LOAD_SHOWS = 'shows/load';
// const ADD_SHOW = 'shows/add';

// const loadAllShows = (shows) => ({
//   type: LOAD_SHOWS,
//   shows,
// });

// const addShow = (show) => ({
//   type: ADD_SHOW,
//   show,
// });

// export const getOneShow = (id) => async (dispatch) => {
//   const response = await fetch(`/api/shows/${id}`);

//   if (response.ok) {
//     const show = await response.json();
//     dispatch(loadAllShows([show]));
//     return show;
//   }
// };

// export const getAllShows = () => async (dispatch) => {
//   const response = await fetch('/api/shows');

//   if (response.ok) {
//     const shows = await response.json();
//     dispatch(loadAllShows(shows));
//     return shows;
//   }
// };

// export const createOneShow = (show) => async (dispatch) => {
//   const response = await csrfFetch('/api/shows', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(show),
//   });

//   if (response.ok) {
//     const show = await response.json();
//     dispatch(addShow(show));
//     return show;
//   }
// };

// const firstState = {};

// const showReducer = (state = firstState, action) => {
//   switch (action.type) {
//     case LOAD_SHOWS:
//       const allShows = {};
//       action.shows.forEach((show) => (allShows[show.id] = show));
//       return { ...state, ...allShows };
//     case ADD_SHOW:
//       return {
//         ...state,
//         [action.show.id]: action.show,
//       };
//     default:
//       return state;
//   }
// };

// export default showReducer;

// export const createOneShow = (show) => async (dispatch) => {
// const response = await csrfFetch('/api/shows', {
//   method: 'POST',
//   headers: { 'Content-Type': 'application/json' },
//   body: JSON.stringify(show),
// });

// if (response.ok) {
//   const show = await response.json();
//   dispatch(addShow(show));
//   return show;
// }
// };
