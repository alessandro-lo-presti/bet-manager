import { useEffect } from "react";
import { connect } from "react-redux";
import {
  betListErrorAction,
  betListSelector,
  betListSuccessAction,
} from "../../redux/slices/betSlice";
import { ApiServices } from "../../services/ApiServices";

const mapStateToProps = (state) => ({ betList: betListSelector(state) });

const mapDispatchToProps = (dispatch) => ({
  betListSuccess: (betList) => dispatch(betListSuccessAction(betList)),
  betListError: () => dispatch(betListErrorAction()),
});

function BetList(props) {
  const { betList, betListSuccess, betListError } = props;

  useEffect(() => {
    ApiServices.betListApi().then(betListSuccess).catch(betListError);
  }, [betListSuccess, betListError]);

  return (
    <div>
      {betList.map((bet) => (
        <div key={bet.idEvento}>
          <p>{bet.descrizione}</p>
          <p>{bet.odds}</p>
        </div>
      ))}
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(BetList);
