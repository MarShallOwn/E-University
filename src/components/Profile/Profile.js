import React, { useState, useRef } from "react";
import {
  Grid,
  Typography,
  Button,
  CircularProgress,
  makeStyles,
} from "@material-ui/core";
import Axios from "axios";
import { useUser, useLoggedIn } from "../../contexts/UserProvider";
import EditProfile from "./EditProfile";
import { MdEdit } from 'react-icons/md'
import ProfileDetails from "./ProfileDetails";

const Profile = () => {
  const profileImageRef = useRef(null);

  const user = useUser();

  const setLoggedIn = useLoggedIn();

  const classes = useStyles();

  const [showChangeButton, setShowChangeButton] = useState(false);
  const [uploadImage, setUploadImage] = useState(null);
  const [showEditProfile, setShowEditProfile] = useState(false)

  const [loading, setLoading] = useState(false);

  const clickFileUpload = () => {
    profileImageRef.current.click();
  };

  const tempSaveImage = (e) => {
    const url = URL.createObjectURL(e.target.files[0]);

    setUploadImage({ image: e.target.files[0], url, temp: true });
  };

  const updateImage = () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("myFile", uploadImage.image);

    const headers = {
      "Content-Type": "multipart/form-data",
    };

    Axios.post("/api/updateImage", formData, headers).then((res) => {
      if (res.data.pass) {
        setUploadImage({ ...uploadImage, temp: false });
        setLoggedIn(false);
      }
      setLoading(false);
    });
  };

  const cancelUpdate = type => {
    type === "image" ? setUploadImage(null) : setShowEditProfile(false)
  };

  return (
    <Grid container alignItems="center" direction="column">
      {
        !showEditProfile && <MdEdit fontSize="1.5rem" style={{marginBottom: '.5rem', cursor: 'pointer'}} onClick={() => setShowEditProfile(true)} />
      }
      <Grid
        onClick={clickFileUpload}
        onMouseOver={() => setShowChangeButton(true)}
        onMouseLeave={() => setShowChangeButton(false)}
        className={classes.pictureContainer}
      >
        <input
          ref={profileImageRef}
          style={{ display: "none" }}
          onChange={tempSaveImage}
          type="file"
          accept="image/png, image/jpeg, image/jpg"
          multiple={false}
        />
        <img
          style={{ borderRadius: "50%", height: "7rem", width: "7rem" }}
          src={
            uploadImage
              ? uploadImage.url
              : `https://res.cloudinary.com/dxkufsejm/image/upload/v1601325837/${user.picture}`
          }
        />
        <Grid
          container
          alignItems="center"
          justify="center"
          className={showChangeButton ? classes.pictureHover : classes.picture}
        >
          {showChangeButton && (
            <Typography variant="body1">Change Picture</Typography>
          )}
        </Grid>
      </Grid>

      {uploadImage &&
        uploadImage.temp &&
        (loading ? (
          <CircularProgress />
        ) : (
          <Grid>
            <Button onClick={() => cancelUpdate("image")} variant="contained">
              Cancel
            </Button>
            <Button
              onClick={updateImage}
              style={{ marginLeft: "1rem" }}
              variant="contained"
              color="primary"
            >
              Save
            </Button>
          </Grid>
        ))}

      {user.isAdmin && (
        <Typography
          style={{ fontSize: "1.2rem", color: "red", fontWeight: "bold" }}
          variant="body1"
        >
          Admin
        </Typography>
      )}
      {user.isProf && (
        <Typography
          style={{ fontSize: "1.2rem", color: "purple", fontWeight: "bold" }}
          variant="body1"
        >
          Professor
        </Typography>
      )}
      { showEditProfile ? <EditProfile cancelUpdate={cancelUpdate} setShowEditProfile={setShowEditProfile} /> : <ProfileDetails /> }
    </Grid>
  );
};

export default Profile;


const useStyles = makeStyles(() => ({
  pictureContainer: {
    position: "relative",
    borderRadius: "100%",
    height: "7rem",
    width: "7rem",
    cursor: "pointer",
  },
  picture: {
    position: "absolute",
    textAlign: "center",
    height: "100%",
    borderRadius: "50%",
    top: "50%",
    transform: "translateY(-50%)",
    visibility: "hidden",
    transition: ".5s",
  },
  pictureHover: {
    backgroundColor: "rgba(0, 0, 0, .3)",
    color: "white",
    position: "absolute",
    textAlign: "center",
    height: "100%",
    borderRadius: "50%",
    top: "50%",
    transform: "translateY(-50%)",
    transition: ".5s",
  },
}));