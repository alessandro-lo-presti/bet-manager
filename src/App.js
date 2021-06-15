import { Provider } from "react-redux";
import store from "./redux/store";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {
  Container,
  createMuiTheme,
  ThemeProvider,
  CssBaseline,
  Box,
} from "@material-ui/core";
import { useMemo } from "react";
import BetList from "./components/bet-list/BetList";
import BetDetails from "./components/bet-details/BetDetails";
import BettingSlip from "./components/betting-slip/BettingSlip";
import Header from "./components/header/Header";

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

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Header />

      <Provider store={store}>
        <Container maxWidth="lg">
          <Box display="flex" justifyContent="space-between">
            <Box>
              <Router>
                <Switch>
                  <Route exact path="/">
                    <BetList />
                  </Route>
                  <Route path="/:id">
                    <BetDetails />
                  </Route>
                </Switch>
              </Router>
            </Box>

            <Box>
              <BettingSlip />
            </Box>
          </Box>
        </Container>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
