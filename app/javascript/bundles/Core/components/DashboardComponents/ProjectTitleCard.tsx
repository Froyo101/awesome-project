import * as React from "react";
import axios from "axios";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as DashboardActions from "../../state/actions/DashboardActions";
import * as AlertActions from "../../state/actions/AlertActions";
import { mapStateToPropsDashboard } from "../../state/StateToProps";
import { useHistory } from "react-router-dom";

import { makeStyles, createStyles } from "@material-ui/styles";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Box,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles({
  root: {
    width: "512px",
    margin: "8px",
  },
  title: {
    cursor: "pointer",
  },
  editButton: {
    backgroundColor: "#38a3a5",
    color: "white",
    marginRight: "8px",
  },
  deleteButton: {
    backgroundColor: "#a53838",
    color: "white",
    marginRight: "8px",
  },
  closeIcon: {
    cursor: "pointer",
    verticalAlign: "middle",
  },
});

const ProjectTitleCard: React.FunctionComponent<any> = (props: any) => {
  const actions = bindActionCreators({...DashboardActions, ...AlertActions}, props.dispatch);
  const classes = useStyles();

  let title = props.project.title;

  if (title.length > 64) {
    title = title.slice(0, 62) + "...";
  } else {
    title = title.padEnd(64, " ");
  }

  let history = useHistory();

  const viewProject = () => {
    history.push(`/app/project/${props.project.id}`);
  };

  const [showActions, setShowActions] = React.useState(false);

  const handleDelete = () => {
    axios
      .delete(`http://localhost:3000/projects/${props.project.id}`, {
        withCredentials: true,
      })
      .then((response) => {
        console.log("Project deletion response", response);
        if (response.data.project_deleted) {
          actions.reloadDashboard();
          actions.showAlert("success", "Project successfully deleted!");
        } else {
          actions.showAlert("warning", "Project not deleted - You may not have edit permissions for this project");
        }
      })
      .catch((error) => {
        console.log("Project deletion error", error);
        actions.showAlert("error", "Project not deleted - please refresh the page and try again");
      });
  };

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography
          className={classes.title}
          variant="h5"
          onClick={viewProject}
        >
          {title}
        </Typography>
        <hr />
        <Typography variant="body1">Owner: {props.project.owner}</Typography>
        <Typography variant="body2">
          Last edited: {props.project.updated_at.slice(0, 10)}
        </Typography>
      </CardContent>
      <CardActions>
        {!showActions && (
          <Button size="small" onClick={() => setShowActions(true)}>
            Actions
          </Button>
        )}
        {showActions && (
          <Box>
            <Button
              className={classes.editButton}
              size="small"
              variant="contained"
              onClick={viewProject}
            >
              Edit
            </Button>
            <Button
              className={classes.deleteButton}
              onClick={handleDelete}
              size="small"
              variant="contained"
            >
              Delete <DeleteIcon />
            </Button>
            <CloseIcon
              className={classes.closeIcon}
              onClick={() => setShowActions(false)}
            />
          </Box>
        )}
      </CardActions>
    </Card>
  );
};

export default connect(mapStateToPropsDashboard)(ProjectTitleCard);
