import React, { useEffect } from "react";
import _ from "lodash";
import { Grid } from "@material-ui/core";
import { useUser } from "../contexts/UserProvider";
import "./styleHome.css";
import { useStyles } from "./HomeStyle";
import { FaFacebookF, FaTwitter } from "react-icons/fa";

const Home = () => {
  const user = useUser();

  const classes = useStyles();

  return (
    <Grid>
      {/* First Section */}
      <Grid
        style={{
          height: "calc(100vh - 3.5rem)",
          width: "100%",
          position: "relative",
        }}
      >
        <img
          style={{
            height: "100%",
            width: "100%",
            objectFit: "fill",
            backgroundOrigin: "padding-box",
          }}
          src={
            "https://img.freepik.com/free-photo/young-attractive-smiling-student-showing-thumb-up-outdoors-campus-university_8353-6394.jpg?size=626&ext=jpg"
          }
        />
        <Grid
          style={{
            position: "absolute",
            top: "288px",
            left: "85px",
            color: "white",
            width: "792px",
          }}
        >
          <p
            style={{
              fontSize: "40px",
              font: "normal normal 600 40px/60px Poppins",
            }}
          >
            Lorem ipsum dolor sit
          </p>
          <p
            style={{
              fontSize: "20px",
              font: "normal normal 600 20px/30px Poppins",
            }}
          >
            consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
            dolore magna aliqua. Ut enim ad minim veniam
          </p>
        </Grid>
      </Grid>

      {/* Why choose Us ? */}
      <Grid
        style={{
          height: "650px",
          margin: "66px 91.5px 0 91.5px",
          position: "relative",
        }}
      >
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
                font: "normal normal normal 35px/53px Poppins",
              }}
            >
              Why choose us ?
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

        <Grid style={{ zIndex: "-1" }}>
          <Grid
            style={{
              position: "absolute",
              top: "213px",
              left: "30px",
              width: "645px",
              height: "225px",
            }}
          >
            <p
              style={{
                color: "#424446",
                fontSize: "20px",
                font: "normal normal normal 20px/33px Segoe UI",
              }}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </Grid>
          <img
            style={{
              width: "449px",
              height: "400px",
              zIndex: "1",
              position: "absolute",
              top: "163px",
              right: "95px",
            }}
            src={
              "https://project-house.net/wp-content/uploads/2019/07/Black-Boys-Verastic.jpg"
            }
          />
          <div
            style={{
              width: "407px",
              height: "385px",
              zIndex: "0",
              backgroundColor: "#FFE05D",
              position: "absolute",
              top: "129px",
              right: "60px",
            }}
          ></div>
        </Grid>
      </Grid>

      {/* Recommendations */}
      <Grid style={{ height: "600px"}}>
        <Grid
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
                font: "normal normal normal 35px/53px Poppins",
              }}
            >
              Recommendations
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

        <Grid
          style={{
            position: "relative",
            width: "100%",
            height: "510px",
            background:
              "transparent url(https://image.freepik.com/free-photo/portrait-young-happy-blogger-with-modern-laptop-outdoors_231208-2070.jpg) 0% 0% no-repeat padding-box cover",
            backgroundSize: "cover"
          }}
        >
          <p
            style={{
              maxHeight: "994px",
              height: "188px",
              position: "absolute",
              top: "156px",
              left: "186px",
              margin: "0 auto",
              color: "white",
              fontSize: "20px",
              font: "normal normal normal 20px/33px Segoe UI",
            }}
          >
            “Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam
            hendrerit nisi sed sollicitudin pellentesque. Nunc posuere purus
            rhoncus pulvinar aliquam. Ut aliquet tristique nisl vitae volutpat.
            Nulla aliquet porttitor venenatis. Donec a dui et dui fringilla
            consectetur id nec massa. Aliquam erat volutpat. Sed ut dui ut lacus
            dictum fermentum vel tincidunt neque. Sed sed lacinia lectus. Duis
            sit amet sodales felis. Duis nunc eros, mattis at dui ac, convallis
            semper risus. In adipiscing ultrices tellus, in suscipit massa
            vehicula eu.”
          </p>
          <Grid
            style={{ position: "absolute", bottom: "52px", right: "307px" }}
          >
            <p
              style={{
                fontSize: "18px",
                font: "normal normal bold 18px/27px Segoe UI",
                color: "#424446",
              }}
            >
              Marwan Pablo <br />
              <span style={{ font: "normal normal normal 18px/27px Segoe UI" }}>
                class of 2019
              </span>
            </p>
          </Grid>
        </Grid>
      </Grid>

      {/* Timeline */}
      <Grid>
        <Grid
          style={{
            padding: "40px 50px 0 50px",
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
                font: "normal normal normal 35px/53px Poppins",
              }}
            >
              Your Way To Be In Your Profile
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
        <ul class="timeline">
          <li>
            <div class="direction-l">
              <div class="flag-wrapper">
                <span class="flag">Your National ID</span>
                <span id="one" className="num-left">
                  1
                </span>
              </div>
              <div class="desc">
                click your National ID in navigation bar to insert your National
                ID
              </div>
            </div>
          </li>

          <li>
            <div class="direction-r">
              <div class="flag-wrapper">
                <span class="flag">Write Your National ID</span>
                <span id="two" className="num-right">
                  2
                </span>
              </div>
              <div class="desc">
                Click your code in navigation bar to insert your National ID
              </div>
            </div>
          </li>

          <li>
            <div id="" class="direction-l">
              <div class="flag-wrapper">
                <span class="flag">Register</span>
                <span id="three" className="num-left">
                  3
                </span>
              </div>
              <div class="desc">
                Click your code in navigation bar to insert your National ID
              </div>
            </div>
          </li>

          <li>
            <div class="direction-r">
              <div class="flag-wrapper">
                <span class="flag">Login</span>
                <span id="four" className="num-right">
                  4
                </span>
              </div>
              <div class="desc">
                Click your code in navigation bar to insert your National ID
              </div>
            </div>
          </li>

          <li>
            <div class="direction-l">
              <div class="flag-wrapper">
                <span class="flag">Your Profile</span>
                <span id="five" className="num-left">
                  5
                </span>
              </div>
              <div class="desc">
                My first employer. All the stuff I've learned and projects I've
                been working on.
              </div>
            </div>
          </li>
        </ul>
      </Grid>

      {/*Footer*/}
      <Grid className={classes.footer}>
        <Grid
          style={{
            position: "relative",
            bottom: '10px',
            display: "flex",
            alignItems: "center",
            width: "100%",
            height: "100%",
          }}
        >
          <p
            style={{
              position: "absolute",
              left: "146px",
              font: "normal normal 300 24px/35px Poppins",
              color: "white",
            }}
          >
            B.S University
          </p>

          <ul style={{ color: "red", position: "absolute", right: "274px" }}>
            <li>
              <a href="#home">About</a>
            </li>
            <li>
              <a href="#news">colleges</a>
            </li>
            <li>
              <a href="#contact">Contact us</a>
            </li>
            <li>
              <a href="#contact">Privacy</a>
            </li>
            <li>
              <a href="#contact">Terms</a>
            </li>
          </ul>

          <Grid style={{ position: "absolute", right: "98px" }}>
            <FaTwitter
            cursor="pointer"
              color="white"
              fontSize="1.1rem"
              style={{ marginRight: "24px" }}
            />
            <FaFacebookF cursor="pointer" color="white" fontSize="1.1rem" />
          </Grid>
        </Grid>

<p style={{position: 'absolute', bottom: '2px', right: '605px', color: '#DDDDDD', font: 'normal normal normal 12px/19px Poppins'}}>Copyright 2020 © B.S.University</p>

      </Grid>
    </Grid>
  );
};

export default Home;

/*
      {!_.isEmpty(user.email) && (
        <p>
          Welcome {user.isProf && "Dr. "} {user.firstname} {user.lastname}
        </p>
      )}
      Home Page
*/
