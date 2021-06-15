import { Box, makeStyles } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import {
  activeBetSelector,
  toogleBetAction,
} from "../../redux/slices/bettingSlipSlice";
import {
  detailsBetCleanAction,
  detailsBetErrorAction,
  detailsBetSelector,
  detailsBetSuccessAction,
} from "../../redux/slices/detailsBetSlice";
import { ApiServices } from "../../services/ApiServices";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: "500px",
    padding: "20px",
    backgroundColor: "white",
    boxShadow: "0 0 10px lightgray",
    borderRadius: "5px",
  },
  title: {
    marginBottom: "10px",
  },
  match: {
    margin: "30px 0",
  },
  quota: {
    height: "35px",
    width: "40px",
    margin: "0 10px",
    display: "inline-block",
    border: "1px solid #3f51bf",
    borderRadius: "5px",
    textAlign: "center",
    lineHeight: "35px",
    "&:hover, &.active": {
      background: "#3f51bf",
      color: "white",
    },
  },
  link: {
    color: "#3f51bf",
    textDecoration: "none",
  },
}));

const mapStateToProps = (state) => ({
  bet: detailsBetSelector(state),
  activeBet: activeBetSelector(state),
});

const mapDispatchToProps = (dispatch) => ({
  detailsBetSuccess: (bet) => dispatch(detailsBetSuccessAction(bet)),
  detailsBetError: () => dispatch(detailsBetErrorAction()),
  detailsBetClean: () => dispatch(detailsBetCleanAction()),
  toggleBet: (bet) => dispatch(toogleBetAction(bet)),
});

const typeOfBet = (bet_index) => {
  switch (bet_index) {
    case 0:
      return "1";
    case 1:
      return "X";
    case 2:
      return "2";
    case 3:
      return "1X";
    case 4:
      return "2X";
    default:
      return "12";
  }
};

function BetDetails(props) {
  const classes = useStyles();
  const {
    bet,
    activeBet,
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
    betReady.mult_index = mult_index;
    betReady.quote = [...betReady.betList["1X2"], ...betReady.betList["DC"]];
    toggleBet(betReady);
  };

  const isActive = (bet, mult_index) => {
    const e = activeBet.find((element) => element.idEvento === bet.idEvento);
    return e && e.quota === e.quote[mult_index] ? true : false;
  };

  return (
    <div>
      {Object.keys(bet).length ? (
        <Box className={classes.root}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <h2 className={classes.title}>Dettaglio partita</h2>
            <Link to="/" className={classes.link}>
              Indietro
            </Link>
          </Box>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            className={classes.match}
          >
            <h2>{bet.descrizione}</h2>
          </Box>
          <Box display="flex" justifyContent="center">
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
                      className={
                        classes.quota +
                        " " +
                        (isActive(bet, index) ? "active" : "")
                      }
                      onClick={() => setPlay(bet, index)}
                    >
                      {quota}
                    </span>
                  </td>
                ))}
                {bet.betList["DC"].map((quota, index) => (
                  <td>
                    <span
                      key={quota}
                      className={
                        classes.quota +
                        " " +
                        (isActive(bet, index + 3) ? "active" : "")
                      }
                      onClick={() => setPlay(bet, index + 3)}
                    >
                      {quota}
                    </span>
                  </td>
                ))}
              </tbody>
            </table>
          </Box>
        </Box>
      ) : (
        <p>Errore</p>
      )}
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(BetDetails);
