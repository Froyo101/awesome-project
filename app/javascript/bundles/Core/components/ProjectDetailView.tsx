import * as React from "react";
import axios from "axios";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as AuthActions from "../state/actions/AuthActions";
import * as ProjectActions from "../state/actions/ProjectActions";
import { mapStateToPropsProjectAuth } from "../state/StateToProps";
import { useParams } from "react-router-dom";

import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import ProjectBucket from "./Projects/ProjectBucket";
import { Theme, createStyles, makeStyles } from "@material-ui/core";
import { CssBaseline } from "@material-ui/core";
import AddElementButton from "./Projects/AddElementButton";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { Box } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100vw",
    },
    paper: {
      backgroundColor: "#E8E8E8",
      marginTop: theme.spacing(8),
      marginBottom: theme.spacing(8),
      marginLeft: "auto",
      marginRight: "auto",
      minWidth: "75vw",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    bucketDroppable: {
      width: "100%",
    },
  })
);

const ProjectDetailView: React.FunctionComponent<any> = (props: any) => {
  const actions = bindActionCreators(
    { ...AuthActions, ...ProjectActions },
    props.dispatch
  );
  const classes = useStyles();
  const { id } = useParams();

  //Need unmount logic, i.e. reverting state to default
  //Maybe remove auth and authactions from this if it only needs proj reducer access?

  React.useEffect(() => {
    console.log("in project effect");

    const fetchProject = () => {
      axios
        .get(`http://localhost:3000/projects/${id}`, { withCredentials: true })
        .then((response) => {
          if (response.data.project_loaded) {
            actions.loadProjectSuccess(response.data.project);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };

    //Consider gating entire useEffect block with this logic? (as in at the highest level)
    //Wait a sec if you can do that can't you just skip useEffect altogether
    //And like, just use that as the oncomponentmount logic
    //But then if you handle it that way, you may be waiting on fetching the project before any of the page can load
    //Hrngh
    if (!props.projectStore.projectLoaded) fetchProject();

    /*return () => {
      actions.clearProject();
    }*/
  }, []);

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

      //console.log(newBucketOrder);

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

  //if (props.projectStore.projectLoaded)
  return (
    <Container className={classes.root} component="main">
      <CssBaseline />
      <DragDropContext onDragEnd={onDragEnd}>
        <Paper className={classes.paper}>
          <h1>
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

export default connect(mapStateToPropsProjectAuth)(ProjectDetailView);
