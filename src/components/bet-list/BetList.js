import { Box, List, makeStyles } from "@material-ui/core";
import { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  betListCleanAction,
  betListErrorAction,
  betListSelector,
  betListSuccessAction,
} from "../../redux/slices/betSlice";
import { toogleBetAction } from "../../redux/slices/bettingSlipSlice";
import { ApiServices } from "../../services/ApiServices";

const useStyles = makeStyles((theme) => ({
  list: {
    paddingLeft: "25px",
    paddingRight: "25px",
    backgroundColor: theme.palette.background.paper,
  },
  row: {
    margin: "5px 0",
  },
  descrizione: {
    width: "200px",
  },
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

const mapStateToProps = (state) => ({
  betList: betListSelector(state),
});

const mapDispatchToProps = (dispatch) => ({
  betListSuccess: (betList) => dispatch(betListSuccessAction(betList)),
  betListError: () => dispatch(betListErrorAction()),
  betListClean: () => dispatch(betListCleanAction()),
  toggleBet: (bet, mult_index) => dispatch(toogleBetAction(bet, mult_index)),
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
  const { betList, betListSuccess, betListError, betListClean, toggleBet } =
    props;

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

  return (
    <List component="nav" className={classes.list} aria-label="mailbox folders">
      {betList.map((bet) => (
        <Box
          key={bet.idEvento}
          display="flex"
          alignItems="center"
          className={classes.row}
        >
          <div className={classes.descrizione}>{bet.descrizione}</div>
          <div className={classes.quote}>
            {bet.quote.map((quota, index) => (
              <span
                key={quota}
                className={classes.quota}
                onClick={() => setPlay(bet, index)}
              >
                {quota}
              </span>
            ))}
          </div>
          <Link to={"/" + bet.idEvento}>Dettagli</Link>
        </Box>
      ))}
    </List>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(BetList);
