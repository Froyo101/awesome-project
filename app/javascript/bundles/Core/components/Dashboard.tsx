import * as React from "react";
import axios from "axios";

import { connect } from "react-redux";
import { mapStateToPropsProjectAuth } from "../state/StateToProps";
import { Redirect } from "react-router-dom";

import { Container, CssBaseline, Button, Modal, Box } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core";
import NewProjectForm from "./DashboardComponents/NewProjectForm";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    modal: {
      backgroundColor: "#E8E8E8",
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: "512px",
      padding: "16px",
      borderRadius: "4px",
    },

  })
);

const Dashboard: React.FunctionComponent = (props: any) => {
  const classes = useStyles();
  const user = props.authStore.user;

  const [openProjectForm, setOpenProjectForm] = React.useState(false);

  if (props.authStore.loggedIn) {
    return (
      <Container>
        <CssBaseline />
        <h1>Dashboard</h1>
        <p>Welcome back, {user.username}</p>
        <Button variant="contained" onClick={() => setOpenProjectForm(true)}>
          Create Project
        </Button>
        <Modal
          className={classes.root}
          open={openProjectForm}
          onClose={() => setOpenProjectForm(false)}
        >
          <Box className={classes.modal}>
          <NewProjectForm />
          </Box>
        </Modal>
      </Container>
    );
  } else {
    return <Redirect push to="/app/signin" />;
  }
};

export default connect(mapStateToPropsProjectAuth)(Dashboard);
