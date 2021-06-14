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

function BetDetails(props) {
  const { bet, detailsBetSuccess, detailsBetError, detailsBetClean } = props;
  const bet_id = parseInt(useParams().id);

  useEffect(() => {
    ApiServices.detailsBetApi(bet_id)
      .then(detailsBetSuccess)
      .catch(detailsBetError);
    return () => detailsBetClean();
  }, [detailsBetSuccess, detailsBetError, detailsBetClean]);

  return (
    <div>
      <p>{bet.descrizione}</p>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(BetDetails);
