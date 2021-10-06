import * as React from "react";
import axios from "axios";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
//import * as AuthActions from "../state/actions/AuthActions";
import * as ProjectActions from "../state/actions/ProjectActions";
import * as AlertActions from "../state/actions/AlertActions";
import { mapStateToPropsProject } from "../state/StateToProps";
import { useParams, useHistory } from "react-router-dom";

import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import ProjectBucket from "./Projects/ProjectBucket";
import { Theme, createStyles, makeStyles } from "@material-ui/core";
import { CssBaseline } from "@material-ui/core";
import AddElementButton from "./Projects/AddElementButton";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { Box, Button } from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      //width: "100%",
      //padding: "0vw 10vw",
      //margin: "0px",
    },
    paper: {
      backgroundColor: "#E8E8E8",
      marginTop: theme.spacing(8),
      marginBottom: theme.spacing(8),
      marginLeft: "auto",
      marginRight: "auto",
      //minWidth: "80vw",
      //width: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    title: {
      margin: "8px",
    },
    bucketDroppable: {
      width: "100%",
    },
    save: {
      backgroundColor: "#57cc99",
      color: "white",
      marginBottom: "8px",
    },
  })
);

const ProjectDetailView: React.FunctionComponent<any> = (props: any) => {
  const actions = bindActionCreators(
    { ...ProjectActions, ...AlertActions },
    props.dispatch
  );
  const classes = useStyles();

  const { id } = useParams();
  const history = useHistory();

  const loadProject = () => {
    axios
      .get(`https://awesome-project-jf.herokuapp.com/projects/${id}`, { withCredentials: true })
      .then((response) => {
        if (response.data.project_loaded) {
          actions.loadProjectSuccess(response.data.project);
        } else {
          history.push("/app/error");
          actions.showAlert("warning", "Unable to find or display requested project - redirecting now");
        }
      })
      .catch((error) => {
        console.log("Project loading error", error);
        history.push("/app/error");
        actions.showAlert("error", "Something went wrong when fetching your request - redirecting now");
      })
  };

  React.useEffect(() => {
    if (props.projectStore.projectId.toString() !== id.toString())
      loadProject();
  }, [id]);

  const onDragEnd = (result) => {
    const { source, destination, draggableId, type } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (type === "bucket") {
      const newBucketOrder = Array.from(props.projectStore.content);
      const currentBucket = newBucketOrder.splice(source.index, 1);
      newBucketOrder.splice(destination.index, 0, ...currentBucket);

      actions.dndBucket(newBucketOrder);
      return;
    }

    if (type === "card") {
      const newCardOrder: any = Array.from(props.projectStore.content);

      if (source.droppableId === destination.droppableId) {
        const bucketId = source.droppableId.match(/\d+/);
        console.log("Same bucket: ", bucketId);

        for (const bucket of newCardOrder) {
          if (bucket.id === parseInt(bucketId[0])) {
            const currentCard = bucket.cards.splice(source.index, 1);
            bucket.cards.splice(destination.index, 0, ...currentCard);

            actions.dndCard(newCardOrder);
            break;
          }
        }

        return;
      }

      const sourceId = source.droppableId.match(/\d+/);
      const destinationId = destination.droppableId.match(/\d+/);
      console.log("Diff bucket: ", sourceId, destinationId);
      let currentCard;

      for (const bucket of newCardOrder) {
        if (bucket.id === parseInt(sourceId[0])) {
          currentCard = bucket.cards.splice(source.index, 1);
          break;
        }
      }

      for (const bucket of newCardOrder) {
        if (bucket.id === parseInt(destinationId[0])) {
          if (currentCard)
            bucket.cards.splice(destination.index, 0, ...currentCard);

          actions.dndCard(newCardOrder);
          return;
        }
      }
    }
  };

  const handleSave = () => {
    const { projectId, content, indexData } = props.projectStore;

    axios
      .patch(
        `https://awesome-project-jf.herokuapp.com/projects/${projectId}`,
        {
          project: {
            content: JSON.stringify(content),
            indexData: indexData,
          },
        },
        { withCredentials: true }
      )
      .then((response) => {
        if (response.data.project_saved) {
          actions.showAlert("success", "Project successfully saved!");
        } else {
          actions.showAlert(
            "warning",
            "Project not saved - You may not have permission to edit this project"
          );
        }
      })
      .catch((error) => {
        console.log("Project patch error", error);
        actions.showAlert(
          "error",
          "Something went wrong trying to save your project - please try again"
        );
      });
  };

  //if (props.projectStore.projectLoaded)
  return (
    <Container className={classes.root} component="main">
      <CssBaseline />
      <DragDropContext onDragEnd={onDragEnd}>
        <Paper className={classes.paper}>
          <h1 className={classes.title}>
            {props.projectStore.title} by {props.projectStore.owner}
          </h1>
          <Droppable
            className={classes.bucketDroppable}
            droppableId={"project-board"}
            type="bucket"
          >
            {(provided) => (
              <Box ref={provided.innerRef} {...provided.droppableProps}>
                {props.projectStore.content.map((bucket, index) => (
                  <ProjectBucket
                    key={"bucket-" + bucket.id}
                    bucket={bucket}
                    cards={bucket.cards}
                    index={index}
                  />
                ))}
                {provided.placeholder}
              </Box>
            )}
          </Droppable>
          <AddElementButton type="bucket" />
          <Button
            className={classes.save}
            variant="contained"
            onClick={handleSave}
          >
            Save Project <SaveIcon />
          </Button>
        </Paper>
      </DragDropContext>
    </Container>
  );
  /*else
    return (
      <Container>
        <CssBaseline />
        <h1>Project Loading...</h1>
      </Container>
    );*/
};

export default connect(mapStateToPropsProject)(ProjectDetailView);
