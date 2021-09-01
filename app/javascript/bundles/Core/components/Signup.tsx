import * as React from "react";
import axios from "axios";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { mapStateToPropsAuth } from "../state/StateToProps";
import * as AuthActions from "../state/actions/AuthActions";

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
  },
}));

const Signup: React.FunctionComponent<any> = (props: any) => {
  const actions = bindActionCreators(AuthActions, props.dispatch);
  const classes = useStyles();

  const [fname, setFname] = React.useState("");
  const [lname, setLname] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [passwordConfirmation, setPasswordConfirmation] = React.useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post(
        "http://localhost:3000/registrations",
        {
          user: {
            f_name: fname,
            l_name: lname,
            username: username,
            email: email,
            password: password,
            password_confirmation: passwordConfirmation,
          },
        },
        { withCredentials: true }
      )
      .then((response) => {
        console.log("registration res", response);
        if (response.data.status === "created") {
          actions.successfulLogin(response.data.user);
          props.history.push("/app/dashboard");
        }
      })
      .catch((error) => {
        console.log("registration error", error);
        actions.failedLogin(error);
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
            Sign Up
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="fname"
                  name="firstName"
                  variant="outlined"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  value={fname}
                  onChange={(e) => setFname(e.target.value)}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="lname"
                  name="lastName"
                  variant="outlined"
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  value={lname}
                  onChange={(e) => setLname(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoComplete="username"
                  name="username"
                  variant="outlined"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoComplete="email"
                  name="email"
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="password"
                  variant="outlined"
                  required
                  fullWidth
                  id="password"
                  label="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="passwordConfirmation"
                  variant="outlined"
                  required
                  fullWidth
                  id="passwordConfirmation"
                  label="Password (Confirmed)"
                  value={passwordConfirmation}
                  onChange={(e) => setPasswordConfirmation(e.target.value)}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign Up!
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/app/signin">
                  Already registered with us? Sign in!
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    );
  else return <Redirect push to="/app/dashboard" />;
};

export default connect(mapStateToPropsAuth)(Signup);
