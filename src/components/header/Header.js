import { makeStyles, Container, Box } from "@material-ui/core";
import { Link } from "react-router-dom";

const useStyle = makeStyles({
  header: {
    marginBottom: "30px",
    backgroundColor: "white",
    boxShadow: "0 0 10px lightgray",
    fontSize: "16px",
  },
  headerContainer: {
    height: "60px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  brandname: {
    marginRight: "20px",
  },
  list: {
    display: "flex",
    listStyle: "none",
  },
  listItem: {
    marginLeft: "10px",
    color: "black",
    textDecoration: "none",
    "&:hover, &.active": {
      color: "#3f51bf",
    },
  },
});

function Header() {
  const classes = useStyle();
  return (
    <header className={classes.header}>
      <Container maxWidth="md" className={classes.headerContainer}>
        <Box display="flex" alignItems="center">
          <span className={classes.brandname}>Brandname</span>
          <ul className={classes.list}>
            <Link to="/" className={classes.listItem}>
              Home
            </Link>
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
