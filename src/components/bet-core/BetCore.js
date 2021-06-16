import { useEffect, useState } from "react";
import { ApiServices } from "../../services/ApiServices";
import { Switch, Route } from "react-router-dom";
import ListBet from "../list-bet/ListBet";
import DetailsBet from "../details-bet/DetailsBet";
import SlipBetting from "../slip-betting/SlipBetting";
import { Grid } from "@material-ui/core";

function BetCore() {
  const [betList, setBetList] = useState([]);
  const [BetDetailsList, setBetDetailList] = useState([]);

  useEffect(() => {
    ApiServices.betListApi().then(setBetList).catch(console.log);
  }, []);

  return (
    <Switch>
      <Grid container spacing={3}>
        <Grid item xs={7}>
          <Route exact path="/">
            <ListBet betList={betList} />
          </Route>
          <Route path="/:id">
            <DetailsBet bet />
          </Route>
        </Grid>
        <Grid item xs={3}>
          <SlipBetting />
        </Grid>
      </Grid>
    </Switch>
  );
}

export default BetCore;
