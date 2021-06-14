import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {
  Container,
  createMuiTheme,
  ThemeProvider,
  CssBaseline,
} from "@material-ui/core";
import { useMemo } from "react";

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
      <Container maxWidth="md">
        <Router>
          <Switch>
            <Route exact path="/">
              Home
            </Route>
            <Route path="/:id">Dettaglio</Route>
          </Switch>
        </Router>
      </Container>
    </ThemeProvider>
  );
}

export default App;
