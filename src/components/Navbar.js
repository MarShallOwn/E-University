import React, { useEffect, useState } from "react";
import {
  Grid,
  Avatar,
  Popover,
  Typography,
  Divider,
  Button,
} from "@material-ui/core";
import { Link, withRouter } from "react-router-dom";
import { MdEmail, MdNotifications } from "react-icons/md";
import { useLoggedIn, useUser } from "../contexts/UserProvider";
import { useStyles } from "./styleNavbar";
import Axios from "axios";
import Logo from "../assets/images/E-University-Logo.svg";

const routes = [
  "/",
  "/about",
  "/contact-us",
  "/colleges",
  "/faculty",
  "/chat",
  "/admin/create-user",
  "/register",
  "/login",
];

const Navbar = (props) => {
  const classes = useStyles();

  const setLoggedIn = useLoggedIn();
  const user = useUser();

  const [activeTab, setActiveTab] = useState(props.location.pathname);

  useEffect(() => {
    !routes.includes(props.location.pathname) && setActiveTab(null);
  }, [props.location.pathname]);

  const logout = () => {
    Axios.get("/api/logout", { withCredentials: true }).then((res) => {
      setLoggedIn(false);
    });
    handleClose();
  };

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <nav className={classes.root}>
      <ul>
        <Grid
          container
          item
          xs={2}
          justify="center"
          alignItems="center"
          className={classes.universityName}
        >
          <img
            style={{ width: "23.5px", height: "23.5px", marginRight: "10px" }}
            src={Logo}
          />
          B.S University
        </Grid>
        <Grid container item xs={10} justify="flex-end" alignItems="center">
          <Link
            onClick={() => setActiveTab("/")}
            to={routes[0]}
            style={
              activeTab === "/"
                ? {
                    fontWeight: "bold",
                    position: "relative",
                    margin: "0 1.7rem",
                    height: "100%",
                  }
                : { margin: "0 1.7rem", height: "100%" }
            }
          >
            <li>
              Home
              {activeTab === routes[0] && <span></span>}
            </li>
          </Link>
          <Link
            onClick={() => setActiveTab("/about")}
            to={routes[1]}
            style={
              activeTab === "/about"
                ? {
                    fontWeight: "bold",
                    position: "relative",
                    margin: "0 1.7rem",
                    height: "100%",
                  }
                : { margin: "0 1.7rem", height: "100%" }
            }
          >
            <li>
              About
              {activeTab === routes[1] && <span></span>}
            </li>
          </Link>
          <Link
            onClick={() => setActiveTab("/contact-us")}
            to={routes[2]}
            style={
              activeTab === "/contact-us"
                ? {
                    fontWeight: "bold",
                    position: "relative",
                    margin: "0 1.7rem",
                    height: "100%",
                  }
                : { margin: "0 1.7rem", height: "100%" }
            }
          >
            <li>
              Contact Us
              {activeTab === routes[2] && <span></span>}
            </li>
          </Link>
          <Link
            onClick={() => setActiveTab("/colleges")}
            to={routes[3]}
            style={
              activeTab === "/colleges"
                ? {
                    fontWeight: "bold",
                    position: "relative",
                    margin: "0 1.7rem",
                    height: "100%",
                  }
                : { margin: "0 1.7rem", height: "100%" }
            }
          >
            <li>
              Colleges
              {activeTab === routes[3] && <span></span>}
            </li>
          </Link>
          {user.email && (
            <Link
              onClick={() => setActiveTab("/faculty")}
              to={routes[4]}
              style={
                activeTab === "/faculty"
                  ? {
                      fontWeight: "bold",
                      position: "relative",
                      margin: "0 1.7rem",
                      height: "100%",
                    }
                  : { margin: "0 1.7rem", height: "100%" }
              }
            >
              <li>
                Courses
                {activeTab === routes[4] && <span></span>}
              </li>
            </Link>
          )}
          {user.isAdmin && (
            <Link
              onClick={() => setActiveTab("/admin/create-user")}
              to={routes[6]}
              style={
                activeTab === "/admin/create-user"
                  ? {
                      fontWeight: "bold",
                      position: "relative",
                      margin: "0 1.7rem",
                      height: "100%",
                    }
                  : { margin: "0 1.7rem", height: "100%" }
              }
            >
              <li>
                Create User
                {activeTab === routes[6] && <span></span>}
              </li>
            </Link>
          )}
          {!user.email && (
            <>
              <Link
                onClick={() => setActiveTab("/register")}
                to={routes[7]}
                style={
                  activeTab === "/register"
                    ? {
                        fontWeight: "bold",
                        position: "relative",
                        margin: "0 1.7rem",
                        height: "100%",
                      }
                    : { margin: "0 1.7rem", height: "100%" }
                }
              >
                <li>
                  Register
                  {activeTab === routes[7] && <span></span>}
                </li>
              </Link>
              <Link
                onClick={() => setActiveTab("/login")}
                to={routes[8]}
                style={
                  activeTab === "/login"
                    ? {
                        fontWeight: "bold",
                        position: "relative",
                        margin: "0 1.7rem",
                        height: "100%",
                      }
                    : { margin: "0 1.7rem", height: "100%" }
                }
              >
                <li>
                  Login
                  {activeTab === routes[8] && <span></span>}
                </li>
              </Link>
            </>
          )}
          {user.email && (
            <div className={classes.profileContainer}>
              <li>
                <MdNotifications fontSize="1.2rem" color="white" />
              </li>
              <li onClick={() => setActiveTab(null)}>
                <Link style={{ height: "21px", width: "5px" }} to={routes[5]}>
                  <MdEmail fontSize="1.2rem" color="white" />
                </Link>
              </li>
              <li></li>
              <li>
                <Avatar
                  onClick={handleClick}
                  style={{
                    height: "1.7rem",
                    width: "1.7rem",
                  }}
                  src={`https://res.cloudinary.com/dxkufsejm/image/upload/v1601325837/${user.picture}`}
                  alt="profile-image"
                />
              </li>
            </div>
          )}
        </Grid>
      </ul>

      <Popover
        open={open}
        anchorEl={anchorEl}
        style={{ marginTop: "5px" }}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Grid style={{ padding: ".5rem" }}>
          <Grid>
            <Grid
              container
              alignItems="center"
              style={{ marginBottom: ".5rem" }}
            >
              <Avatar
                style={{
                  height: "2rem",
                  width: "2rem",
                  float: "left",
                }}
                src={`https://res.cloudinary.com/dxkufsejm/image/upload/v1601325837/${user.picture}`}
                alt="profile-image"
              />
              <Typography style={{ fontSize: ".9rem", marginLeft: ".4rem" }}>
                {`${user.firstname} ${user.lastname}`}
              </Typography>
            </Grid>
            <Divider />
            <Grid container justify="flex-start">
              <Link
                to="/profile"
                style={{ textDecoration: "none", color: "black", width: "100%" }}
              >
                <Button
                  onClick={handleClose}
                  fullWidth
                  style={{
                    justifyContent: "flex-start",
                    textTransform: "none",
                  }}
                >
                  Profile
                </Button>
              </Link>
              <Divider />
              <Button
                onClick={logout}
                fullWidth
                style={{ justifyContent: "flex-start", textTransform: "none" }}
              >
                Logout
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Popover>
    </nav>
  );
};

export default withRouter(Navbar);

/*
              <li onClick={() => setActiveTab('/profile')}>
                <Link to="/profile">Profile</Link>
                {activeTab === "/profile" && <span></span>}
              </li>
              <li>
                <button onClick={logout}>Logout</button>
              </li>
*/
