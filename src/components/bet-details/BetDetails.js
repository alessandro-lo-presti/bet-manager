import { Card, CardContent, CardActions, makeStyles } from "@material-ui/core";
import { useEffect } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import {
  detailsBetCleanAction,
  detailsBetErrorAction,
  detailsBetSelector,
  detailsBetSuccessAction,
} from "../../redux/slices/detailsBetSlice";
import { ApiServices } from "../../services/ApiServices";

const mapStateToProps = (state) => ({ bet: detailsBetSelector(state) });

const mapDispatchToProps = (dispatch) => ({
  detailsBetSuccess: (bet) => dispatch(detailsBetSuccessAction(bet)),
  detailsBetError: () => dispatch(detailsBetErrorAction()),
  detailsBetClean: () => dispatch(detailsBetCleanAction()),
});

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

function BetDetails(props) {
  const classes = useStyles();
  const { bet, detailsBetSuccess, detailsBetError, detailsBetClean } = props;
  const bet_id = parseInt(useParams().id);

  useEffect(() => {
    ApiServices.detailsBetApi(bet_id)
      .then(detailsBetSuccess)
      .catch(detailsBetError);
    return () => detailsBetClean();
  }, [bet_id, detailsBetSuccess, detailsBetError, detailsBetClean]);

  return (
    <div>
      {Object.keys(bet).length ? (
        <Card>
          <CardContent>
            <h3>{bet.descrizione}</h3>
          </CardContent>
          <CardActions>
            {bet.betList["1X2"].map((quota) => (
              <span key={quota} className={classes.quota}>
                {quota}
              </span>
            ))}
            {bet.betList["DC"].map((quota) => (
              <span key={quota} className={classes.quota}>
                {quota}
              </span>
            ))}
          </CardActions>
        </Card>
      ) : (
        <p>Errore</p>
      )}
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(BetDetails);
