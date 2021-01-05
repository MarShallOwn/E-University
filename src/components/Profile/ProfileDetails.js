import React, { useState } from "react";
import { Grid, TextField, Typography } from "@material-ui/core";
import { useLoggedIn, useUser } from "../../contexts/UserProvider";
import { useForm } from "react-hook-form";
import { MdClear } from "react-icons/md";
import Axios from "axios";
import _ from "lodash/fp";

const ProfileDetails = (props) => {
  const setLoggedIn = useLoggedIn();
  const user = useUser();

  const { setShowProfileSection } = props;

  const { register, handleSubmit, errors } = useForm();

  const [activeEdit, setActiveEdit] = useState(null);

  const updateUser = (data) => {
    Axios.post("/api/updateProfile", { data }, { withCredentials: true }).then(
      (res) => {
        if (res.data.pass) {
          setLoggedIn(false);
          setShowProfileSection("showDetails");
          setActiveEdit(null)
        }
      }
    );
  };

  console.log(user);

  return (
    <Grid>
      <Grid
        container
        style={{ width: "670px", position: "relative", margin: "25px 0" }}
      >
        <Typography
          display="inline"
          variant="body1"
          style={{
            color: "#424446",
            font: "normal normal bold 17px/36px Poppins",
            position: "absolute",
            left: "0",
          }}
        >
          E-mail{" "}
        </Typography>
        <Typography
          display="inline"
          variant="body1"
          style={{
            color: "#424446",
            font: "normal normal normal 17px/36px Poppins",
            marginLeft: "200px",
          }}
        >
          {user.email}
        </Typography>
        <Typography
          onClick={() => setShowProfileSection("changeEmail")}
          display="inline"
          variant="body1"
          style={{
            cursor: "pointer",
            color: "#4878B1",
            font: "normal normal normal 17px/36px Poppins",
            position: "absolute",
            right: "0",
          }}
        >
          Edit
        </Typography>
      </Grid>
      <Grid
        container
        style={{ width: "670px", position: "relative", margin: "25px 0" }}
      >
        <Typography
          display="inline"
          variant="body1"
          style={{
            color: "#424446",
            font: "normal normal bold 17px/36px Poppins",
            position: "absolute",
            left: "0",
          }}
        >
          Password{" "}
        </Typography>
        <Typography
          display="inline"
          variant="body1"
          style={{
            color: "#424446",
            font: "normal normal normal 17px/36px Poppins",
            marginLeft: "200px",
          }}
        >
          ***************
        </Typography>
        <Typography
          onClick={() => setShowProfileSection("changePassword")}
          display="inline"
          variant="body1"
          style={{
            cursor: "pointer",
            color: "#4878B1",
            font: "normal normal normal 17px/36px Poppins",
            position: "absolute",
            right: "0",
          }}
        >
          Edit
        </Typography>
      </Grid>
      {activeEdit === "address" ? (
        <>
          <Grid
            container
            style={{ width: "670px", position: "relative", margin: "25px 0" }}
          >
            <Typography
              display="inline"
              variant="body1"
              style={{
                color: "#424446",
                font: "normal normal bold 17px/36px Poppins",
                position: "absolute",
                left: "0",
              }}
            >
              Street{" "}
            </Typography>
            <TextField
            name="street"
              size="small"
              variant="outlined"
              defaultValue={user.street}
              style={{
                color: "#424446",
                font: "normal normal normal 17px/36px Poppins",
                marginLeft: "200px",
              }}
              inputRef={register()}
            />
            <MdClear
              onClick={() => setActiveEdit(null)}
              color="#424446"
              fontSize="16px"
              style={{
                cursor: 'pointer',
                position: "absolute",
                right: "50px",
                top: "50%",
                transform: "translateY(-50%)",
              }}
            />
            <Typography
              onClick={handleSubmit(updateUser)}
              display="inline"
              variant="body1"
              style={{
                cursor: "pointer",
                color: "#4878B1",
                font: "normal normal normal 17px/36px Poppins",
                position: "absolute",
                right: "0",
              }}
            >
              Save
            </Typography>
          </Grid>
          <Grid
            container
            style={{ width: "670px", position: "relative", margin: "25px 0" }}
          >
            <Typography
              display="inline"
              variant="body1"
              style={{
                color: "#424446",
                font: "normal normal bold 17px/36px Poppins",
                position: "absolute",
                left: "0",
              }}
            >
              City{" "}
            </Typography>
            <TextField
              name="city"
              size="small"
              variant="outlined"
              style={{
                color: "#424446",
                font: "normal normal normal 17px/36px Poppins",
                marginLeft: "200px",
              }}
              defaultValue={user.city}
              inputRef={register({
                required: true,
              })}
            />
            {_.get("city.type", errors) === "required" && (
              <p>This field is required</p>
            )}
          </Grid>
        </>
      ) : (
        <>
          <Grid
            container
            style={{ width: "670px", position: "relative", margin: "25px 0" }}
          >
            <Typography
              display="inline"
              variant="body1"
              style={{
                color: "#424446",
                font: "normal normal bold 17px/36px Poppins",
                position: "absolute",
                left: "0",
              }}
            >
              Address{" "}
            </Typography>
            <Typography
              display="inline"
              variant="body1"
              style={{
                color: "#424446",
                font: "normal normal normal 17px/36px Poppins",
                marginLeft: "200px",
              }}
            >
              {`${user.street && `${user.street},`} ${user.city}`}
            </Typography>
            <Typography
              onClick={() => setActiveEdit("address")}
              display="inline"
              variant="body1"
              style={{
                cursor: "pointer",
                color: "#4878B1",
                font: "normal normal normal 17px/36px Poppins",
                position: "absolute",
                right: "0",
              }}
            >
              Edit
            </Typography>
          </Grid>
        </>
      )}

      <Grid
        container
        style={{ width: "670px", position: "relative", margin: "25px 0" }}
      >
        <Typography
          display="inline"
          variant="body1"
          style={{
            color: "#424446",
            font: "normal normal bold 17px/36px Poppins",
            position: "absolute",
            left: "0",
          }}
        >
          Phone Number{" "}
        </Typography>
        {activeEdit === "phoneNumber" ? (
          <>
            <TextField
              name="phoneNumber"
              size="small"
              variant="outlined"
              style={{
                color: "#424446",
                font: "normal normal normal 17px/36px Poppins",
                marginLeft: "200px",
              }}
              defaultValue={user.phoneNumber}
              inputRef={register({
                required: true,
                pattern: /^[0-9]*$/,
                maxLength: 11,
                minLength: 11,
              })}
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
            <MdClear
              onClick={() => setActiveEdit(null)}
              color="#424446"
              fontSize="16px"
              style={{
                cursor: 'pointer',
                position: "absolute",
                right: "50px",
                top: "50%",
                transform: "translateY(-50%)",
              }}
            />
            <Typography
              onClick={handleSubmit(updateUser)}
              display="inline"
              variant="body1"
              style={{
                cursor: "pointer",
                color: "#4878B1",
                font: "normal normal normal 17px/36px Poppins",
                position: "absolute",
                right: "0",
              }}
            >
              Save
            </Typography>
          </>
        ) : (
          <>
            <Typography
              display="inline"
              variant="body1"
              style={{
                color: "#424446",
                font: "normal normal normal 17px/36px Poppins",
                marginLeft: "200px",
              }}
            >
              {user.phoneNumber}
            </Typography>
            <Typography
              onClick={() => setActiveEdit("phoneNumber")}
              display="inline"
              variant="body1"
              style={{
                cursor: "pointer",
                color: "#4878B1",
                font: "normal normal normal 17px/36px Poppins",
                position: "absolute",
                right: "0",
              }}
            >
              Edit
            </Typography>
          </>
        )}
      </Grid>
    </Grid>
  );
};

export default ProfileDetails;
