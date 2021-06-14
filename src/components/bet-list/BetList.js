import {
  Box,
  List,
  ListItem,
  ListItemText,
  makeStyles,
} from "@material-ui/core";
import { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  betListCleanAction,
  betListErrorAction,
  betListSelector,
  betListSuccessAction,
} from "../../redux/slices/betSlice";
import { ApiServices } from "../../services/ApiServices";

const useStyles = makeStyles((theme) => ({
  list: {
    paddingLeft: "25px",
    paddingRight: "25px",
    backgroundColor: theme.palette.background.paper,
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

const mapStateToProps = (state) => ({ betList: betListSelector(state) });

const mapDispatchToProps = (dispatch) => ({
  betListSuccess: (betList) => dispatch(betListSuccessAction(betList)),
  betListError: () => dispatch(betListErrorAction()),
  betListClean: () => dispatch(betListCleanAction()),
});

function BetList(props) {
  const classes = useStyles();
  const { betList, betListSuccess, betListError, betListClean } = props;

  useEffect(() => {
    ApiServices.betListApi().then(betListSuccess).catch(betListError);
    return () => betListClean();
  }, [betListSuccess, betListError, betListClean]);

  return (
    <List component="nav" className={classes.list} aria-label="mailbox folders">
      {betList.map((bet) => (
        <Box key={bet.idEvento} display="flex" alignItems="center">
          <div className={classes.descrizione}>{bet.descrizione}</div>
          <div className={classes.quote}>
            {bet.quote.map((quota) => (
              <span key={quota} className={classes.quota}>
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
