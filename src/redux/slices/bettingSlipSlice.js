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

export const toogleBetAction = (bet, mult_index) => ({
  type: TOOGLE_BET,
  bet: bet,
  mult_index: mult_index,
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
      // ottiene l'oggetto se è presente
      const e = state.activeBet.find(
        (element) => element.idEvento === action.bet.idEvento
      );

      // controlla se presente
      if (e) {
        //   rimuovo l'oggetto
        const e_index = state.activeBet.findIndex(
          (element) => element.idEvento === action.bet.idEvento
        );
        const newActiveBet = [...state.activeBet];
        newActiveBet.splice(e_index, 1);
        if (e.quota !== action.bet.quote[action.mult_index]) {
          // se la quota selezionata è diversa da quella vecchia inserisco un nuovo oggetto con la quota aggiornata
          const newElement = {
            ...action.bet,
            quota: action.bet.quote[action.mult_index],
          };
          return { ...state, activeBet: [...newActiveBet, newElement] };
        } else {
          return { ...state, activeBet: newActiveBet };
        }
      } else {
        //   non è presente, inserisco l'oggetto passato
        const newElement = {
          ...action.bet,
          quota: action.bet.quote[action.mult_index],
        };
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
