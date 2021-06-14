// initial state
const initialState = {
  activeBet: [],
  bill: 0,
};

// selectors
export const activeBetSelector = (store) => store.bettingSlipSlice.activeBet;
export const billSelector = (store) => store.bettingSlipSlice.bill;

// actions
const ADD_BET = "ADD_BET";
const REMOVE_BET = "REMOVE_BET";
const SET_BILL = "SET_BILL";
const CLEAR_ALL = "CLEAR_ALL";

export const addBetAction = (bet) => ({
  type: ADD_BET,
  bet: bet,
});

export const removeBetAction = (bet) => ({
  type: REMOVE_BET,
  bet: bet,
});

export const setBillAction = (bill) => ({
  type: SET_BILL,
  bill: bill,
});

export const clearAllAction = (bet) => ({
  type: CLEAR_ALL,
});

// reducer
export const BettingSlipReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_BET:
      return { ...state, activeBet: state.activeBet.push(action.bet) };
    case REMOVE_BET:
      const bet_index = state.activeBet.indexOf(action.bet);
      return {
        ...state,
        activeBet: state.activeBet.splice(bet_index, 1),
      };
    case CLEAR_ALL: {
      return initialState;
    }
    default:
      return state;
  }
};
