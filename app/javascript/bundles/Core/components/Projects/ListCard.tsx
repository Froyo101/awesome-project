import * as React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    width: "50%",
    margin: "auto",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const ListCard: React.FunctionComponent<any> = (props: any) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h5" component="h2">
          Step Title (Optional?)
        </Typography>
        <Typography variant="body2" component="p">
          Bottom text.
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Interact with me!</Button>
      </CardActions>
    </Card>
  );
};

export default ListCard;
