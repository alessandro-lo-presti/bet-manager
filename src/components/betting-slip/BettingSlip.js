import { connect } from "react-redux";
import {
  Button,
  TextField,
  Typography,
  makeStyles,
  Box,
} from "@material-ui/core";
import {
  activeBetSelector,
  potSelector,
  clearAllAction,
  setPotAction,
  setBillAction,
  clearBetAction,
} from "../../redux/slices/bettingSlipSlice";
import { useEffect, useState } from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "350px",
    padding: "20px",
    backgroundColor: "white",
    boxShadow: "0 0 10px lightgray",
    borderRadius: "5px",
  },
  row: {
    margin: "10px 0",
    padding: "0 30px",
  },
  rowPQ: {
    marginTop: "5px",
  },
  rowList: {
    margin: "5px 0",
    padding: "0 10px",
  },
  title: {
    marginBottom: "10px",
  },
  pot: {
    width: "100px",
  },
  potText: {
    fontSize: "16px",
    fontWeight: "600",
  },
  icon: {
    color: "gray",
  },
  textCenter: {
    textAlign: "center",
  },
  pr10: {
    paddingRight: "10px",
  },
  bet_d: {
    width: "190px",
  },
  bet_q: {
    marginRight: "5px",
    fontWeight: "bold",
  },
}));

const mapStateToProps = (state) => ({
  activeBet: activeBetSelector(state),
  pot: potSelector(state),
});

const mapDispatchToProps = (dispatch) => ({
  clearBet: (bet) => dispatch(clearBetAction(bet)),
  setPot: (pot) => dispatch(setPotAction(pot)),
  setBill: (bill) => dispatch(setBillAction(bill)),
  clearAll: () => dispatch(clearAllAction()),
});

function BettingSlip(props) {
  const classes = useStyles();
  const { activeBet, pot, clearBet, setPot, setBill, clearAll } = props;
  const [quotaTotale, setQuotaTotale] = useState(0);

  const potCalculation = () => {
    let q_tot = activeBet.length === 0 ? 0 : 1;
    const newBill = parseInt(document.getElementById("puntata").value);
    setBill(newBill);

    let newPot = newBill;
    activeBet.forEach((element) => {
      q_tot *= element.quote[element.mult_index];
    });
    setQuotaTotale(q_tot.toFixed(2));
    newPot = isNaN(newPot) ? 0 : Math.round(newPot * q_tot * 100) / 100;
    setPot(newPot);
  };

  useEffect(() => {
    potCalculation();
  }, [activeBet]);

  return (
    <Box className={classes.root} display="flex" flexDirection="column">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <h2 className={classes.title}>Il tuo biglietto</h2>
        <i
          className={"fas fa-times " + classes.icon + " " + classes.pr10}
          onClick={() => clearAll()}
        ></i>
      </Box>
      {activeBet.map((bet) => (
        <Box
          key={bet.idEvento}
          display="flex"
          alignItems="Center"
          justifyContent="space-between"
          className={classes.rowList}
        >
          <p className={classes.bet_d}>{bet.descrizione}</p>
          <p className={classes.bet_q}>
            {bet.type + ": " + bet.quote[bet.mult_index].toFixed(2)}
          </p>
          <i
            className={"fas fa-times " + classes.icon}
            onClick={() => clearBet(bet)}
          ></i>
        </Box>
      ))}
      <Box className={classes.row}>
        <Box
          className={classes.rowPQ}
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography className={classes.potText}>Quota totale</Typography>
          <Typography>{quotaTotale}</Typography>
        </Box>
        <Box
          className={classes.rowPQ}
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography className={classes.potText}>Vincita</Typography>
          <Typography>{pot.toFixed(2)} ???</Typography>
        </Box>
      </Box>
      <Box
        className={classes.row}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <TextField
          id="puntata"
          label="Puntata"
          type="number"
          InputProps={{ inputProps: { min: 0, max: 10000 } }}
          onChange={() => potCalculation()}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <Button variant="contained" color="primary" onClick={() => clearAll()}>
          Paga
        </Button>
      </Box>
    </Box>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(BettingSlip);
