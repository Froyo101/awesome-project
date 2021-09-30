import * as React from "react";
import axios from "axios";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as DashboardActions from "../state/actions/DashboardActions";
import { mapStateToPropsDashboardAuth } from "../state/StateToProps";
import { Redirect } from "react-router-dom";

import {
  Container,
  CssBaseline,
  Button,
  Modal,
  Box,
  Paper,
  Grid,
} from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import NewProjectForm from "./DashboardComponents/NewProjectForm";
import ProjectTitleCard from "./DashboardComponents/ProjectTitleCard";
import Pagination from "./DashboardComponents/Pagination";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    topBox: {
      display: "flex",
      justifyContent: "space-between",
      margin: "0px",
    },
    addIcon: {
      verticalAlign: "center",
      marginLeft: "4px",
      paddingBottom: "2px",
    },
    projectsContainer: {
      backgroundColor: "#E8E8E8",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    createProjectButton: {
      color: "white",
      backgroundColor: "#57cc99",
      verticalAlign: "center",
      margin: "8px 0px",
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
      await axios
        .get("http://localhost:3000/projects/all", { withCredentials: true })
        .then((response) => {
          if (response.data.projects_loaded) {
            console.log("Dashboard collection response", response);
            actions.loadProjectsSuccess(response.data.projects);
          }
        })
        .catch((error) => {
          console.log("Dashboard collection error", error);
        });
      //Dispatch no longer loading
    };

    //Gate by if !loading?
    if (!props.dashboardStore.projectsLoaded) fetchProjects();
  }, []);

  const lastProjectIndex =
    props.dashboardStore.currentPage * props.dashboardStore.projectsPerPage;
  const firstProjectIndex =
    lastProjectIndex - props.dashboardStore.projectsPerPage;
  const page = props.dashboardStore.projects.slice(
    firstProjectIndex,
    lastProjectIndex
  );

  if (props.authStore.loggedIn) {
    return (
      <Container>
        <CssBaseline />
        <h2>Dashboard</h2>
        <Box className={classes.topBox}>
          <p> Welcome back, {user.username}</p>
          <Button
            className={classes.createProjectButton}
            variant="contained"
            onClick={() => setOpenProjectForm(true)}
          >
            Create Project
            <AddIcon className={classes.addIcon} />
          </Button>
        </Box>
        {props.dashboardStore.projectsLoaded && (
          <Paper className={classes.projectsContainer}>
            <h1>Current Projects</h1>
            {page.map((project, index) => (
              <ProjectTitleCard key={project.id} project={project} />
            ))}
            <Button
              className={classes.createProjectButton}
              variant="contained"
              onClick={() => setOpenProjectForm(true)}
            >
              Create Project
              <AddIcon className={classes.addIcon} />
            </Button>
            <Pagination />
          </Paper>
        )}
        <Modal open={openProjectForm} onClose={() => setOpenProjectForm(false)}>
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
