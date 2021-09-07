import * as React from "react";

import { connect } from "react-redux";
import { bindActionCreators } from "@reduxjs/toolkit";
import * as projectActions from "../../state/actions/ProjectActions";

import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";
import CloseIcon from "@material-ui/icons/Close";
import { Box, Card, TextareaAutosize, Button } from "@material-ui/core";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    rootButton: {
      display: "flex",
      alignItems: "center",
      padding: "5px",
      border: "3px dashed grey",
      borderRadius: "8px",
      cursor: "pointer",
    },
    newCard: {
      width: "50%",
      minHeight: "80px",
      margin: "5px auto 5px auto",
    },
    textArea: {
      width: "100%",
      resize: "none",
      outline: "none",
      border: "none",
    },
    newElementButtonGroup: {
      marginTop: "8px",
      width: "50%",
      margin: "5px auto 5px auto",
      display: "flex",
      alignItems: "center",
    },
    newElementButton: {
      color: "white",
      backgroundColor: "green",
    },
    leftSpacing: {
      marginLeft: "8px",
    },
    clickable: {
      cursor: "pointer",
    },
  })
);

const AddElementButton: React.FunctionComponent<any> = (props: any) => {
  const actions = bindActionCreators(projectActions, props.dispatch);
  const classes = useStyles();

  const [newElementMode, setNewElementMode] = React.useState(false);
  const [newElementText, setNewElementText] = React.useState("");

  const type = props.type.toLowerCase();

  const closeNewElement = () => {
    setNewElementMode(false);
    setNewElementText("");
  };

  const addNewElement = () => {
    switch (type) {
      case "bucket":
        actions.addBucket(newElementText);
    }
  };

  const ButtonTemplate = () => {
    if (props.type) {
      return (
        <Box
          className={classes.rootButton}
          onClick={() => setNewElementMode(true)}
        >
          <AddCircleOutlineOutlinedIcon />
          <p className={classes.leftSpacing}>Add another {type}</p>
        </Box>
      );
    } else {
      return (
        <Box>
          <AddCircleOutlineOutlinedIcon
            onClick={() => setNewElementMode(true)}
          />
        </Box>
      );
    }
  };

  //return type === "bucket" ? bucket : card for styling in order to fix weird proportions
  const NewElementTemplate = () => {
    return (
      <Box>
        <Card className={classes.newCard}>
          <TextareaAutosize
            className={classes.textArea}
            placeholder={"Enter some text for this " + type}
            autoFocus
            onBlur={closeNewElement}
            value={newElementText}
            onChange={(e) => setNewElementText(e.target.value)}
          />
        </Card>
        <Box className={classes.newElementButtonGroup}>
          <Button
            variant="contained"
            className={classes.newElementButton}
            onMouseDown={addNewElement}
          >
            {"Add " + type}
          </Button>
          <CloseIcon className={classes.leftSpacing} />
        </Box>
      </Box>
    );
  };

  return newElementMode ? NewElementTemplate() : ButtonTemplate();
};

export default connect()(AddElementButton);
