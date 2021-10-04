import * as React from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

import { useDispatch } from "react-redux";
import * as AlertActions from "../../state/actions/AlertActions";

import { Button, Box, TextField, Checkbox } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    modalForm: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      margin: "8px",
    },
    submit: {
      backgroundColor: "#57cc99",
      color: "white",
    }
  })
);

const NewProjectForm: React.FunctionComponent = (props: any) => {
  const classes = useStyles();

  const [title, setTitle] = React.useState("");
  const [publicProject, setPublicProject] = React.useState(false);

  const dispatch = useDispatch();
  let history = useHistory();

  const handleSubmit = (event) => {
    event.preventDefault();

    const baseProject = JSON.stringify([
      {
        id: 0,
        title: "Initial Bucket",
        expanded: true,
        cards: [
          {
            id: 0,
            title: "Initial Card",
            body: "Hello world! Click actions to start editing!",
          },
        ],
      },
    ]);

    axios
      .post(
        "http://localhost:3000/projects",
        {
          project: {
            title: title,
            indexData: {
              curBucketId: 0,
              curCardId: 0,
            },
            public: publicProject,
            content: baseProject,
          },
        },
        { withCredentials: true }
      )
      .then((response) => {
        console.log("project creation res", response);
        if (response.data.status === "created") {
          dispatch({ type: "RELOAD_DASHBOARD" });
          history.push(`/app/project/${response.data.project.id}`);
        } else {
          dispatch(AlertActions.showAlert("warning", "Unable to create project - try again"));
        }
      })
      .catch((error) => {
        console.log("project creation error", error);
        dispatch(AlertActions.showAlert("error", "Something went wrong - please refresh the page and try again"));
      });
  };

  return (
    <form className={classes.modalForm} onSubmit={handleSubmit}>
      <TextField
        name="title"
        variant="outlined"
        required
        fullWidth
        id="title"
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Box>
        <span>Public: </span>
        <Checkbox
          name="publicProject"
          id="public-project"
          value={publicProject}
          onChange={(e) => setPublicProject(e.target.checked)}
        />
      </Box>
      <Button className={classes.submit} type="submit" variant="contained">
        Create Project!
      </Button>
    </form>
  );
};

export default NewProjectForm;
