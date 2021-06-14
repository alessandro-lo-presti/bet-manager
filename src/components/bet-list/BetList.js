import { List, ListItem, ListItemText, makeStyles } from "@material-ui/core";
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
    width: "100%",
    backgroundColor: theme.palette.background.paper,
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
        <ListItem key={bet.idEvento}>
          <ListItemText>{bet.descrizione}</ListItemText>
          <ListItemText>
            {bet.quote.map((quota) => (
              <span key={quota} className={classes.quota}>
                {quota}
              </span>
            ))}
          </ListItemText>
          <ListItemText>
            <Link to={"/" + bet.idEvento}>Dettagli</Link>
          </ListItemText>
        </ListItem>
      ))}
    </List>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(BetList);
