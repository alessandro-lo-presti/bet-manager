// initial state
const initialState = {
  bet: {},
};

// selectors
export const detailsBetSelector = (store) => store.detailsBetSlice.bet;

// actions
const DETAILS_BET_SUCCESS = "DETAILS_BET_SUCCESS";
const DETAILS_BET_ERROR = "DETAILS_BET_ERROR";
const DETAILS_BET_CLEAN = "DETAILS_BET_CLEAN";

export const detailsBetSuccessAction = (bet) => ({
  type: DETAILS_BET_SUCCESS,
  bet: bet,
});

export const detailsBetErrorAction = () => ({
  type: DETAILS_BET_ERROR,
});

export const detailsBetCleanAction = () => ({
  type: DETAILS_BET_CLEAN,
});

// reducer
export const detailsBetReducer = (state = initialState, action) => {
  switch (action.type) {
    case DETAILS_BET_SUCCESS:
      return { ...state, bet: action.bet };
    case DETAILS_BET_ERROR:
    case DETAILS_BET_CLEAN:
      return { ...state, bet: {} };
    default:
      return state;
  }
};
