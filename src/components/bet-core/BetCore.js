import { useEffect, useState } from "react";
import { ApiServices } from "../../services/ApiServices";
import { Switch, Route } from "react-router-dom";
import ListBet from "../list-bet/ListBet";
import DetailsBet from "../details-bet/DetailsBet";

function BetCore() {
  const [betList, setBetList] = useState([]);
  const [BetDetailsList, setBetDetailList] = useState([]);

  useEffect(() => {
    ApiServices.betListApi().then(setBetList).catch(console.log);
  }, []);

  return (
    <Switch>
      <Route exact path="/">
        <ListBet betList={betList} />
      </Route>
      <Route path="/:id">
        <DetailsBet bet />
      </Route>
    </Switch>
  );
}

export default BetCore;
