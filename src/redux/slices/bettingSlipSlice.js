// initial state
const initialState = {
  activeBet: [],
  pot: 0,
  bill: 0,
};

// selectors
export const activeBetSelector = (store) => store.bettingSlipSlice.activeBet;
export const potSelector = (store) => store.bettingSlipSlice.pot;
export const billSelector = (store) => store.bettingSlipSlice.bill;

// actions
const TOOGLE_BET = "TOGGLE_BET";
const SET_POT = "SET_POT";
const SET_BILL = "SET_BILL";
const CLEAR_BET = "CLEAR_BET";
const CLEAR_ALL = "CLEAR_ALL";

export const toogleBetAction = (bet) => ({
  type: TOOGLE_BET,
  bet: bet,
});

export const setPotAction = (pot) => ({
  type: SET_POT,
  pot: pot,
});

export const setBillAction = (bill) => ({
  type: SET_BILL,
  bill: bill,
});

export const clearBetAction = (bet) => ({
  type: CLEAR_BET,
  bet: bet,
});

export const clearAllAction = () => ({
  type: CLEAR_ALL,
});

// reducer
export const BettingSlipReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOOGLE_BET: {
      const e_index = state.activeBet.findIndex(
        (element) => element.idEvento === action.bet.idEvento
      );

      if (e_index >= 0) {
        const newActiveBet = [...state.activeBet];
        const e = newActiveBet.splice(e_index, 1);

        if (e[0].mult_index !== action.bet.mult_index) {
          const newElement = { ...action.bet };
          return { ...state, activeBet: [...newActiveBet, newElement] };
        } else {
          return { ...state, activeBet: newActiveBet };
        }
      } else {
        const newElement = { ...action.bet };
        return { ...state, activeBet: [...state.activeBet, newElement] };
      }
    }
    case SET_POT: {
      return { ...state, pot: action.pot };
    }
    case SET_BILL: {
      return { ...state, bill: action.bill };
    }
    case CLEAR_BET: {
      const e_index = state.activeBet.findIndex(
        (element) => element.idEvento === action.bet.idEvento
      );
      const newActiveBet = [...state.activeBet];
      newActiveBet.splice(e_index, 1);
      return { ...state, activeBet: newActiveBet };
    }
    case CLEAR_ALL: {
      return initialState;
    }
    default:
      return state;
  }
};
