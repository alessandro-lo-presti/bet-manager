// initial state
const initialState = {
  activeBet: [],
  bill: 0,
};

// selectors
export const activeBetSelector = (store) => store.bettingSlipSlice.activeBet;
export const billSelector = (store) => store.bettingSlipSlice.bill;

// actions
const TOOGLE_BET = "TOGGLE_BET";
const SET_BILL = "SET_BILL";
const CLEAR_ALL = "CLEAR_ALL";

export const toogleBetAction = (bet, mult_index) => ({
  type: TOOGLE_BET,
  bet: bet,
  mult_index: mult_index,
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
    case CLEAR_ALL: {
      return initialState;
    }
    default:
      return state;
  }
};
