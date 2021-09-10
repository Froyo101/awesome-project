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
import { Box } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    draggable: {
      width: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    root: {
      width: "100%",
      minWidth: "70vw",
      margin: "8px auto 4px auto",
      display: "block",
      //backgroundColor: "#345B63",
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
    },
    details: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
  })
);

const ProjectBucket: React.FunctionComponent<any> = (props: any) => {
  const actions = bindActionCreators(projectActions, props.dispatch);
  const classes = useStyles();

  return (
    <Draggable draggableId={"bucket-" + props.bucket.id} index={props.index}>
      {(provided) => (
        <Accordion
          className={classes.root}
          expanded={props.bucket.expanded}
          ref={provided.innerRef}
          {...provided.draggableProps}
        >
          <AccordionSummary
            {...provided.dragHandleProps}
            expandIcon={<ExpandMoreIcon />}
            aria-controls={"bucket-" + props.bucket.id + "-content"}
            id={"bucket-" + props.bucket.id + "-header"}
            onClick={() => actions.bucketExpansion(props.bucket.id)}
          >
            <Typography className={classes.heading}>
              {props.bucket.title}
            </Typography>
          </AccordionSummary>
          <AccordionDetails className={classes.details}>
            <Typography>This is the head of a new bucket.</Typography>
            <Droppable droppableId={"bucket-" + props.bucket.id + "-droppable"} type="card">
              {(provided) => (
                <Box ref={provided.innerRef} {...provided.droppableProps}>
                  {props.cards.map((card, index) => (
                    <ProjectCard
                      key={"card-" + card.id}
                      card={card}
                      index={index}
                    />
                  ))}
                  {provided.placeholder}
                </Box>
              )}
            </Droppable>
            <br />
            <AddElementButton type="card" bucketID={props.bucket.id} />
          </AccordionDetails>
        </Accordion>
      )}
    </Draggable>
  );
};

export default connect(mapStateToPropsProject)(ProjectBucket);
