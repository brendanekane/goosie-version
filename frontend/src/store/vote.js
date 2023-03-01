import { csrfFetch } from './csrf';

const EDIT_VOTE = 'vote/edit';

const editVote = (vote) => ({
  type: EDIT_VOTE,
  vote,
});

export const updateVote = (vote) => async (dispatch) => {
  const response = await csrfFetch(`/api/votes/${vote.id}`, {
    method: 'PUT',
    body: JSON.stringify(vote),
  });
};

const initialState = {};

const voteReducer = (state = initialState, action) => {
  switch (action.type) {
    case EDIT_VOTE:
      return {
        ...state,
        [action.vote.id]: action.vote,
      };
    default:
      return state;
  }
};

export default voteReducer;
