import { makeStyles, Container, Box } from "@material-ui/core";

const useStyle = makeStyles({
  header: {
    marginBottom: "30px",
    backgroundColor: "white",
    boxShadow: "0 0 10px lightgray",
    fontSize: "16px",
  },
  headerContainer: {
    height: "70px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  list: {
    display: "flex",
    listStyle: "none",
  },
  listItem: {
    marginLeft: "10px",
    "&:hover, &.active": {
      color: "#3f51bf",
    },
  },
});

function Header() {
  const classes = useStyle();
  return (
    <header className={classes.header}>
      <Container maxWidth="lg" className={classes.headerContainer}>
        <Box display="flex" alignItems="center">
          <span>Brandname</span>
          <ul className={classes.list}>
            <li className={classes.listItem + " active"}>Home</li>
            <li className={classes.listItem}>Link</li>
            <li className={classes.listItem}>Link</li>
          </ul>
        </Box>
        <Box display="flex" alignItems="center">
          <ul className={classes.list}>
            <li className={classes.listItem}>Accedi</li>
            <li className={classes.listItem}>Registrati</li>
          </ul>
        </Box>
      </Container>
    </header>
  );
}

export default Header;
