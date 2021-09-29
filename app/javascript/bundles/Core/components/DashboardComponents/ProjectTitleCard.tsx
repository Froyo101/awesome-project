import * as React from "react";

import { Card, CardContent, CardActions, Typography, Button } from "@material-ui/core";

const ProjectTitleCard: React.FunctionComponent<any> = (props: any) => {

  let title = props.title;

  if (title.length() > 64) {
    title = title.splice(0, 62) + "...";
  }

  //Need a function to submit a delete request when delete action pressed
  //Should axios call itself be in the actions file?
  //Also, will def want to dispatch to reducer setting projectsloaded to false afterwards to force a refresh

  return (
    <Card>
      <CardContent>
        <Typography variant="h5">{title}</Typography>
        <Typography variant="body1">Owner: {props.owner}</Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Actions</Button>
      </CardActions>
    </Card>
  );
}

export default ProjectTitleCard;