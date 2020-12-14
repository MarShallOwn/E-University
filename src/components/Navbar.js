import React, { useEffect, useState } from "react";
import { Grid, Avatar, Popover, Typography, Divider, Button } from "@material-ui/core";
import { Link, withRouter } from "react-router-dom";
import { MdEmail, MdNotifications } from "react-icons/md";
import { useLoggedIn, useUser } from "../contexts/UserProvider";
import { useStyles } from "./styleNavbar";
import Axios from "axios";

const Navbar = (props) => {
  const classes = useStyles();

  const setLoggedIn = useLoggedIn();
  const user = useUser();

  const [activeTab, setActiveTab] = useState(props.location.pathname);

  useEffect(() => {}, []);

  const logout = () => {
    Axios.get("/api/logout", { withCredentials: true }).then((res) => {
      setLoggedIn(false);
    });
    handleClose()
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
          B.S University
        </Grid>
        <Grid container item xs={10} justify="flex-end" alignItems="center">
          <li onClick={() => setActiveTab("/")}>
            <Link to="/">Home</Link>
            {activeTab === "/" && <span></span>}
          </li>
          <li onClick={() => setActiveTab("/about")}>
            <Link to="/about">About</Link>
            {activeTab === "/about" && <span></span>}
          </li>
          <li onClick={() => setActiveTab("/contact-us")}>
            <Link to="/contact-us">Contact Us</Link>
            {activeTab === "/contact-us" && <span></span>}
          </li>
          <li onClick={() => setActiveTab("/chat")}>
            <Link to="/chat">Chat</Link>
            {activeTab === "/chat" && <span></span>}
          </li>
          {user.isAdmin && (
            <li onClick={() => setActiveTab("/admin/create-user")}>
              <Link to="/admin/create-user">Create User</Link>
              {activeTab === "/admin/create-user" && <span></span>}
            </li>
          )}
          {!user.email && (
            <>
              <li onClick={() => setActiveTab("/register")}>
                <Link to="/register">Register</Link>
                {activeTab === "/register" && <span></span>}
              </li>
              <li onClick={() => setActiveTab("/login")}>
                <Link to="/login">Login</Link>
                {activeTab === "/login" && <span></span>}
              </li>
            </>
          )}
          {user.email && (
            <div className={classes.profileContainer}>
              <li>
                <MdNotifications fontSize="1.2rem" color="white" />
              </li>
              <li>
                <MdEmail fontSize="1.2rem" color="white" />
              </li>
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
        <Grid style={{padding: '.5rem' }}>
          <Grid>
            <Grid container alignItems="center" style={{marginBottom: '.5rem'}}>
            <Avatar
              style={{
                height: "2rem",
                width: "2rem",
                float: 'left',
              }}
              src={`https://res.cloudinary.com/dxkufsejm/image/upload/v1601325837/${user.picture}`}
              alt="profile-image"
            />
            <Typography style={{fontSize: '.9rem', marginLeft: '.4rem'}}>
              {`${user.firstname} ${user.lastname}`}
              </Typography>
            </Grid>
            <Divider />
            <Grid container justify="flex-start">
              <Button onClick={handleClose} fullWidth style={{justifyContent: "flex-start", textTransform: 'none' }}>
              <Link to="/profile" style={{textDecoration: 'none', color: 'black'}}>Profile</Link>
              </Button>
              <Divider />
              <Button onClick={logout} fullWidth style={{justifyContent: "flex-start", textTransform: 'none'}}>
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
