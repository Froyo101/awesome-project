import * as React from "react";

import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ProjectCard from "./ProjectCard";
import AddElementButton from "./AddElementButton";
import { Droppable } from "react-beautiful-dnd";
import { Box } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "80%",
      margin: "8px auto 4px auto",
      display: "block",
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
    },
    details: {
      display: "block",
    },
  })
);

const ProjectBucket: React.FunctionComponent<any> = (props: any) => {
  const classes = useStyles();

  return (
    <Accordion className={classes.root} id={"bucket-" + props.bucket.id}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls={"bucket-" + props.bucket.id + "-content"}
        id={"bucket-" + props.bucket.id + "-header"}
      >
        <Typography className={classes.heading}>
          {props.bucket.title}
        </Typography>
      </AccordionSummary>
      <AccordionDetails className={classes.details}>
        <Typography>This is the head of a new bucket.</Typography>
        <Droppable droppableId={"bucket-droppable-" + props.bucket.id}>
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
        <AddElementButton type="card" bucketID={props.bucket.id} />
      </AccordionDetails>
    </Accordion>
  );
};

export default ProjectBucket;
