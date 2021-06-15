import { Box, makeStyles } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ApiServices } from "../../services/ApiServices";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: "500px",
    padding: "20px",
    backgroundColor: "white",
    boxShadow: "0 0 10px lightgray",
    borderRadius: "5px",
  },
  title: {
    marginBottom: "10px",
  },
  match: {
    margin: "30px 0",
  },
  quota: {
    height: "35px",
    width: "40px",
    margin: "0 10px",
    display: "inline-block",
    border: "1px solid #3f51bf",
    borderRadius: "5px",
    textAlign: "center",
    lineHeight: "35px",
    "&:hover, &.active": {
      background: "#3f51bf",
      color: "white",
    },
  },
  link: {
    color: "#3f51bf",
    textDecoration: "none",
  },
}));

function DetailsBet() {
  const classes = useStyles();
  const bet_id = parseInt(useParams().id);
  const [bet, setBet] = useState({});

  useEffect(() => {
    ApiServices.detailsBetApi(bet_id).then(setBet).catch(console.log);
  }, [bet_id]);

  return (
    <div>
      {Object.keys(bet).length ? (
        <Box className={classes.root}>
          <Box display="flex" justifyContent="space-between">
            <h2 className={classes.title}>Dettaglio partita</h2>
            <Link to="/" className={classes.link}>
              Indietro
            </Link>
          </Box>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            className={classes.match}
          >
            <h2>{bet.descrizione}</h2>
          </Box>
          <Box display="flex" justifyContent="center">
            <table>
              <thead>
                <th>1</th>
                <th>X</th>
                <th>2</th>
                <th>1X</th>
                <th>2X</th>
                <th>12</th>
              </thead>
              <tbody>
                {bet.betList["1X2"].map((quota, index) => (
                  <td key={quota}>
                    <span className={classes.quota}>{quota}</span>
                  </td>
                ))}
                {bet.betList["DC"].map((quota, index) => (
                  <td key={quota}>
                    <span className={classes.quota}>{quota}</span>
                  </td>
                ))}
              </tbody>
            </table>
          </Box>
        </Box>
      ) : (
        <p>Errore</p>
      )}
    </div>
  );
}

export default DetailsBet;
