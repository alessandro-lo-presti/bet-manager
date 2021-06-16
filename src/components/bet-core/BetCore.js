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
  const [activeBet, setActiveBet] = useState([]);

  useEffect(() => {
    ApiServices.betListApi().then(setBetList).catch(console.log);
  }, []);

  const toggleBet = (bet) => {
    const e_index = activeBet.findIndex(
      (element) => element.idEvento === bet.idEvento
    );
    const newActiveBet = [...activeBet];

    if (e_index >= 0) {
      const e = newActiveBet.splice(e_index, 1);

      if (e[0].mult_index !== bet.mult_index) {
        const newElement = { ...bet };
        newActiveBet.push(newElement);
      }
    } else {
      const newElement = { ...bet };
      newActiveBet.push(newElement);
    }
    setActiveBet(newActiveBet);
  };

  const isActive = (bet, mult_index) => {
    const e = activeBet.find((element) => element.idEvento === bet.idEvento);
    return e && e.mult_index === mult_index ? true : false;
  };

  const clearBet = (bet) => {
    const e_index = activeBet.findIndex(
      (element) => element.idEvento === bet.idEvento
    );
    const newActiveBet = [...activeBet];
    newActiveBet.splice(e_index, 1);
    setActiveBet(newActiveBet);
  };

  const clearAll = () => setActiveBet([]);

  return (
    <Switch>
      <Grid container spacing={3}>
        <Grid item xs={7}>
          <Route exact path="/">
            <ListBet
              betList={betList}
              toggleBet={toggleBet}
              isActive={isActive}
            />
          </Route>
          <Route path="/:id">
            <DetailsBet bet />
          </Route>
        </Grid>
        <Grid item xs={3}>
          <SlipBetting
            activeBet={activeBet}
            clearBet={clearBet}
            clearAll={clearAll}
          />
        </Grid>
      </Grid>
    </Switch>
  );
}

export default BetCore;
