import * as React from "react";
import axios from "axios";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { mapStateToPropsAuth } from "../state/StateToProps";
import * as AuthActions from "../state/actions/AuthActions";

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import { NavLink as Link, useHistory } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      backgroundColor: "#57cc99",
      color: "white",
    },
    appBar: {},
    link: {
      display: "inline-block",
      color: "white",
      textDecoration: "none",
      padding: "2px",
      marginRight: "8px",
      "&:hover": {
        borderRadius: "4px",
        backgroundColor: "#c7f9cc",
        color: "#38a3a5",
      },
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      cursor: "pointer",
    },
  })
);

const HeadBar: React.FunctionComponent<any> = (props: any) => {
  const actions = bindActionCreators(AuthActions, props.dispatch);

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const history = useHistory();

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleTitleClick = () => {
    history.push("/app/home");
  };

  const handleLogout = () => {
    setAnchorEl(null);
    axios
      .delete("http://localhost:3000/logout", { withCredentials: true })
      .then((response) => {
        console.log("Logout res", response);
        if (!response.data.logged_in) {
          actions.logout();
          history.push("/app/home");
        }
      })
      .catch((error) => {
        console.log("Logout error", error);
      });
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="transparent">
        <Toolbar>
          <Typography variant="h6" className={classes.title} onClick={handleTitleClick}>
            AwesomeProject
          </Typography>
          {props.authStore.loggedIn == false && (
            <div>
              <Link to="/app/home" className={classes.link}>
                Home
              </Link>
              <Link to="/app/signin" className={classes.link}>
                Sign in
              </Link>
            </div>
          )}
          {props.authStore.loggedIn == true && (
            <div>
              <Link to="/app/dashboard" className={classes.link}>
                Dashboard
              </Link>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem>{props.authStore.user.username}</MenuItem>
                <MenuItem onClick={handleLogout}>Sign out</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default connect(mapStateToPropsAuth)(HeadBar);
