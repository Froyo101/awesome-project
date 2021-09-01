import * as React from "react";
import axios from "axios";

import { connect } from "react-redux";
import { mapStateToPropsAuth } from "../state/StateToProps";
import { Redirect } from "react-router-dom";

const mapStateToProps = (state) => {
  return {
    authStore: state.authReducer,
  };
};

const Dashboard: React.FunctionComponent = (props: any) => {
  const user = props.authStore.user;

  if (props.authStore.loggedIn) {
    return (
      <div>
        <h1>Dashboard</h1>
        <p>Welcome back, {user.username}</p>
      </div>
    );
  } else {
    return <Redirect push to="/app/signin" />;
  }
};

export default connect(mapStateToProps)(Dashboard);
