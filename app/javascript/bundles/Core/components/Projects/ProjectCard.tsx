import * as React from "react";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as ProjectActions from "../../state/actions/ProjectActions"
import { mapStateToPropsProject } from "../../state/StateToProps";

import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Draggable } from "react-beautiful-dnd";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import CloseIcon from "@material-ui/icons/Close";
import { TextField, TextareaAutosize } from "@material-ui/core";

const useStyles = makeStyles({
  draggable: {
    //width: "100%",
  },
  root: {
    //width: "100%",
    minWidth: "60vw",
    margin: "8px auto 8px auto",
    backgroundColor: "#E8E8E8",
  },
  titleField: {
    width: "100%",
  },
  bodyField: {
    width: "100%",
    resize: "none",
    outline: "none",
    border: "none",
  },
  editTitleButton: {
    backgroundColor: "#38a3a5",
    color: "white",
    marginRight: "8px",
  },
  editBodyButton: {
    backgroundColor: "#38a3a5",
    color: "white",
    marginRight: "8px",
  },
  deleteButton: {
    backgroundColor: "#a53838",
    color: "white",
    marginRight: "8px",
  },
  closeIcon: {
    cursor: "pointer",
    verticalAlign: "middle",
  },
});

const ProjectCard: React.FunctionComponent<any> = (props: any) => {
  const actions = bindActionCreators(ProjectActions, props.dispatch);
  const classes = useStyles();

  const [showActions, setShowActions] = React.useState(false);

  const [editTitle, setEditTitle] = React.useState(false);
  const [newTitle, setNewTitle] = React.useState("");

  const [editBody, setEditBody] = React.useState(false);
  const [newBody, setNewBody] = React.useState("");

  const handleEditTitle = () => {
    setEditTitle(true);
    setNewTitle(props.card.title);
  };

  const submitNewTitle = () => {
    actions.editCardTitle(props.bucketId, props.card.id, newTitle);
    setEditTitle(false);
    setNewTitle("");
  };

  const handleEditBody = () => {
    setEditBody(true);
    setNewBody(props.card.body);
  };

  const submitNewBody = () => {
    actions.editCardBody(props.bucketId, props.card.id, newBody);
    setEditBody(false);
    setNewBody("");
  };

  const handleDelete = () => {
    actions.deleteCard(props.bucketId, props.card.id);
  };

  return (
    <Draggable className={classes.draggable} draggableId={"card-" + props.card.id} index={props.index}>
      {(provided) => (
        <Card
          className={classes.root}
          ref={provided.innerRef}
          {...provided.draggableProps}
        >
          <CardContent>
            {editTitle ? (
              <TextField
                className={classes.titleField}
                value={newTitle}
                autoFocus
                onBlur={submitNewTitle}
                onChange={(e) => setNewTitle(e.target.value)}
              />
            ) : (
              <Typography
                {...provided.dragHandleProps}
                variant="h5"
                component="h3"
              >
                {props.card.title}
              </Typography>
            )}
            {editBody ? (
              <TextareaAutosize
                className={classes.bodyField}
                value={newBody}
                autoFocus
                onBlur={submitNewBody}
                onChange={(e) => setNewBody(e.target.value)}
              />
            ) : (
              <Typography variant="body2" component="p" onDoubleClick={handleEditBody}>
                {props.card.body}
              </Typography>
            )}
          </CardContent>
          <CardActions>
            {!showActions && (
              <Button size="small" onClick={() => setShowActions(true)}>
                Actions
              </Button>
            )}
            {showActions && (
              <Box>
                <Button
                  className={classes.editTitleButton}
                  onClick={handleEditTitle}
                  size="small"
                  variant="contained"
                >
                  Edit Title <EditIcon />
                </Button>
                <Button
                  className={classes.editBodyButton}
                  onClick={handleEditBody}
                  size="small"
                  variant="contained"
                >
                  Edit Body <EditIcon />
                </Button>
                <Button
                  className={classes.deleteButton}
                  onClick={handleDelete}
                  size="small"
                  variant="contained"
                >
                  Delete <DeleteIcon />
                </Button>
                <CloseIcon
                  className={classes.closeIcon}
                  onClick={() => setShowActions(false)}
                />
              </Box>
            )}
          </CardActions>
        </Card>
      )}
    </Draggable>
  );
};

export default connect(mapStateToPropsProject)(ProjectCard);
