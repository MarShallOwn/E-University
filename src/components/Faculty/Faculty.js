import React, { useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import { useUser } from "../../contexts/UserProvider";
import Axios from "axios";
import _ from 'lodash/fp'

const Faculty = () => {
  const user = useUser();

  const [faculty, setFaculty] = useState({level: {subjects: []}});

  console.log(faculty);
  console.log(faculty.level.subjects)

  useEffect(() => {
    Axios.get("/api/getUserFaculty").then(
      (res) => res.data.pass && setFaculty(res.data.faculty)
    );
  }, []);

  return (
    <Grid style={{ padding: "0 103px", marginTop: '127px', marginBottom: '60px' }}>
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
            {`${faculty.name} , ${user.department} , Level ${user.level}`}
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

      {/* Subjects */}
      <Grid style={{ display: "flex", justifyContent: "center", marginBottom: '130px' }}>
      {
          faculty.level.subjects && 
          faculty.level.subjects.map((subject, index) => (
            <Grid
            key={index}
            style={{
              width: "561px",
              height: "146px",
              margin: "0 30px",
              border: "1px solid #9696A0",
              borderRadius: "10px",
              textAlign: "center",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div>
              <p
                style={{
                  lineHeight: "0",
                  font: "normal normal normal 25px/0px Poppins",
                  fontSize: "25px",
                }}
              >
                {subject.name}
              </p>
              <p
                style={{
                  lineHeight: "0",
                  color: "#1C60B3",
                  font: "normal normal normal 20px Poppins",
                  fontSize: "20px",
                }}
              >
                {subject.professor && `Dr ${subject.professor.firstname} ${subject.professor.lastname}`}
              </p>
            </div>
          </Grid>
          ))
        }
      </Grid>

      {/* Latest Online Videos */}
      <Grid style={{ marginBottom: "99px" }}>
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
              Latest Online videos
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

        <Grid style={{ display: "flex", justifyContent: "center" }}>
          <Grid
            style={{
              margin: "0 15px",
              textAlign: "center",
            }}
          >
            <iframe
              style={{ borderRadius: "10px", border: "none" }}
              width="570"
              height="390"
              webkitallowfullscreen
              mozallowfullscreen
              allowFullScreen
              src="https://www.youtube.com/embed/tgbNymZ7vqY"
            ></iframe>
            <div style={{ marginTop: "20px", maxWidth: '575px' }}>
              <p
                style={{
                  lineHeight: "0",
                  font: "normal normal normal 30px/46px Poppins",
                  fontSize: "30px",
                }}
              >
                Software Engineering and Design Pattern, Lec 1
              </p>
              <p
                style={{
                  lineHeight: "0",
                  color: "#1C60B3",
                  font: "normal normal normal 20px/0px Poppins",
                  fontSize: "20px",
                }}
              >
                Dr.Amr Abo Hany
              </p>
            </div>
          </Grid>

          <Grid
            style={{
              margin: "0 15px",
              textAlign: "center",
            }}
          >
            <iframe
              style={{ borderRadius: "10px", border: "none" }}
              width="570"
              height="390"
              webkitallowfullscreen
              mozallowfullscreen
              allowFullScreen
              src="https://www.youtube.com/embed/tgbNymZ7vqY"
            ></iframe>
            <div style={{ marginTop: "20px", maxWidth: '575px' }}>
              <p
                style={{
                  lineHeight: "0",
                  font: "normal normal normal 30px/46px Poppins",
                  fontSize: "30px",
                }}
              >
                Software Engineering , Lec 2
              </p>
              <p
                style={{
                  lineHeight: "0",
                  color: "#1C60B3",
                  font: "normal normal normal 20px/0px Poppins",
                  fontSize: "20px",
                }}
              >
                Dr.Reda M Hussien
              </p>
            </div>
          </Grid>
        </Grid>
      </Grid>


      {/* Resources */}
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
              Latest Resources
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




      </Grid>
    </Grid>
  );
};

export default Faculty;
