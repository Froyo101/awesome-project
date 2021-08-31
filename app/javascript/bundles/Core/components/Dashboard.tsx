import * as React from 'react';
import axios from 'axios';

import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'

const mapStateToProps = (state) => {
  return {
    authStore: state.authReducer,
  }
}

const Dashboard: React.FunctionComponent = (props: any) => {
  const authed = false;

  if (authed) {
    return (
      <div>
        <h1>Dashboard</h1>
        <p>Welcome back, {props.authStore.username} </p>
      </div>
    );
  }
  else {
    return (
      <Redirect push to="/app/signin" /> 
    );
  }
};

export default connect(mapStateToProps)(Dashboard);