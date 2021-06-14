// initial state
const initialState = {
  betList: [],
};

// selectors
export const betListSelector = (store) => store.betSlice.betList;

// actions
const BET_LIST_SUCCESS = "BET_LIST_SUCCESS";
const BET_LIST_ERROR = "BET_LIST_ERROR";
const BET_LIST_CLEAN = "BET_LIST_CLEAN";

export const betListSuccessAction = (bets) => ({
  type: BET_LIST_SUCCESS,
  betList: bets,
});

export const betListErrorAction = () => ({
  type: BET_LIST_ERROR,
});

export const betListCleanAction = () => ({
  type: BET_LIST_CLEAN,
});

// reducer
export const betReducer = (state = initialState, action) => {
  switch (action.type) {
    case BET_LIST_SUCCESS:
      return { ...state, betList: action.betList };
    case BET_LIST_ERROR:
    case BET_LIST_CLEAN:
      return { ...state, betList: [] };
    default:
      return state;
  }
};
