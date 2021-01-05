import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import _ from "lodash/fp";
import { Grid, TextField, Button } from "@material-ui/core";
import { useUser, useLoggedIn } from "../../contexts/UserProvider";
import { useForm } from "react-hook-form";
import Axios from "axios";
import loginImage from "../../assets/images/Login.jpeg";

const Login = (props) => {
  const user = useUser();
  const setLoggedIn = useLoggedIn();

  useEffect(() => {
    if (user.email) {
      props.location.search &&
        props.history.push({
          pathname: props.location.search.split("=")[1],
          state: props.location.state,
        });
    }
  }, [user, props.history, props.location.search]);

  const [showError, setShowError] = useState({ error: false, reason: null });

  const { register, handleSubmit, errors } = useForm();

  const loginUser = (data) => {
    Axios.post(
      "/api/login",
      {
        email: data.email,
        password: data.password,
      },
      {
        withCredentials: true,
      }
    ).then((res) => {
      if (res.data.pass) {
        setLoggedIn(true);
        props.location.search
          ? props.history.push(props.location.search.split("=")[1])
          : props.history.push("/");
      } else {
        setShowError({ error: true, reason: "email or password not correct" });
      }
    });
  };

  return (
    <Grid container style={{ height: "calc(100vh - 3.5rem)" }}>
      <Grid item xs={6}>
        <Grid
          style={{
            width: "100%",
            height: "calc(100vh - 3.5rem)",
            overflow: "hidden",
          }}
        >
          <img
            style={{ height: "100%", marginLeft: "-150px" }}
            src={loginImage}
          />
        </Grid>
      </Grid>
      <Grid item xs={6} container alignItems="center" justify="center">
        <Grid container direction="column" style={{ width: "448.5px" }}>
          <Grid
            style={{
              padding: "0 50px",
            }}
          >
            <Grid
              style={{
                position: "relative",
                width: "fit-content",
                margin: "0 auto",
                padding: "0 13px",
              }}
            >
              <p
                style={{
                  color: "black",
                  textAlign: "center",
                  fontSize: "35px",
                  font: "normal normal normal 35px/53px Poppins",
                }}
              >
                Login
              </p>
              <div
                style={{
                  position: "absolute",
                  left: "0",
                  bottom: "0",
                  width: "94px",
                  height: "4px",
                  backgroundColor: "#FFE05D",
                }}
              ></div>
            </Grid>
          </Grid>

          {showError.error && <p>email or password not correct</p>}
          <TextField
            type="email"
            name="email"
            id="email"
            label="E-mail"
            inputRef={register({
              required: true,
              pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
            })}
            style={{
              marginBottom: "42.5px",
              marginTop: "20px",
              font: "normal normal medium 16px/35px Poppins",
            }}
            required
          />
          {_.get("email.type", errors) === "required" && (
            <p>This field is required</p>
          )}
          {_.get("email.type", errors) === "pattern" && (
            <p>
              Please include an '@' in the email address and write the domain
            </p>
          )}
          <TextField
            type="password"
            name="password"
            id="password"
            label="Password"
            inputRef={register({
              required: true,
            })}
            required
          />
          <div style={{ widht: "100%" }}>
            <Link
              to="/auth/forgot-password"
              style={{
                float: "right",
                marginTop: "9.5px",
                marginRight: "15px",
                textDecoration: "none",
                color: "#1C60B3",
                font: "normal normal normal 14px/16px Arial",
              }}
            >
              Forgot Password ?
            </Link>
          </div>
          {_.get("password.type", errors) === "required" && (
            <p>This field is required</p>
          )}
          <Button
            style={{
              height: "55px",
              borderRadius: "10px",
              marginTop: "2rem",
              backgroundColor: "#1C60B3",
              color: "white",
              font: "normal normal medium 16px/35px Poppins",
              fontSize: "16px",
            }}
            variant="contained"
            onClick={handleSubmit(loginUser)}
          >
            Login
          </Button>
          <p
            style={{
              textAlign: "center",
              marginTop: "18px",
              color: "#9696A0",
              font: "normal normal normal 14px/21px Poppins",
              fontSize: "14px",
            }}
          >
            Don't have an account ?{" "}
            <Link to="/register" style={{ color: "#242523" }}>
              Sign up
            </Link>
          </p>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Login;
