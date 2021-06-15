import { connect } from "react-redux";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Button,
  TextField,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
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
import { useEffect } from "react";

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
  rowPot: {
    margin: "20px 0",
    padding: "0 30px",
  },
  rowList: {
    margin: "5px 0",
    padding: "0 10px",
  },
  title: {
    marginBottom: "10px",
  },
  pot: {
    marginLeft: "80px",
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

  const potCalculation = () => {
    const newBill = parseInt(document.getElementById("puntata").value);
    setBill(newBill);

    let newPot = newBill;
    activeBet.forEach((element) => {
      newPot *= element.quota;
    });
    newPot =
      newPot === newBill || isNaN(newPot) ? 0 : Math.round(newPot * 100) / 100;
    setPot(newPot);
  };

  useEffect(() => {
    // potCalculation();
  }, [activeBet]);

  return (
    <Box className={classes.root} display="flex" flexDirection="column">
      <Box>
        <h2 className={classes.title}>Il tuo biglietto</h2>
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
          <p className={classes.bet_q}>{bet.tipo + ": " + bet.quota}</p>
          <i
            className={"fas fa-minus " + classes.icon}
            onClick={() => clearBet(bet)}
          ></i>
        </Box>
      ))}
      <Box className={classes.rowPot} display="flex" alignItems="center">
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
        <Box className={classes.pot}>
          <Typography className={classes.potText}>Pot</Typography>
          <Typography className={classes.textCenter}>{pot} €</Typography>
        </Box>
      </Box>
      <Box
        className={classes.row}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Button variant="contained" color="primary">
          Paga
        </Button>
        <Button variant="contained" onClick={() => clearAll()}>
          Reset
        </Button>
      </Box>
    </Box>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(BettingSlip);
