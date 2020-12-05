import React, { useState } from "react";
import _ from "lodash/fp";
import { Grid, TextField, Button, CircularProgress } from "@material-ui/core";
import { useForm } from "react-hook-form";
import Axios from "axios";

const ChangePassword = props => {

    const { cancelUpdate, setShowProfileSection } = props

    const { register, handleSubmit, errors, watch } = useForm();

    const [showError, setShowError] = useState({ error: false, reason: null });
  
    const [loading, setLoading] = useState(false);
  
    const changePassword = (data) => {
      setLoading(true);
      Axios.post(
        `/api/auth/changePassword`,
        { data },
        { withCredentials: true }
      ).then((res) => {
        if(res.data.pass){
            setShowProfileSection("showDetails")
        }
        else{
            setLoading(false)
            setShowError({ error: true, reason: "There is an Error" })
        }
      }
      );
    };

  return (
    <Grid>
      <Grid container alignItems="center" direction="column">
        <h3>Change Password</h3>
        <p>
          Please enter you current password, new password and confirm your new
          password below
        </p>
        {showError.error && (
          <p style={{ color: "red", fontWeight: "bold" }}>Current Password Incorrect</p>
        )}
        <TextField
          type="password"
          name="currentPassword"
          id="currentPassword"
          label="Current Password"
          inputRef={register({
            required: true,
            minLength: 8,
          })}
          required
        />
        {_.get("currentPassword.type", errors) === "required" && (
          <p>This field is required</p>
        )}
        {_.get("currentPassword.type", errors) === "minLength" && (
          <p>password shouldn't be less than 8 characters</p>
        )}
        <TextField
          type="password"
          name="newPassword"
          id="newPassword"
          label="New Password"
          inputRef={register({
            required: true,
            minLength: 8,
          })}
          required
        />
        {_.get("newPassword.type", errors) === "required" && (
          <p>This field is required</p>
        )}
        {_.get("newPassword.type", errors) === "minLength" && (
          <p>password shouldn't be less than 8 characters</p>
        )}
        <TextField
          type="password"
          name="confirmPassword"
          id="confirmpassword"
          label="Confirm Password"
          inputRef={register({
            required: true,
            validate: (value) => value === watch("newPassword"),
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
            <Grid>
                <Button style={{marginTop: '2rem'}} variant="contained" onClick={() => cancelUpdate("changePassword")}>
                    Cancel
                </Button>
                <Button style={{margin: '2rem 0 0 .5rem'}} variant="contained" color="primary" onClick={handleSubmit(changePassword)}>
                    Change Password
                </Button>
            </Grid>
        )}
      </Grid>
    </Grid>
  );
};

export default ChangePassword;
