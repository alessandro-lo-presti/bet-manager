import { Card, CardContent, CardActions, makeStyles } from "@material-ui/core";
import { useEffect } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { toogleBetAction } from "../../redux/slices/bettingSlipSlice";
import {
  detailsBetCleanAction,
  detailsBetErrorAction,
  detailsBetSelector,
  detailsBetSuccessAction,
} from "../../redux/slices/detailsBetSlice";
import { ApiServices } from "../../services/ApiServices";

const useStyles = makeStyles((theme) => ({
  quota: {
    height: "35px",
    width: "40px",
    margin: "0 10px",
    display: "inline-block",
    border: "1px solid white",
    borderRadius: "5px",
    textAlign: "center",
    lineHeight: "35px",
    "&:hover, &.active": {
      background: "white",
      color: "#424242",
    },
  },
}));

const mapStateToProps = (state) => ({ bet: detailsBetSelector(state) });

const mapDispatchToProps = (dispatch) => ({
  detailsBetSuccess: (bet) => dispatch(detailsBetSuccessAction(bet)),
  detailsBetError: () => dispatch(detailsBetErrorAction()),
  detailsBetClean: () => dispatch(detailsBetCleanAction()),
  toggleBet: (bet) => dispatch(toogleBetAction(bet)),
});

const typeOfBet = (bet_index) => {
  switch (bet_index) {
    case 1:
      return "1";
    case 2:
      return "X";
    case 3:
      return "2";
    case 4:
      return "1X";
    case 5:
      return "2X";
    default:
      return "12";
  }
};

function BetDetails(props) {
  const classes = useStyles();
  const {
    bet,
    detailsBetSuccess,
    detailsBetError,
    detailsBetClean,
    toggleBet,
  } = props;
  const bet_id = parseInt(useParams().id);

  useEffect(() => {
    ApiServices.detailsBetApi(bet_id)
      .then(detailsBetSuccess)
      .catch(detailsBetError);
    return () => detailsBetClean();
  }, [bet_id, detailsBetSuccess, detailsBetError, detailsBetClean]);

  const setPlay = (bet, mult_index) => {
    const betReady = { ...bet };
    betReady.type = typeOfBet(mult_index);
    betReady.mult_index = mult_index - 1;
    betReady.quote = [...betReady.betList["1X2"], ...betReady.betList["DC"]];
    toggleBet(betReady);
  };

  return (
    <div>
      {Object.keys(bet).length ? (
        <Card>
          <CardContent>
            <h3>{bet.descrizione}</h3>
          </CardContent>
          <CardActions>
            <table>
              <thead>
                <th>1</th>
                <th>X</th>
                <th>2</th>
                <th>1X</th>
                <th>2X</th>
                <th>12</th>
              </thead>
              <tbody>
                {bet.betList["1X2"].map((quota, index) => (
                  <td>
                    <span
                      key={quota}
                      className={classes.quota}
                      onClick={() => setPlay(bet, index + 1)}
                    >
                      {quota}
                    </span>
                  </td>
                ))}
                {bet.betList["DC"].map((quota, index) => (
                  <td>
                    <span
                      key={quota}
                      className={classes.quota}
                      onClick={() => setPlay(bet, index + 1 + 3)}
                    >
                      {quota}
                    </span>
                  </td>
                ))}
              </tbody>
            </table>
          </CardActions>
        </Card>
      ) : (
        <p>Errore</p>
      )}
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(BetDetails);
