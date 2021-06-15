import { connect } from "react-redux";
import {
  Card,
  CardContent,
  CardActions,
  Button,
  TextField,
  makeStyles,
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
  sliprow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
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
    potCalculation();
  }, [activeBet]);

  return (
    <Card>
      <CardContent>
        {activeBet.map((bet) => (
          <div key={bet.idEvento} className={classes.sliprow}>
            <h4>
              {bet.descrizione}: {bet.quota}x
            </h4>
            <i className="fas fa-minus" onClick={() => clearBet(bet)}></i>
          </div>
        ))}
        <p>{pot} €</p>
        <TextField
          id="puntata"
          label="Puntata"
          type="number"
          onChange={() => potCalculation()}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </CardContent>
      <CardActions>
        <Button variant="contained" color="primary">
          Paga
        </Button>
        <Button variant="contained" onClick={() => clearAll()}>
          Svuota
        </Button>
      </CardActions>
    </Card>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(BettingSlip);
