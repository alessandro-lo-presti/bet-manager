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
  textCenter: {
    textAlign: "center",
  },
  table: {
    width: "300px",
    marginBottom: "20px",
    textAlign: "center",
  },
  tableHeader: {
    height: "30px",
    backgroundColor: "#3f51bf",
    color: "white",
  },
}));

const getTableName = (index) => {
  switch (index) {
    case 0:
      return "Esito Finale";
    case 1:
      return "Doppia Chance";
    default:
      return "Under Over 0.5";
  }
};

const getArrayRows = (bet) => {
  const rows = [];

  if (bet) {
    for (let i in bet.betList) {
      rows.push(bet.betList[i]);
    }
  }

  return rows;
};

function DetailsBet({ toggleBet, typeOfBet, isActive }) {
  const classes = useStyles();
  const bet_id = parseInt(useParams().id);
  const [bet, setBet] = useState({});

  useEffect(() => {
    ApiServices.detailsBetApi(bet_id).then(setBet).catch(console.log);
  }, [bet_id]);

  const setPlay = (bet, mult_index) => {
    const betReady = { ...bet };
    betReady.type = typeOfBet(mult_index);
    betReady.mult_index = mult_index;
    betReady.quote = [];

    const quote = getArrayRows(bet);

    quote.forEach(
      (arrayQuote) => (betReady.quote = [...betReady.quote, ...arrayQuote])
    );

    toggleBet(betReady);
  };

  const getColumnsName = (index, length) => {
    const columns = [];

    for (let i = 0; i < length; i++) {
      columns.push(typeOfBet(index + i));
    }

    return columns;
  };

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
          <Box display="flex" flexDirection="column" alignItems="center">
            {getArrayRows(bet).map((row, row_index) => (
              <table key={row} className={classes.table}>
                <thead className={classes.tableHeader}>
                  <tr>
                    <th className={classes.textCenter} colSpan={3}>
                      {getTableName(row_index)}
                    </th>
                  </tr>
                </thead>
                <tbody className={classes.tableBody}>
                  <tr>
                    {getColumnsName(row_index * 3, row.length).map((name) => (
                      <th key={name}>{name}</th>
                    ))}
                  </tr>
                  <tr>
                    {row.map((quota, index) => (
                      <td key={quota}>
                        <span
                          className={
                            classes.quota +
                            " " +
                            (isActive(bet, row_index * 3 + index)
                              ? "active"
                              : "")
                          }
                          onClick={() => setPlay(bet, row_index * 3 + index)}
                        >
                          {quota.toFixed(2)}
                        </span>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            ))}
          </Box>
        </Box>
      ) : (
        <p>Errore</p>
      )}
    </div>
  );
}

export default DetailsBet;
