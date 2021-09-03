import * as React from "react";
import axios from "axios";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";


import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import ListBucket from "./Projects/ListBucket";
import ListCard from "./Projects/ListCard";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));

const ProjectDetailView: React.FunctionComponent<any> = (props: any) => {
  //const actions = bindActionCreators(ProjectActions, props.dispatch)
  const classes = useStyles();

  return (
    <Container component="main">
      <Paper className={classes.paper}>
        <ListBucket id={0} title={"Test Bucket 0"}>
          <ListCard />
          <ListCard />
        </ListBucket>
      </Paper>
    </Container>
  );
}

export default ProjectDetailView;