import * as React from "react";
import axios from "axios";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as DashboardActions from "../state/actions/DashboardActions";
import { mapStateToPropsDashboardAuth } from "../state/StateToProps";
import { Redirect } from "react-router-dom";

import { Container, CssBaseline, Button, Modal, Box, Paper, Grid } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import NewProjectForm from "./DashboardComponents/NewProjectForm";
import Pagination from "./DashboardComponents/Pagination";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    projectsContainer: {
      backgroundColor: "#E8E8E8",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    createProjectButton: {
      color: "white",
      backgroundColor: "#57cc99",
    },
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
  const actions = bindActionCreators(DashboardActions, props.dispatch);
  const classes = useStyles();
  const user = props.authStore.user;

  const [openProjectForm, setOpenProjectForm] = React.useState(false);

  //The question here will be whether to have continuous checks ("loading") or a one-time flag ("loaded")
  //Continuous checks as commented here will likely not work due to re-mounting caused by accessing the store(s)
  React.useEffect(() => {
    const fetchProjects = async () => {
      //Dispatch loading
      await axios.get("http://localhost:3000/projects/all")
        .then((response) => {
          if (response.data.projects_loaded) {
            console.log("Dashboard collection response", response);
            actions.loadProjectsSuccess(response.data.projects); 
          }
        })
        .catch((error) => {
          console.log("Dashboard collection error", error);
        })
      //Dispatch no longer loading
    }

    //Gate by if !loading?
    if (!props.dashboardStore.projectsLoaded) fetchProjects();
  }, []);

  const lastProjectIndex = props.dashboardStore.currentPage * props.dashboardStore.projectsPerPage;
  const firstProjectIndex = lastProjectIndex - props.dashboardStore.projectsPerPage;
  const page = props.dashboardStore.projects.slice(firstProjectIndex, lastProjectIndex);

  if (props.authStore.loggedIn) {
    return (
      <Container>
        <CssBaseline />
        <h1>Dashboard</h1>
        <p>Welcome back, {user.username}</p>
        <Button className={classes.createProjectButton} variant="contained" onClick={() => setOpenProjectForm(true)}>
          Create Project
          <AddIcon />
        </Button>
        {props.dashboardStore.projectsLoaded &&
        <Paper className={classes.projectsContainer}>
          <h2>Projects</h2>
          {page.map((project, index) => (
            <p style={{display: "block"}} key={index}>{project.title}</p>
          ))}
          <Pagination />
        </Paper>
        }
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

export default connect(mapStateToPropsDashboardAuth)(Dashboard);
