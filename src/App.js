import { Provider } from "react-redux";
import store from "./redux/store";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {
  Container,
  createMuiTheme,
  ThemeProvider,
  CssBaseline,
} from "@material-ui/core";
import { useMemo } from "react";
import BetList from "./components/bet-list/BetList";
import BetDetails from "./components/bet-details/BetDetails";

function App() {
  const theme = useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: "dark",
        },
      }),
    []
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Provider store={store}>
        <Container maxWidth="md">
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
        </Container>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
