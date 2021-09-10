import * as React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Draggable } from "react-beautiful-dnd";

const useStyles = makeStyles({
  root: {
    width: "100%",
    minWidth: "60vw",
    margin: "8px auto 8px auto",
    //backgroundColor: "#D4ECDD"
  },
});

const ProjectCard: React.FunctionComponent<any> = (props: any) => {
  const classes = useStyles();

  return (
    <Draggable draggableId={"card-" + props.card.id} index={props.index}>
      {(provided) => (
        <Card
          className={classes.root}
          ref={provided.innerRef}
          {...provided.draggableProps}
        >
          <CardContent>
            <Typography
              {...provided.dragHandleProps}
              variant="h5"
              component="h3"
            >
              {props.card.title}
            </Typography>
            <Typography variant="body2" component="p">
              {props.card.body}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Expand</Button>
          </CardActions>
        </Card>
      )}
    </Draggable>
  );
};

export default ProjectCard;
