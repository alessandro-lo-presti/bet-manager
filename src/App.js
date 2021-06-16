import { Provider } from "react-redux";
import store from "./redux/store";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {
  Container,
  createMuiTheme,
  ThemeProvider,
  CssBaseline,
  Grid,
} from "@material-ui/core";
import { useMemo } from "react";
import BetList from "./components/bet-list/BetList";
import BetDetails from "./components/bet-details/BetDetails";
import BettingSlip from "./components/betting-slip/BettingSlip";
import Header from "./components/header/Header";
import ListBet from "./components/list-bet/ListBet";
import DetailsBet from "./components/details-bet/DetailsBet";

function App() {
  const theme = useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: "light",
        },
      }),
    []
  );

  const st = 1;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Provider store={store}>
        <Router>
          <Header />
          <Container maxWidth="md">
            <Grid container spacing={3}>
              {st ? (
                <>
                  <Switch>
                    <Route exact path="/">
                      <Grid item xs={7}>
                        <BetList />
                      </Grid>
                    </Route>
                    <Route path="/:id">
                      <Grid item xs={7}>
                        <BetDetails />
                      </Grid>
                    </Route>
                  </Switch>

                  <Grid item xs={3}>
                    <BettingSlip />
                  </Grid>
                </>
              ) : (
                <>
                  <Grid item xs={12}>
                    <Switch>
                      <Route exact path="/">
                        <ListBet />
                      </Route>
                      <Route path="/:id">
                        <DetailsBet />
                      </Route>
                    </Switch>
                  </Grid>
                </>
              )}
            </Grid>
          </Container>
        </Router>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
