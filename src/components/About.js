import React, { useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import Axios from "axios";

import AboutCover from "../assets/images/About-Cover.jpeg";
import AboutImage1 from "../assets/images/About-Image-1.jpeg";
import AboutImage2 from "../assets/images/About-Image-2.jpeg";
import AboutLeadership1 from "../assets/images/About-Leadership-1.jpeg";
import AboutLeadership2 from "../assets/images/About-Leadership-2.jpeg";
import Footer from "./Footer";

const About = (props) => {
  const [state, setstate] = useState({
    year: 0,
    students: 0,
    faculties: 0,
  });

  useEffect(() => {
    for (let i = 0, j = 0, z = 0; i <= 164521; i = i + 250, j = j + 3, z++) {
      setTimeout(() => {
        if (z > 8) {
          setstate({ faculties: 8, year: j, students: i });
        } else if (j > 1965) {
          setstate({ faculties: 8, year: 1965, students: i });
        } else {
          setstate({ faculties: z, year: j, students: i });
        }
      });
    }
  }, []);

  console.log(state);

  return (
    <Grid>
      <Grid
        style={{
          height: "calc(100vh - 3.5rem)",
          width: "100%",
          position: "relative",
        }}
      >
        <div
          style={{
            height: "100%",
            width: "100%",
            backgroundColor: "#000000",
            opacity: "0.38",
            position: "absolute",
            top: 0,
          }}
        ></div>
        <Grid style={{height: '100%', width: '100%', overflow: 'hidden'}}>
          <img src={AboutCover} style={{ height: "950px", width: "100%", marginTop: '-100px' }} />
        </Grid>


        <Grid style={{ position: "absolute", left: "92px", top: "281px" }}>
          <p
            style={{
              font: "normal normal 600 40px/60px Poppins",
              color: "white",
            }}
          >
            About B.S University
          </p>
          <p
            style={{
              font: "normal normal 600 20px/30px Poppins",
              color: "white",
            }}
          >
            A place for learning, discovery, innovation, expression and
            discourse
          </p>
        </Grid>
      </Grid>

      <Grid
        container
        justify="space-between"
        alignItems="center"
        style={{ padding: "0 92px", marginBottom: "148px", backgroundColor: 'rgba(206, 206, 206, 0.3)', height: '140px' }}
      >
        <Grid style={{ textAlign: "center" }}>
          <p
            style={{
              color: "#000000",
              font: "normal normal 600 18px/27px Poppins",
              marginTop: '0'
            }}
          >
            Started in
          </p>
          <p
            style={{
              color: "#2C4563",
              font: "normal normal 600 20px/5px Poppins",
              marginTop: '0'
            }}
          >
            {state.year}
          </p>
        </Grid>
        <Grid style={{ textAlign: "center" }}>
          <p
            style={{
              color: "#000000",
              font: "normal normal 600 18px/27px Poppins",
              marginTop: '0'
            }}
          >
            Locate in
          </p>
          <p
            style={{
              color: "#2C4563",
              font: "normal normal 600 20px/5px Poppins",
              marginTop: '0'
            }}
          >
            Egypt, Alexandria, Gleem
          </p>
        </Grid>
        <Grid style={{ textAlign: "center" }}>
          <p
            style={{
              color: "#000000",
              font: "normal normal 600 18px/27px Poppins",
              marginTop: '0'
            }}
          >
            Students
          </p>
          <p
            style={{
              color: "#2C4563",
              font: "normal normal 600 20px/5px Poppins",
              marginTop: '0'
            }}
          >
            {state.students.toLocaleString()}
          </p>
        </Grid>
        <Grid style={{ textAlign: "center" }}>
          <p
            style={{
              color: "#000000",
              font: "normal normal 600 18px/27px Poppins",
              marginTop: '0'
            }}
          >
            Faculties
          </p>
          <p
            style={{
              color: "#2C4563",
              font: "normal normal 600 20px/5px Poppins",
            }}
          >
            {state.faculties}
          </p>
        </Grid>
      </Grid>

      <Grid
        container
        justify="space-between"
        style={{ padding: "0 92px", marginBottom: "75px" }}
      >
        <Grid>
          <Grid>
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
                History
              </p>
              <div
                style={{
                  position: "absolute",
                  left: "0",
                  bottom: "0",
                  width: "50px",
                  height: "4px",
                  backgroundColor: "#FFE05D",
                }}
              ></div>
            </Grid>
          </Grid>
          <p
            style={{
              width: "580px",
              color: "#424446",
              font: "normal normal normal 20px/33px Segoe UI",
            }}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </Grid>

        <Grid style={{ height: "433px" }}>
          <Grid
            style={{
              height: "100%",
              width: "228px",
              display: "inline-block",
              marginRight: "7px",
              float: "left",
            }}
          >
            <Grid
              style={{
                width: "100%",
                height: "294px",
                marginBottom: "8px",
                overflow: "hidden",
              }}
            >
              <img
                src={AboutImage2}
                style={{
                  height: '294px',
                  marginLeft: '-110px'
                }}
              />
            </Grid>

            <div
              style={{
                backgroundColor: "#FFE05D",
                height: "131px",
                width: "228px",
                borderRadius: "0px 0px 0px 100px",
                display: "block",
              }}
            ></div>
          </Grid>
          <Grid
            style={{
              height: "433px",
              width: "261px",
              display: "inline-block",
              backgroundColor: "yellow",
              overflow: "hidden",
              float: "right",
            }}
          >
            <img
              src={AboutImage1}
              style={{ marginLeft: "-230px", height: "433px", width: "700px" }}
            />
          </Grid>
        </Grid>
      </Grid>

      <Grid
        container
        justify="space-between"
        style={{ padding: "0 92px", marginBottom: "75px" }}
      >
        <Grid>
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
              Leadership
            </p>
            <div
              style={{
                position: "absolute",
                left: "0",
                bottom: "0",
                width: "50px",
                height: "4px",
                backgroundColor: "#FFE05D",
              }}
            ></div>
          </Grid>
        </Grid>
        <Grid container justify="space-between">
          <Grid
            style={{
              width: "382px",
              height: "502px",
              borderRadius: "10px",
            }}
          >
            <Grid
              style={{
                height: "326px",
                width: "382px",
                borderRadius: "10px 10px 0 0",
                overflow: "hidden",
              }}
            >
              <img
                src={AboutLeadership1}
                style={{ height: "326px", marginLeft: "-40px" }}
              />
            </Grid>

            <Grid container alignItems="center" style={{height: 'calc(100% - 326px)', paddingLeft: "14px", border: ".5px solid rgba(112, 112, 112, 0.6)", borderTop: 'none', borderRadius: '0 0 10px 10px'}}>
              <p
                style={{
                  color: "#2C4563",
                  font: "normal normal 600 18px/27px Poppins",
                  marginBottom: "0",
                }}
              >
                President Marc Tessier-Lavigne
              </p>
              <p
                style={{
                  color: "#424446",
                  font: "normal normal 300 16px/30px Poppins",
                }}
              >
                Marc Tessier-Lavigne became Stanford University’s eleventh
                president on September 1, 2016.
              </p>
            </Grid>
          </Grid>
          <Grid
            style={{
              width: "382px",
              height: "502px",
              borderRadius: "10px",
            }}
          >
            <Grid
              style={{
                height: "326px",
                width: "382px",
                borderRadius: "10px 10px 0 0",
                overflow: "hidden",
              }}
            >
              <img
                src={AboutLeadership2}
                style={{ height: "326px", marginLeft: "-40px" }}
              />
            </Grid>
            <Grid container alignItems="center" style={{ height: 'calc(100% - 326px)', paddingLeft: "14px", border: ".5px solid rgba(112, 112, 112, 0.6)", borderTop: 'none', borderRadius: '0 0 10px 10px' }}>
              <p
                style={{
                  color: "#2C4563",
                  font: "normal normal 600 18px/27px Poppins",
                  marginBottom: "0",
                }}
              >
                President Marc Tessier-Lavigne
              </p>
              <p
                style={{
                  color: "#424446",
                  font: "normal normal 300 16px/30px Poppins",
                }}
              >
                Marc Tessier-Lavigne became Stanford University’s eleventh
                president on September 1, 2016.
              </p>
            </Grid>
          </Grid>
          <Grid
            style={{
              width: "382px",
              height: "502px",
              borderRadius: "10px",
            }}
          >
            <Grid
              style={{
                height: "326px",
                width: "382px",
                borderRadius: "10px 10px 0 0",
                overflow: "hidden",
              }}
            >
              <img
                src={AboutLeadership1}
                style={{ height: "326px", marginLeft: "-40px" }}
              />
            </Grid>
            <Grid container alignItems="center" style={{ height: 'calc(100% - 326px)', paddingLeft: "14px", border: ".5px solid rgba(112, 112, 112, 0.6)", borderTop: 'none', borderRadius: '0 0 10px 10px' }}>
              <p
                style={{
                  color: "#2C4563",
                  font: "normal normal 600 18px/27px Poppins",
                  marginBottom: "0",
                }}
              >
                President Marc Tessier-Lavigne
              </p>
              <p
                style={{
                  color: "#424446",
                  font: "normal normal 300 16px/30px Poppins",
                }}
              >
                Marc Tessier-Lavigne became Stanford University’s eleventh
                president on September 1, 2016.
              </p>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid container style={{ padding: "0 92px", marginBottom: "80px" }}>
        <Grid>
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
                marginBottom: "10px",
              }}
            >
              More Information
            </p>
            <div
              style={{
                position: "absolute",
                left: "0",
                bottom: "0",
                width: "90px",
                height: "4px",
                backgroundColor: "#FFE05D",
              }}
            ></div>
          </Grid>
        </Grid>
        <Grid style={{ width: "100%" }}>
          <p
            style={{
              color: "#424446",
              font: "normal normal normal 20px/40px Poppins",
              maxWidth: "1100px",
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
        </Grid>
      </Grid>

      <Footer />
    </Grid>
  );
};

export default About;

/*
        <Grid>
          <Grid style={{width: '229px', display: 'inline-block'}}>
            <img src={AboutImage2} style={{ width: "100%", height: "294px", marginBottom: '8px' }} />
            <div
              style={{
                backgroundColor: "#FFE05D",
                height: "131px",
                width: "228px",
                borderRadius: "0px 0px 0px 100px",
              }}
            />
          </Grid>
            <Grid style={{height: '433px', display: 'inline-block'}}>
            <img src={AboutImage1} style={{ height: '100%', width: "261px" }} />
            </Grid>
        </Grid>

*/
