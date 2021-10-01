import * as React from "react";

import { connect } from "react-redux";
import { mapStateToPropsAuth } from "../state/StateToProps";

import { Container, CssBaseline } from "@material-ui/core";
import { Redirect } from "react-router-dom";

const NotFound: React.FunctionComponent = (props: any) => {
  const [redirect, setRedirect] = React.useState(false);

  React.useEffect(() => {
    let isMounted = true;
    setTimeout(() => isMounted && setRedirect(true), 5000);
    return () => {
      isMounted = false;
    };
  }, []);

  if (!redirect)
    return (
      <Container>
        <CssBaseline />
        <h1>
          Requested resource not found, you will be redirected in 5 seconds...
        </h1>
      </Container>
    );
  else
    return (
      <Redirect
        to={props.authStore.loggedIn ? "/app/dashboard" : "/app/home"}
      />
    );
};

export default connect(mapStateToPropsAuth)(NotFound);
