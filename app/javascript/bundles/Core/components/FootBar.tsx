import * as React from "react";

import { makeStyles, Box, CssBaseline } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#57cc99",
    color: "white",
    position: "absolute",
    bottom: "0",
    width: "100%",
    height: "128px",
  },
  par: {
    margin: "8px",
    padding: "8px 16px",
  },
});

const FootBar: React.FunctionComponent<any> = () => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <CssBaseline />
      <p className={classes.par}>
        This app was built and designed by Jake Foiles using React, Material UI,
        Ruby on Rails, and React on Rails.
      </p>
      <p className={classes.par}>
        All code available under GNU GPL v3 License on{" "}
        <a href="https://Github.com/Froyo101/awesome-project">GitHub</a>
      </p>
    </Box>
  );
};

export default FootBar;
