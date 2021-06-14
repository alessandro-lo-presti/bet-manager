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
  billSelector,
  setBillAction,
  toogleBetAction,
} from "../../redux/slices/bettingSlipSlice";

const mapStateToProps = (state) => ({
  activeBet: activeBetSelector(state),
  bill: billSelector,
});

const mapDispatchToProps = (dispatch) => ({
  toogleBet: (bet) => dispatch(toogleBetAction(bet)),
  setBill: (bill) => dispatch(setBillAction(bill)),
});

function BettingSlip(props) {
  const { activeBet, bill, toogleBet, setBill } = props;

  return (
    <Card>
      <CardContent>
        {activeBet.map((bet) => (
          <div key={bet.idEvento}>{bet.descrizione}</div>
        ))}
      </CardContent>
      <CardActions>
        <TextField
          id="standard-number"
          label="Number"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <Button variant="contained" color="primary">
          Paga
        </Button>
        <Button variant="contained">Elimina</Button>
      </CardActions>
    </Card>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(BettingSlip);
