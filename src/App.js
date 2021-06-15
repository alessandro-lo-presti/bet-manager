import { Provider } from "react-redux";
import store from "./redux/store";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {
  Container,
  createMuiTheme,
  ThemeProvider,
  CssBaseline,
  Grid,
  makeStyles,
} from "@material-ui/core";
import { useMemo } from "react";
import BetList from "./components/bet-list/BetList";
import BetDetails from "./components/bet-details/BetDetails";
import BettingSlip from "./components/betting-slip/BettingSlip";
import Header from "./components/header/Header";

const useStyle = makeStyles({});

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

  const classes = useStyle();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Header />

      <Provider store={store}>
        <Container maxWidth="lg">
          <Grid container spacing={3}>
            <Router>
              <Switch>
                <Route exact path="/">
                  <Grid item xs={9}>
                    <BetList />
                  </Grid>
                </Route>
                <Route path="/:id">
                  <Grid item xs={6}>
                    <BetDetails />
                  </Grid>
                </Route>
              </Switch>
            </Router>

            <Grid item xs={3}>
              <BettingSlip />
            </Grid>
          </Grid>
        </Container>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
