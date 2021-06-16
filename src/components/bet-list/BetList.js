import { Box, makeStyles } from "@material-ui/core";
import { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  betListCleanAction,
  betListErrorAction,
  betListSelector,
  betListSuccessAction,
} from "../../redux/slices/betSlice";
import {
  activeBetSelector,
  toogleBetAction,
} from "../../redux/slices/bettingSlipSlice";
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
  rowList: {
    margin: "5px 0",
    padding: "0 10px",
  },
  bet_d: {
    width: "190px",
  },
  resultBox: {
    paddingRight: "43px",
  },
  result: {
    width: "40px",
    margin: "0 10px",
    fontSize: "16px",
    fontWeight: "bold",
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
  betList: betListSelector(state),
  activeBet: activeBetSelector(state),
});

const mapDispatchToProps = (dispatch) => ({
  betListSuccess: (betList) => dispatch(betListSuccessAction(betList)),
  betListError: () => dispatch(betListErrorAction()),
  betListClean: () => dispatch(betListCleanAction()),
  toggleBet: (bet) => dispatch(toogleBetAction(bet)),
});

const typeOfBet = (bet_index) => {
  switch (bet_index) {
    case 0:
      return "1";
    case 1:
      return "X";
    default:
      return "2";
  }
};

function BetList(props) {
  const classes = useStyles();
  const {
    betList,
    activeBet,
    betListSuccess,
    betListError,
    betListClean,
    toggleBet,
  } = props;

  useEffect(() => {
    ApiServices.betListApi().then(betListSuccess).catch(betListError);
    return () => betListClean();
  }, [betListSuccess, betListError, betListClean]);

  const setPlay = (bet, mult_index) => {
    const betReady = { ...bet };
    betReady.type = typeOfBet(mult_index);
    betReady.mult_index = mult_index;
    toggleBet(betReady);
  };

  const isActive = (bet, mult_index) => {
    const e = activeBet.find((element) => element.idEvento === bet.idEvento);
    return e && e.mult_index === mult_index ? true : false;
  };

  return (
    <Box className={classes.root} display="flex" flexDirection="column">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <h2 className={classes.title}>Partite in corso</h2>
        <Box
          display="flex"
          justifyContent="flex-end"
          className={classes.resultBox}
        >
          <span className={classes.result}>1</span>
          <span className={classes.result}>X</span>
          <span className={classes.result}>2</span>
        </Box>
      </Box>
      {betList.map((bet) => (
        <Box
          key={bet.idEvento}
          display="flex"
          alignItems="Center"
          justifyContent="space-between"
          className={classes.rowList}
        >
          <p className={classes.bet_d}>{bet.descrizione}</p>
          <Box display="flex" alignItems="center">
            <div className={classes.quote}>
              {bet.quote.map((quota, index) => (
                <span
                  key={quota}
                  className={
                    classes.quota + " " + (isActive(bet, index) ? "active" : "")
                  }
                  onClick={() => setPlay(bet, index)}
                >
                  {quota.toFixed(2)}
                </span>
              ))}
            </div>
            <Link to={"/" + bet.idEvento} className={classes.link}>
              Dettagli
            </Link>
          </Box>
        </Box>
      ))}
    </Box>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(BetList);
