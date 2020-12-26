import { Grid, TextField, Button } from "@material-ui/core";
import ContactUsImage from "../assets/images/Contact-Us.jpeg";
import { FaFacebookF, FaTwitter } from "react-icons/fa";
import { IoIosMail, IoMdPin } from "react-icons/io";
import { MdLocalPhone } from "react-icons/md";

const ContactUs = () => {
  return (
    <Grid
      style={{
        width: "100%",
        height: "calc(100vh - 3.5rem)",
        padding: "0",
        margin: "0",
        position: "relative",
      }}
    >
      <img
        style={{
          width: "100%",
          height: "100%",
          padding: "0",
          margin: "0",
          position: "absolute",
          top: 0,
          zIndex: -1,
        }}
        src={ContactUsImage}
      />

      <Grid
        container
        alignItems="center"
        style={{ width: "650px", height: "100%", marginLeft: "89px" }}
      >
        <Grid>
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
                  color: "#2C4563",
                  textAlign: "center",
                  fontSize: "35px",
                  font: "normal normal 600 35px/53px Poppins",
                }}
              >
                Contact Us
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

          <Grid style={{ marginBottom: "40px" }}>
            <p
              style={{
                font: "normal normal normal 18px/27px Poppins",
                color: "#424446",
              }}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod
            </p>
          </Grid>

          <Grid container style={{ marginBottom: "37px" }}>
            <TextField
              style={{ width: "314px", marginRight: "20px" }}
              variant="outlined"
              label="Name"
            />
            <TextField
              style={{ width: "314px" }}
              variant="outlined"
              label="Email"
            />
            <TextField
              style={{ width: "100%", marginTop: "21px" }}
              multiline
              rows={9}
              rowsMax={9}
              variant="outlined"
              label="Message"
            />
          </Grid>

          <Button
            variant="contained"
            style={{
              width: "162px",
              height: "55px",
              backgroundColor: "#1C60B3",
              color: "white",
              borderRadius: "10px",
              font: "normal normal 400 16px Poppins",
              margin: "0 auto",
              display: "block",
            }}
          >
            Submit
          </Button>
        </Grid>
      </Grid>

      <Grid style={{ position: "absolute", top: "40px", right: "15px" }}>
        <FaFacebookF
          style={{
            display: "block",
            margin: "17px 0",
            height: "1.4rem",
            width: "1.4rem",
          }}
          color="#2C4563"
          cursor="pointer"
        />
        <FaTwitter
          style={{
            display: "block",
            margin: "17px 0",
            height: "1.4rem",
            width: "1.4rem",
          }}
          color="#2C4563"
          cursor="pointer"
        />
        <IoIosMail
          style={{
            display: "block",
            margin: "17px 0",
            height: "1.4rem",
            width: "1.4rem",
          }}
          color="#2C4563"
          cursor="pointer"
        />
        <MdLocalPhone
          style={{
            display: "block",
            margin: "17px 0",
            height: "1.4rem",
            width: "1.4rem",
          }}
          color="#2C4563"
          cursor="pointer"
        />
        <IoMdPin
          style={{
            display: "block",
            margin: "17px 0",
            height: "1.4rem",
            width: "1.4rem",
          }}
          color="#2C4563"
          cursor="pointer"
        />
      </Grid>
    </Grid>
  );
};

export default ContactUs;
