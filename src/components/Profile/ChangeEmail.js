import React, { useState } from "react";
import _ from "lodash/fp";
import { Grid, TextField, Button, CircularProgress } from "@material-ui/core";
import { useForm } from "react-hook-form";
import Axios from "axios";
import { useLoggedIn } from "../../contexts/UserProvider";

const ChangeEmail = (props) => {
  const setLoggedIn = useLoggedIn();

  const { cancelUpdate, setShowProfileSection } = props;

  const { register, handleSubmit, errors } = useForm();

  const [loading, setLoading] = useState(false);

  const changeEmail = (data) => {
    setLoading(true);
    Axios.post(
      `/api/auth/changeEmail`,
      { data },
      { withCredentials: true }
    ).then((res) => {
      if (res.data.pass) {
        setLoggedIn(false);
        setShowProfileSection("showDetails");
      } else {
        setLoading(false);
      }
    });
  };

  return (
    <Grid container alignItems="center" direction="column">
      <h3>Change Email</h3>
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
        <Grid>
          <Button
            style={{ marginTop: "2rem" }}
            variant="contained"
            onClick={() => cancelUpdate("changeEmail")}
          >
            Cancel
          </Button>
          <Button
            style={{ margin: "2rem 0 0 .5rem" }}
            variant="contained"
            color="primary"
            onClick={handleSubmit(changeEmail)}
          >
            Change Email
          </Button>
        </Grid>
      )}
    </Grid>
  );
};

export default ChangeEmail;
