import React, { useState } from "react";
import _ from "lodash/fp";
import { Grid, TextField, Button, CircularProgress } from "@material-ui/core";
import { useForm } from "react-hook-form";
import Axios from "axios";

const ForgotPassword = (props) => {
  const { register, handleSubmit, errors } = useForm();

  const [showError, setShowError] = useState({ error: false, reason: null });

  const [loading, setLoading] = useState(false);

  const sendMail = (data) => {
    setLoading(true);
    Axios.post(
      "/api/auth/forgotpassword",
      { data },
      { withCredentials: true }
    ).then((res) =>
      res.data.pass
        ? props.history.push("/check-email")
        : setShowError({ error: true, reason: "user not found" })
    );
  };

  return (
    <Grid container alignItems="center" direction="column">
      {showError.error && <p>No user found</p>}
      <TextField
        type="email"
        name="email"
        id="email"
        label="E-mail"
        inputRef={register({
          required: true,
          pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
        })}
        required
      />
      {_.get("email.type", errors) === "required" && (
        <p>This field is required</p>
      )}
      {_.get("email.type", errors) === "pattern" && (
        <p>Please include an '@' in the email address and write the domain</p>
      )}
      {loading ? (
        <CircularProgress style={{ marginTop: "2rem" }} />
      ) : (
        <Button
          style={{ marginTop: "2rem" }}
          variant="contained"
          color="primary"
          onClick={handleSubmit(sendMail)}
        >
          Send Link
        </Button>
      )}
    </Grid>
  );
};

export default ForgotPassword;
