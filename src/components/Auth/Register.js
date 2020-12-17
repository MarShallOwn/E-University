import React, { useState, useEffect } from "react";
import _ from "lodash/fp";
import { Grid, TextField, Button } from "@material-ui/core";
import { useUser } from "../../contexts/UserProvider";
import { useForm } from "react-hook-form";
import Axios from "axios";
import { useStyles } from './style'

const Register = (props) => {
  const user = useUser();

  const classes = useStyles()

  useEffect(() => {
    user.email && props.history.push("/");
  }, [user, props.history]);

  const [showError, setShowError] = useState({ error: false, reason: null });

  const { register, handleSubmit, errors } = useForm();

  const registerUser = (data) => {
    data = { nationalID: data.nationalID.trim() };
    Axios.post("/api/registerUser", { data }).then((res) =>
      res.data.status === 200
        ? props.history.push({
            pathname: "/continue-register",
            state: { continue: res.data.continue, nationalID: data.nationalID },
          })
        : setShowError({ error: true, reason: res.data.reason })
    );
  };

  return (
    <Grid className={classes.root} container alignItems="center" justify="center" direction="column" style={{ height: "calc(100vh - 3.5rem)" }}>
        <div style={{height: '222px', width: '222px', borderRadius: '50%', backgroundColor: 'grey', marginBottom: '39.5px'}}></div>
      <p style={{
          lineHeight: '0',
          fontWeight: '500',
          fontSize: '35px',
          color: '#2C4563',
          font: 'normal normal medium 35px Poppins'
      }}>Enter your ID</p>
      <p style={{
          lineHeight: '0',
            fontSize: '20px',
          color: '#424446',
          font: 'normal normal normal 20px Poppins',
          marginTop: '0',
          marginBottom: '50px',
      }}>Please enter your national ID to be able to register</p>
      {showError.error &&
        (showError.reason === "email" ? (
          <p>Already Registered</p>
        ) : (
          <p>No user found</p>
        ))}
      <TextField
        name="nationalID"
        id="nationalID"
        variant="outlined"
        label="Your National ID"
        onInput={(e) => {
          e.target.value = Math.max(0, parseInt(e.target.value))
            .toString()
            .slice(0, 14);
        }}
        inputRef={register({
          required: true,
        })}
        style={{
            borderRadius: '50px',
            width: '658px'
        }}
        required
      />
      {_.get("nationalID.type", errors) === "required" && (
        <p>This field is required</p>
      )}
      <Button
        style={{ marginTop: "2rem", height: '55px', fontSize: '16px', font: 'normal normal medium 16px/25px Poppins' }}
        variant="contained"
        color="primary"
        onClick={handleSubmit(registerUser)}
      >
        Continue Registeration
      </Button>
    </Grid>
  );
};

export default Register;
