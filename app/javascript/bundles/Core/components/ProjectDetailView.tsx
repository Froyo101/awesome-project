import * as React from "react";
import axios from "axios";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as AuthActions from "../state/actions/AuthActions";
import * as ProjectActions from "../state/actions/ProjectActions";
import { mapStateToPropsProject } from "../state/StateToProps";

import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import ProjectBucket from "./Projects/ProjectBucket";
import ProjectCard from "./Projects/ProjectCard";
import { makeStyles } from "@material-ui/core";
import { CssBaseline } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));

const ProjectDetailView: React.FunctionComponent<any> = (props: any) => {
  const actions = bindActionCreators(
    { ...AuthActions, ...ProjectActions },
    props.dispatch
  );
  const classes = useStyles();

  if (props.projectStore.projectLoaded)
    return (
      <Container component="main">
        <CssBaseline />
        <Paper className={classes.paper}>
          <h1>{props.projectStore.title} by {props.projectStore.owner}</h1>
          <p>Shared with: {props.projectStore.sharedWith.join(", ")}</p>
          {props.projectStore.content.map((bucket) => (
            <ProjectBucket
              id={"bucket-" + bucket.id}
              key={bucket.id}
              title={bucket.title}
              cards={bucket.cards}
            />
          ))}
        </Paper>
      </Container>
    );
  else return <h1>Project Loading</h1>;
};

export default connect(mapStateToPropsProject)(ProjectDetailView);
