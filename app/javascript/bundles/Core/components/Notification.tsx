import * as React from "react";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as AlertActions from "../state/actions/AlertActions";
import { mapStateToPropsAlert } from "../state/StateToProps";

import { makeStyles, Typography } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
  },
  message: {
    display: "inline-flex",
    verticalAlign: "middle",
  },
  closeIcon: {
    display: "inline-flex",
    cursor: "pointer",
    marginLeft: "8px",
    verticalAlign: "middle",
  },
});

const Notification: React.FunctionComponent<any> = (props: any) => {
  const actions = bindActionCreators(AlertActions, props.dispatch);
  const classes = useStyles();

  const handleClose = () => {
    console.log("Handling close...");
    actions.hideAlert();
  };

  if (props.alertStore.active) {
    return (
      <Alert className={classes.root} severity={props.alertStore.severity}>
        <Typography className={classes.message} variant="body1">{props.alertStore.message}</Typography>
        <CloseIcon className={classes.closeIcon} onClick={handleClose} />
      </Alert>
    );
  } else {
    return <div style={{ display: "none" }}></div>;
  }
};

export default connect(mapStateToPropsAlert)(Notification);
