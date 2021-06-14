import { connect } from "react-redux";
import {
  Card,
  CardContent,
  CardActions,
  Button,
  TextField,
} from "@material-ui/core";
import {
  activeBetSelector,
  potSelector,
  clearAllAction,
  setPotAction,
  toogleBetAction,
  setBillAction,
} from "../../redux/slices/bettingSlipSlice";
import { useEffect } from "react";

const mapStateToProps = (state) => ({
  activeBet: activeBetSelector(state),
  pot: potSelector(state),
});

const mapDispatchToProps = (dispatch) => ({
  toogleBet: (bet) => dispatch(toogleBetAction(bet)),
  setPot: (pot) => dispatch(setPotAction(pot)),
  setBill: (bill) => dispatch(setBillAction(bill)),
  clearAll: () => dispatch(clearAllAction()),
});

function BettingSlip(props) {
  const { activeBet, pot, toogleBet, setPot, setBill, clearAll } = props;

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

  const clearSlip = () => {
    setPot(0);
    clearAll();
  };

  return (
    <Card>
      <CardContent>
        {activeBet.map((bet) => (
          <div key={bet.idEvento}>
            <h4>
              {bet.descrizione}: {bet.quota}x
            </h4>
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
        <Button variant="contained" onClick={() => clearSlip()}>
          Svuota
        </Button>
      </CardActions>
    </Card>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(BettingSlip);
