import React, { useState, useRef, useCallback } from "react";
import {
  Grid,
  Typography,
  Button,
  CircularProgress,
  makeStyles,
  Dialog,
  Fade,
  Backdrop,
} from "@material-ui/core";
import Axios from "axios";
import { useUser, useLoggedIn } from "../../contexts/UserProvider";
import EditProfile from "./EditProfile";
import { MdEdit, MdLock, MdEmail } from "react-icons/md";
import ProfileDetails from "./ProfileDetails";
import ChangeEmail from "./ChangeEmail";
import ChangePassword from "./ChangePassword";
import ProfileCover from "../../assets/images/Profile-Cover.jpeg";

/**
 * Crop image imports
 */
import Cropper from "react-easy-crop";
import getCroppedImg from "./cropImage";

const readFile = (file) => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => resolve(reader.result), false);
    reader.readAsDataURL(file);
  });
};

const Profile = () => {
  const profileImageRef = useRef(null);

  const user = useUser();

  const setLoggedIn = useLoggedIn();

  const classes = useStyles();

  const [showChangeButton, setShowChangeButton] = useState(false);
  const [uploadImage, setUploadImage] = useState(null);
  const [showProfileSection, setShowProfileSection] = useState("showDetails");

  const [loading, setLoading] = useState(false);

  /**
   * Crop image state
   */
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [imageSrc, setImageSrc] = useState(null);

  /**
   * Crop Image Section
   */
  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const onFileChange = async (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      let imageDataUrl = await readFile(file);

      setImageSrc(imageDataUrl);
    }
  };

  const showCroppedImage = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
      console.log("donee", { croppedImage });
      setCroppedImage(croppedImage);
      updateImage(croppedImage);
    } catch (e) {
      console.error(e);
    }
  }, [croppedAreaPixels]);

  const clickFileUpload = () => {
    profileImageRef.current.click();
  };

  const updateImage = (croppedImage) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("myFile", croppedImage.image);

    const headers = {
      "Content-Type": "multipart/form-data",
    };

    Axios.post("/api/updateImage", formData, headers).then((res) => {
      if (res.data.pass) {
        setImageSrc(null);
        setLoggedIn(false);
      }
      setLoading(false);
    });
  };

  const cancelUpdate = (type) => {
    type === "image" ? setImageSrc(null) : setShowProfileSection("showDetails");
  };

  let section;

  if (showProfileSection === "showDetails") {
    section = <ProfileDetails setShowProfileSection={setShowProfileSection} />;
  } else if (showProfileSection === "editDetails") {
    section = (
      <EditProfile
        cancelUpdate={cancelUpdate}
        setShowProfileSection={setShowProfileSection}
      />
    );
  } else if (showProfileSection === "changePassword") {
    section = (
      <ChangePassword
        cancelUpdate={cancelUpdate}
        setShowProfileSection={setShowProfileSection}
      />
    );
  } else if (showProfileSection === "changeEmail") {
    section = (
      <ChangeEmail
        cancelUpdate={cancelUpdate}
        setShowProfileSection={setShowProfileSection}
      />
    );
  }
  return (
    <Grid
      container
      justify="center"
      alignItems="center"
      style={{ height: "calc(100vh - 3.5rem)", width: "100%" }}
    >
      <Grid
        style={{
          height: "650px",
          width: "1268px",
          position: "relative",
        }}
      >
        <Grid
          style={{
            height: "181px",
            width: "100%",
            overflow: "hidden",
            borderRadius: "10px 10px 0 0",
          }}
        >
          <img style={{ marginTop: "-100px" }} src={ProfileCover} />
        </Grid>
        <Grid
          style={{
            position: "absolute",
            top: "104px",
            left: "107px",
            textAlign: "center",
          }}
        >
          <Grid
            onClick={clickFileUpload}
            onMouseOver={() => setShowChangeButton(true)}
            onMouseLeave={() => setShowChangeButton(false)}
            className={classes.pictureContainer}
          >
            <input
              ref={profileImageRef}
              style={{ display: "none" }}
              onChange={onFileChange}
              type="file"
              accept="image/png, image/jpeg, image/jpg"
              multiple={false}
            />
            <img
              style={{ borderRadius: "50%", height: "130px", width: "130px" }}
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
              className={
                showChangeButton ? classes.pictureHover : classes.picture
              }
            >
              {showChangeButton && (
                <Typography variant="body1">Change Picture</Typography>
              )}
            </Grid>
          </Grid>

          {user.isAdmin && (
            <Typography
              style={{
                color: "red",
                font: "normal normal 600 15px/34px Poppins",
              }}
              variant="body1"
            >
              Admin
            </Typography>
          )}
          {user.isProf && (
            <Typography
              style={{
                color: "purple",
                font: "normal normal 600 15px/34px Poppins",
              }}
              variant="body1"
            >
              Professor
            </Typography>
          )}
          {!user.isAdmin && !user.isProf && (
            <Typography
              style={{
                color: "#3D5E84",
                font: "normal normal 600 15px/34px Poppins",
              }}
              variant="body1"
            >
              Student
            </Typography>
          )}
        </Grid>

        <Grid style={{ position: "absolute", top: "185px", left: "270px" }}>
          <p
            style={{
              color: "#3D5E84",
              font: "normal normal bold 19px/36px Poppins",
              margin: "0",
            }}
          >{`${user.firstname} ${user.lastname}`}</p>
          <p
            style={{
              color: "#424446",
              font: "normal normal normal 15px/15px Poppins",
              margin: "0",
            }}
          >{`${user.faculty} , ${user.department && user.department} ,${
            user.level && ` Level ${user.level}`
          }`}</p>
        </Grid>

        <Grid
          container
          justify="center"
          style={{
            paddingTop: "95px",
            border: "1px solid rgba(150, 150, 150, 0.59)",
            borderTop: "none",
            borderRadius: "0 0 10px 10px",
            height: "calc(100% - 181px)",
          }}
        >
          <Grid
            style={{
              height: "347px",
              width: "319px",
              backgroundColor: "rgba(150, 150, 150, 0.09)",
              marginRight: "32px",
              borderRadius: "10px",
            }}
          >
            <p
              style={{
                color: "#3D5E84",
                font: "normal normal bold 16px/34px Poppins",
                marginLeft: "24px",
              }}
            >
              About
            </p>

            <p
              style={{
                color: "#707070",
                font: "normal normal normal 16px/25px Poppins",
                width: "265px",
                margin: "0 auto",
              }}
            >
              Hi, I am ..., nice to see you on my page. I am a student in a
              computer science college. I am a UI/UX designer. I love everything
              related to art, creativity, and colors.
            </p>
          </Grid>
          <Grid
            container
            alignItems="center"
            style={{
              height: "347px",
              width: "846px",
              backgroundColor: "rgba(150, 150, 150, 0.09)",
              borderRadius: "10px",
              paddingLeft: "48px",
            }}
          >
            {section}
          </Grid>
        </Grid>
      </Grid>
      <Dialog
        className={classes.dialog}
        open={imageSrc}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={imageSrc}>
          <Grid
            style={{
              backgroundColor: "white",
              height: "1000px",
              borderRadius: "25px",
            }}
          >
            <Grid
              style={{ position: "relative", height: "30rem", width: "600px" }}
            >
              <Cropper
                image={imageSrc}
                crop={crop}
                zoom={zoom}
                aspect={4 / 4}
                onCropChange={setCrop}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
                cropShape="round"
              />
            </Grid>

            <Grid style={{ textAlign: "center", marginTop: "20px" }}>
              {loading ? (
                <CircularProgress />
              ) : (
                <>
                  <Button
                    onClick={() => cancelUpdate("image")}
                    variant="contained"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={showCroppedImage}
                    style={{ marginLeft: "1rem" }}
                    variant="contained"
                    color="primary"
                  >
                    Save
                  </Button>
                </>
              )}
            </Grid>
          </Grid>
        </Fade>
      </Dialog>
    </Grid>
  );
};

export default Profile;

const useStyles = makeStyles(() => ({
  pictureContainer: {
    position: "relative",
    borderRadius: "100%",
    height: "130px",
    width: "130px",
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

/*
          {uploadImage &&
            uploadImage.temp &&
            (loading ? (
              <CircularProgress />
            ) : (
              <Grid>
                <Button
                  onClick={() => cancelUpdate("image")}
                  variant="contained"
                >
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
*/
