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
          <li onClick={() => setActiveTab("/")}>
            <Link
              to={routes[0]}
              style={activeTab === "/" ? { fontWeight: "bold" } : {}}
            >
              Home
            </Link>
            {activeTab === routes[0] && <span></span>}
          </li>
          <li onClick={() => setActiveTab("/about")}>
            <Link
              to={routes[1]}
              style={activeTab === "/about" ? { fontWeight: "bold" } : {}}
            >
              About
            </Link>
            {activeTab === routes[1] && <span></span>}
          </li>
          <li onClick={() => setActiveTab("/contact-us")}>
            <Link
              to={routes[2]}
              style={activeTab === "/contact-us" ? { fontWeight: "bold" } : {}}
            >
              Contact Us
            </Link>
            {activeTab === routes[2] && <span></span>}
          </li>
          <li onClick={() => setActiveTab("/colleges")}>
            <Link
              to={routes[3]}
              style={activeTab === "/colleges" ? { fontWeight: "bold" } : {}}
            >
              Colleges
            </Link>
            {activeTab === routes[3] && <span></span>}
          </li>
          {user.email && (
            <li onClick={() => setActiveTab("/faculty")}>
              <Link
                to={routes[4]}
                style={activeTab === "/faculty" ? { fontWeight: "bold" } : {}}
              >
                Courses
              </Link>
              {activeTab === routes[4] && <span></span>}
            </li>
          )}
          {user.isAdmin && (
            <li onClick={() => setActiveTab("/admin/create-user")}>
              <Link
                to={routes[6]}
                style={
                  activeTab === "/admin/create-user"
                    ? { fontWeight: "bold" }
                    : {}
                }
              >
                Create User
              </Link>
              {activeTab === routes[6] && <span></span>}
            </li>
          )}
          {!user.email && (
            <>
              <li onClick={() => setActiveTab("/register")}>
                <Link
                  to={routes[7]}
                  style={
                    activeTab === "/register" ? { fontWeight: "bold" } : {}
                  }
                >
                  Register
                </Link>
                {activeTab === routes[7] && <span></span>}
              </li>
              <li onClick={() => setActiveTab("/login")}>
                <Link
                  to={routes[8]}
                  style={activeTab === "/login" ? { fontWeight: "bold" } : {}}
                >
                  Login
                </Link>
                {activeTab === routes[8] && <span></span>}
              </li>
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
              <Button
                onClick={handleClose}
                fullWidth
                style={{ justifyContent: "flex-start", textTransform: "none" }}
              >
                <Link
                  to="/profile"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  Profile
                </Link>
              </Button>
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
