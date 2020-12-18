import React, { useEffect, useState } from "react";
import _ from "lodash/fp";
import { Link } from 'react-router-dom'
import { Grid, TextField, Button } from "@material-ui/core";
import { useForm } from "react-hook-form";
import Axios from "axios";
import registerImage from '../../assets/images/Login.jpeg'

const ContinueRegister = (props) => {
  const { register, handleSubmit, errors, watch } = useForm();

  const [showError, setShowError] = useState({ error: false, reason: null });

  useEffect(() => {
    if (!props.location.state || !props.location.state.continue) {
      props.history.push("/register");
    }
  }, [props.location.state, props.history]);

  const registerUser = (data) => {
    data = { ...data, nationalID: props.location.state.nationalID };
    Axios.post("/api/continueRegister", { data }).then((res) =>
      res.data.pass
        ? props.history.push("/register-complete")
        : setShowError({ error: true, reason: res.data.reason })
    );
  };

  return (
    <Grid container style={{ height: "calc(100vh - 3.5rem)" }}>
      <Grid item xs={6}>
        <img
          style={{ width: "100%", height: "100%" }}
          src={registerImage}
        />
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
                Sign Up
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

              {showError.error &&
                (showError.reason === "email" ? (
                  <p>Already Registered</p>
                ) : (
                  <p>No user found</p>
                ))}
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
                    marginBottom: '20px',
                    font: 'normal normal medium 16px/35px Poppins'
                }}
                required
              />
              {_.get("email.type", errors) === "required" && (
                <p>This field is required</p>
              )}
              {_.get("email.type", errors) === "pattern" && (
                <p>
                  Please include an '@' in the email address and write the
                  domain
                </p>
              )}
              <TextField
                type="password"
                name="password"
                id="password"
                label="Password"
                inputRef={register({
                  required: true,
                  minLength: 8,
                })}
                style={{
                    marginBottom: '20px',
                    font: 'normal normal medium 16px/35px Poppins'
                }}
                required
              />
              {_.get("password.type", errors) === "required" && (
                <p>This field is required</p>
              )}
              {_.get("password.type", errors) === "minLength" && (
                <p>password shouldn't be less than 8 characters</p>
              )}
              <TextField
                type="password"
                name="confirmPassword"
                id="confirmpassword"
                label="Confirm Password"
                inputRef={register({
                  required: true,
                  validate: (value) => value === watch("password"),
                })}
                style={{
                    marginBottom: '20px',
                    font: 'normal normal medium 16px/35px Poppins'
                }}
                required
              />
              {_.get("confirmPassword.type", errors) === "required" && (
                <p>This field is required</p>
              )}
              {_.get("confirmPassword.type", errors) === "validate" && (
                <p>confirm password doesn't match password</p>
              )}
              <TextField
                name="street"
                id="street"
                label="Street"
                inputRef={register()}
                style={{
                    marginBottom: '20px',
                    font: 'normal normal medium 16px/35px Poppins'
                }}
              />
              <TextField
                name="city"
                id="city"
                label="City"
                inputRef={register({
                  required: true,
                })}
                style={{
                    marginBottom: '20px',
                    font: 'normal normal medium 16px/35px Poppins'
                }}
                required
              />
              {_.get("city.type", errors) === "required" && (
                <p>This field is required</p>
              )}
              <TextField
                name="phoneNumber"
                id="phoneNumber"
                label="Phone Number"
                inputRef={register({
                  required: true,
                  pattern: /^[0-9]*$/,
                  maxLength: 11,
                  minLength: 11,
                })}
                style={{
                    marginBottom: '20px',
                    font: 'normal normal medium 16px/35px Poppins'
                }}
                required
              />
              {_.get("phoneNumber.type", errors) === "required" && (
                <p>This field is required</p>
              )}
              {_.get("phoneNumber.type", errors) === "pattern" && (
                <p>This field must be digits only</p>
              )}
              {(_.get("phoneNumber.type", errors) === "minLength" ||
                _.get("phoneNumber.type", errors) === "maxLength") && (
                <p>This field should be 11-digits</p>
              )}
              <Button
            style={{ height: '55px', borderRadius: '10px', marginTop: "2rem", backgroundColor: '#1C60B3', color: 'white', font: 'normal normal medium 16px/35px Poppins', fontSize: '16px' }}
                variant="contained"
                onClick={handleSubmit(registerUser)}
              >
                Sign Up
              </Button>
              <p style={{textAlign: 'center', marginTop: '18px', color: '#9696A0', font: 'normal normal normal 14px/21px Poppins', fontSize: '14px'}}>Already have a account ? <Link to="/login" style={{color: '#242523'}}>Sign in</Link></p>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ContinueRegister;
