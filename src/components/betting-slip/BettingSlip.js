import { connect } from "react-redux";
import { Card, CardContent, CardActions, Button } from "@material-ui/core";
import {
  activeBetSelector,
  addBetAction,
  billSelector,
  removeBetAction,
  setBillAction,
} from "../../redux/slices/bettingSlipSlice";

const mapStateToProps = (state) => ({
  activeBet: activeBetSelector(state),
  bill: billSelector,
});

const mapDispatchToProps = (dispatch) => ({
  addBet: (bet) => dispatch(addBetAction(bet)),
  removeBet: (bet) => dispatch(removeBetAction(bet)),
  setBill: () => dispatch(setBillAction()),
});

function BettingSlip(props) {
  const { activeBet, bill, addBet, removeBet, setBill } = props;

  return (
    <Card>
      <CardContent>
        {activeBet.map((bet) => {
          <div>{bet.descrizione}</div>;
        })}
      </CardContent>
      <CardActions>
        <Button variant="contained" color="primary">
          Paga
        </Button>
        <Button variant="contained">Elimina</Button>
      </CardActions>
    </Card>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(BettingSlip);
