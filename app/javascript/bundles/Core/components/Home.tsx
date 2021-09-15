import * as React from "react";

import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import { Container, CssBaseline, Box } from "@material-ui/core";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      color: "black",
    },
    mainImageBox: {
      minHeight: "50vh",
      minWidth: "100%",
      backgroundImage: "linear-gradient(red, yellow)",
      color: "whitesmoke",
      display: "flex",
      justifyContent: "center",
    },
    awesomeFont: {
      color: "yellow",
    }
  })
);

const Home: React.FunctionComponent = (props) => {
  const classes = useStyles();

  return (
    <Container>
      <CssBaseline />
      <Box className={classes.mainImageBox}>
        <h1>AwesomeProject will make your projects <span className={classes.awesomeFont}>awesome.</span></h1>
      </Box>
    </Container>
  );
};

export default Home;
