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
    case 5:
      return "12";
    case 6:
      return "U";
    default:
      return "O";
  }
};

const getColumnsName = (index, length) => {
  const columns = [];

  for (let i = 0; i < length; i++) {
    columns.push(typeOfBet(index + i));
  }

  return columns;
};

const getArrayRows = (bet) => {
  const rows = [];

  if (bet) {
    for (let i in bet.betList) {
      rows.push(bet.betList[i]);
    }
  }

  return rows;
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
    betReady.quote = [];

    const quote = getArrayRows(bet);

    quote.forEach(
      (arrayQuote) => (betReady.quote = [...betReady.quote, ...arrayQuote])
    );

    console.log(betReady.quote);

    toggleBet(betReady);
  };

  const isActive = (bet, mult_index) => {
    const e = activeBet.find((element) => element.idEvento === bet.idEvento);
    return e && e.mult_index === mult_index ? true : false;
  };

  return (
    <div>
      {Object.keys(bet).length ? (
        <Box className={classes.root}>
          <Box display="flex" justifyContent="space-between">
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
          <Box display="flex" flexDirection="column" alignItems="flex-start">
            {getArrayRows(bet).map((row, row_index) => (
              <table>
                <thead>
                  {getColumnsName(row_index * 3, row.length).map((name) => (
                    <th>{name}</th>
                  ))}
                </thead>
                <tbody>
                  {row.map((quota, index) => (
                    <td key={quota}>
                      <span
                        className={
                          classes.quota +
                          " " +
                          (isActive(bet, row_index * 3 + index) ? "active" : "")
                        }
                        onClick={() => setPlay(bet, row_index * 3 + index)}
                      >
                        {quota.toFixed(2)}
                      </span>
                    </td>
                  ))}
                </tbody>
              </table>
            ))}
          </Box>
        </Box>
      ) : (
        <p>Errore</p>
      )}
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(BetDetails);
