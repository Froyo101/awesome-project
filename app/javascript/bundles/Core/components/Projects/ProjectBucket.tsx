import * as React from "react";

import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ProjectCard from "./ProjectCard";
import AddElementButton from "./AddElementButton";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "80%",
      margin: "10px auto 5px auto",
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
    <Accordion className={classes.root}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls={"bucket-" + props.id + "-content"}
        id={"bucket-" + props.id + "-header"}
      >
        <Typography className={classes.heading}>{props.title}</Typography>
      </AccordionSummary>
      <AccordionDetails className={classes.details}>
        <Typography>This is the head of a new bucket.</Typography>
        {props.cards.map((card) => (
          <ProjectCard
            id={props.title + "-card-" + card.id}
            key={card.id}
            title={card.title}
            body={card.body}
          />
        ))}
        <AddElementButton type="card" />
      </AccordionDetails>
    </Accordion>
  );
};

export default ProjectBucket;
