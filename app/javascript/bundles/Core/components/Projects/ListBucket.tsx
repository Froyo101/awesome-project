import * as React from "react";

import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

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
    }
  })
);

const ListBucket: React.FunctionComponent<any> = (props: any) => {
  const classes = useStyles();

  return (
    <Accordion className={classes.root}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls={"accordion" + props.id + "-content"}
        id={"accordion" + props.id + "-header"}
      >
        <Typography className={classes.heading}>{props.title}</Typography>
      </AccordionSummary>
      <AccordionDetails className={classes.details}>
        <Typography>
          This is the head of a new bucket.
        </Typography>
        {props.children}
      </AccordionDetails>
    </Accordion>
  );
};

export default ListBucket;