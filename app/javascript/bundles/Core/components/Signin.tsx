import * as React from "react";
import axios from "axios";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { mapStateToPropsAuth } from "../state/StateToProps";
import * as AuthActions from "../state/actions/AuthActions";
import * as AlertActions from "../state/actions/AlertActions";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import { NavLink as Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Redirect } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: "#38a3a5",
    color: "white",
  },
}));

const Signin: React.FunctionComponent<any> = (props: any) => {
  const actions = bindActionCreators({...AuthActions, ...AlertActions}, props.dispatch);
  const classes = useStyles();

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post(
        "https://awesome-project-jf.herokuapp.com/sessions",
        {
          user: {
            email: email,
            password: password,
          },
        },
        { withCredentials: true }
      )
      .then((response) => {
        console.log("login res", response);
        if (response.data.status === "created") {
          actions.successfulLogin(response.data.user);
          actions.showAlert("success", "You're now logged in!");
          props.history.push("/app/dashboard");
        } else {
          actions.showAlert("warning", "Login attempt failed");
        }
      })
      .catch((error) => {
        console.log("login error", error);
        //actions.failedLogin(error);
        actions.showAlert("error", "There was an error in processing your request - please refresh the page and try again");
      });
  };

  if (!props.authStore.loggedIn)
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign In
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="email"
                  name="email"
                  type="email"
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="password"
                  type="password"
                  variant="outlined"
                  required
                  fullWidth
                  id="password"
                  label="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              className={classes.submit}
            >
              Sign in!
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/app/signup">
                  Don't have an account with us yet? Sign up!
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    );
  else return <Redirect push to="/app/dashboard" />;
};

export default connect(mapStateToPropsAuth)(Signin);
