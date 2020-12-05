import React, { useEffect, useState } from "react";
import _ from "lodash/fp";
import { Grid, TextField, Button, CircularProgress } from "@material-ui/core";
import { useForm } from "react-hook-form";
import Axios from "axios";
import { useParams } from "react-router-dom";

const ResetPassword = (props) => {
  const { resetToken } = useParams();

  const { register, handleSubmit, errors, watch } = useForm();

  const [showError, setShowError] = useState({ error: false, reason: null });

  const [loading, setLoading] = useState(false);

  const resetPassword = (data) => {
    setLoading(true);
    Axios.post(
      `/api/auth/reset/${resetToken}`,
      { data },
      { withCredentials: true }
    ).then((res) =>
      res.data.pass
        ? props.history.push("/")
        : setShowError({ error: true, reason: "There is an Error" })
    );
  };

  return (
    <Grid container alignItems="center" direction="column">
      <h2>Reset your password</h2>
      <p>
        Please enter and confirm your new password below to access your account
      </p>
      {showError.error && (
        <p style={{ color: "red", fontWeight: "bold" }}>There is an Error</p>
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
        required
      />
      {_.get("confirmPassword.type", errors) === "required" && (
        <p>This field is required</p>
      )}
      {_.get("confirmPassword.type", errors) === "validate" && (
        <p>confirm password doesn't match password</p>
      )}
      {loading ? (
        <CircularProgress style={{ marginTop: "2rem" }} />
      ) : (
        <Button
          style={{ marginTop: "2rem" }}
          variant="contained"
          color="primary"
          onClick={handleSubmit(resetPassword)}
        >
          Reset password
        </Button>
      )}
    </Grid>
  );
};

export default ResetPassword;
