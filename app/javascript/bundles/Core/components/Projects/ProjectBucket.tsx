import * as React from "react";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { mapStateToPropsProject } from "../../state/StateToProps";
import * as projectActions from "../../state/actions/ProjectActions";

import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ProjectCard from "./ProjectCard";
import AddElementButton from "./AddElementButton";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { Box, Button, TextField } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    draggable: {
      //width: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    root: {
      //width: "100%",
      minWidth: "70vw",
      margin: "8px auto 4px auto",
      display: "block",
      //backgroundColor: "#345B63",
    },
    cardDroppable: {
      width: "100%",
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
    },
    titleField: {
      width: "100%",
    },
    details: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    editButton: {
      backgroundColor: "#38a3a5",
      color: "white",
      margin: "8px",
    },
    deleteButton: {
      backgroundColor: "#a53838",
      color: "white",
      margin: "8px",
    },
  })
);

const ProjectBucket: React.FunctionComponent<any> = (props: any) => {
  const actions = bindActionCreators(projectActions, props.dispatch);
  const classes = useStyles();

  const [editTitle, setEditTitle] = React.useState(false);
  const [newTitle, setNewTitle] = React.useState("");

  //Won't this get refreshed every time the redux store is updated, remounting the component?
  //Instead may want to access a list of valid bucket/id pairs to verify whether component can be displayed
  //Upon mounting, it would check the list for itself, and if not found wouldn't display
  //Would have to be careful to ensure that there wouldn't be a weird period between a new element being added
  //and the element not being found on the list
  const [deleted, setDeleted] = React.useState(false);

  const handleEdit = () => {
    setNewTitle(props.bucket.title);
    setEditTitle(true);
  };

  const submitEdit = () => {
    actions.editBucketTitle(props.bucket.id, newTitle);
    setNewTitle("");
    setEditTitle(false);
  };

  const handleDelete = () => {
    actions.deleteBucket(props.bucket.id);
    setDeleted(true); 
  };

  return (
    <Draggable draggableId={"bucket-" + props.bucket.id} index={props.index}>
      {(provided) => (
        <Accordion
          className={classes.root}
          expanded={props.bucket.expanded}
          ref={provided.innerRef}
          {...provided.draggableProps}
          TransitionProps={{ unmountOnExit: true }}
        >
          <AccordionSummary
            {...provided.dragHandleProps}
            expandIcon={<ExpandMoreIcon />}
            aria-controls={"bucket-" + props.bucket.id + "-content"}
            id={"bucket-" + props.bucket.id + "-header"}
            onClick={() => actions.bucketExpansion(props.bucket.id)}
          >
            {editTitle ? (
              <TextField
                className={classes.titleField}
                value={newTitle}
                autoFocus
                onBlur={submitEdit}
                onChange={(e) => setNewTitle(e.target.value)}
              />
            ) : (
              <Typography className={classes.heading}>
                {props.bucket.title}
              </Typography>
            )}
          </AccordionSummary>
          <AccordionDetails className={classes.details}>
            <Droppable
              className={classes.cardDroppable}
              droppableId={"bucket-" + props.bucket.id + "-droppable"}
              type="card"
            >
              {(provided) => (
                <Box ref={provided.innerRef} {...provided.droppableProps}>
                  {props.cards.map((card, index) => (
                    <ProjectCard
                      key={"card-" + card.id}
                      card={card}
                      bucketId={props.bucket.id}
                      index={index}
                    />
                  ))}
                  {provided.placeholder}
                </Box>
              )}
            </Droppable>
            <br />
            <AddElementButton type="card" bucketID={props.bucket.id} />
            <Box>
              <Button
                className={classes.editButton}
                onClick={handleEdit}
                variant="contained"
              >
                Edit <EditIcon />
              </Button>
              <Button
                className={classes.deleteButton}
                onClick={handleDelete}
                variant="contained"
              >
                Delete <DeleteIcon />
              </Button>
            </Box>
          </AccordionDetails>
        </Accordion>
      )}
    </Draggable>
  );
};

export default connect(mapStateToPropsProject)(ProjectBucket);
