import * as React from "react";

import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import { Container, CssBaseline, Box } from "@material-ui/core";
import { Link } from "react-router-dom";

const AwesomeProjectExample = require("../assets/AwesomeProjectExample.png");

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      color: "black",
    },
    mainImageBox: {
      minHeight: "35vh",
      //minWidth: "50vw",
      margin: "16px auto",
      padding: "32px 16px",
      borderRadius: "16px",
      backgroundImage: "linear-gradient(#38a3a5, #57cc99)",
      color: "whitesmoke",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    awesomeFont: {
      color: "#57cc99",
    },
    mainImage: {
      width: "65%",
      height: "65%",
      borderRadius: "8px",
    },
  })
);

const Home: React.FunctionComponent<any> = (props: any) => {
  const classes = useStyles();

  return (
    <Container>
      <CssBaseline />
      <Box className={classes.mainImageBox}>
        <h1>AwesomeProject will make your projects <span className={classes.awesomeFont}>awesome.</span></h1>
        <img className={classes.mainImage} src={AwesomeProjectExample}/>
      </Box>
    </Container>
  );
};

export default Home;
