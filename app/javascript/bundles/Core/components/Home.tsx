import * as React from "react";

import { useHistory } from "react-router-dom";

import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import { Container, CssBaseline, Box, Button } from "@material-ui/core";
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
    detailBox: {
      backgroundColor: "#38a3a5",
      color: "white",
      margin: "16px auto",
      borderRadius: "16px",
      boxShadow:
        "0px 2px 4px rgba(0, 0, 0, 0.16), 0px 2px 8px rgba(0, 0, 0, 0.32)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    registrationBox: {
      backgroundImage: "linear-gradient(#57cc99, #38a3a5)",
      margin: "16px auto",
      padding: "32px",
      borderRadius: "16px",
      color: "whitesmoke",
    },
    signUpToday: {
      backgroundColor: "#57cc99",
      //border: "1px solid #38a3a5",
      borderRadius: "8px",
      boxShadow:
        "0px 2px 4px rgba(0, 0, 0, 0.16)",
      padding: "12px",
      cursor: "pointer",
      "&:hover": {
        boxShadow:
        "0px 2px 4px rgba(0, 0, 0, 0.16), 0px 2px 8px rgba(0, 0, 0, 0.32)",
      },
    },
    awesomeFont: {
      color: "#57cc99",
    },
    detailHeading: {
      margin: "8px auto",
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

  const history = useHistory();

  const register = () => {
    history.push("/app/signup");
  };

  return (
    <Container>
      <CssBaseline />
      <Box className={classes.mainImageBox}>
        <h1>
          AwesomeProject will make your projects{" "}
          <span className={classes.awesomeFont}>awesome.</span>
        </h1>
        <img className={classes.mainImage} src={AwesomeProjectExample} />
      </Box>
      <Box className={classes.detailBox}>
        <h2 className={classes.detailHeading}>
          <span className={classes.awesomeFont}>Organize</span> Your Tasks
        </h2>
        <ul>
          <li>
            Use buckets and cards to keep track of valuable tasks and
            information
          </li>
          <li>Buckets are containers for overarching points and processes</li>
          <li>
            Cards fill in the details with both title and body sections to edit
          </li>
        </ul>
      </Box>
      <Box className={classes.detailBox}>
        <h2 className={classes.detailHeading}>
          <span className={classes.awesomeFont}>Drag and Drop</span> Elements
        </h2>
        <ul>
          <li>
            Simply drag and drop buckets and cards to rearrange them any way you
            like
          </li>
          <li>
            Buckets can also be closed when you're not using them to reduce
            visual clutter and stay focused on the tasks that matter
          </li>
        </ul>
      </Box>
      <Box className={classes.registrationBox}>
        <h1>Get the project management suite that serves your needs.</h1>
        <h1><span className={classes.signUpToday} onClick={register}>Sign up today.</span></h1>
      </Box>
    </Container>
  );
};

export default Home;
