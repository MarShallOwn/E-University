import React, { useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import { Link } from 'react-router-dom';
import { useUser } from "../../contexts/UserProvider";
import Axios from "axios";
import _ from "lodash/fp";
import { SiMicrosoftpowerpoint, SiMicrosoftword } from "react-icons/si";
import { AiFillFilePdf } from "react-icons/ai";

const Faculty = () => {
  const user = useUser();

  const [faculty, setFaculty] = useState({
    level: { subjects: [] },
  });

  console.log(faculty)

  useEffect(() => {
    Axios.get("/api/getUserFaculty").then(
      (res) => res.data.pass && setFaculty(res.data.faculty)
    );
  }, []);

  return (
    <Grid
      style={{ padding: "0 103px", marginTop: "127px", marginBottom: "60px" }}
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
              font: "normal normal 600 35px/53px Poppins",
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
      <Grid
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          marginBottom: "130px",
        }}
      >
        {faculty.level.subjects &&
          faculty.level.subjects.map((subject, index) => (
            <Link
            style={{
              textDecoration: 'none',
              margin: '10px 0'
            }}
            to={{
              pathname: '/faculty/subject',
              state: {subjectId: subject._id}
            }}
            >
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
                  {subject.professor &&
                    `Dr ${subject.professor.firstname} ${subject.professor.lastname}`}
                </p>
              </div>
            </Grid>
            </Link>
          ))}
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
                font: "normal normal 600 35px/53px Poppins",
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

        {faculty.latestVideos && (
          <Grid style={{ display: "flex", justifyContent: "center" }}>
            {faculty.latestVideos.map((video, index) => (
              <Grid
                key={index}
                style={{
                  margin: "0 15px",
                  textAlign: "center",
                }}
              >
                <iframe
                  style={{ borderRadius: "10px", border: "none" }}
                  width="570"
                  height="390"
                  webkitallowfullscreen={true.toString()}
                  mozallowfullscreen={true.toString()}
                  allowFullScreen
                  src={`https://www.youtube.com/embed/${video.link}`}
                ></iframe>
                <div style={{ marginTop: "20px", maxWidth: "575px" }}>
                  <p
                    style={{
                      lineHeight: "0",
                      font: "normal normal normal 30px/46px Poppins",
                      fontSize: "30px",
                    }}
                  >
                    {video.subjectName}, Lec {video.lectureNumber} 
                  </p>
                  <p
                    style={{
                      lineHeight: "0",
                      color: "#1C60B3",
                      font: "normal normal normal 20px/0px Poppins",
                      fontSize: "20px",
                    }}
                  >
                    Dr: {`${video.professor.firstname} ${video.professor.lastname}`}
                  </p>
                </div>
              </Grid>
            ))}
          </Grid>
        )}
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
                font: "normal normal 600 35px/53px Poppins",
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

        {faculty.latestFiles && (
          <Grid style={{ display: "flex", justifyContent: "center" }}>
            {faculty.latestFiles.map((file, index) => (
              <Grid
                key={index}
                container
                alignItems="center"
                style={{
                  height: "146px",
                  width: "561px",
                  border: "1px solid rgba(112, 112, 112, 0.6)",
                  borderRadius: "10px",
                  paddingLeft: "57px",
                  margin: "0 30px",
                }}
              >
                <Grid style={{ display: "inline-block", marginRight: "42px" }}>
                  {icons[file.extension]}
                </Grid>
                <Grid style={{ display: "inline-block" }}>
                  <p
                    style={{
                      font: "normal normal normal 30px/46px Poppins",
                      margin: "0",
                    }}
                  >
                    {file.name}
                  </p>
                  <p
                    style={{
                      font: "normal normal normal 20px/30px Poppins",
                      color: "#1C60B3",
                      margin: "0",
                    }}
                  >
                    Dr:{" "}
                    {`${file.professor.firstname} ${file.professor.firstname}`}
                  </p>
                </Grid>
              </Grid>
            ))}
          </Grid>
        )}
      </Grid>
    </Grid>
  );
};

export default Faculty;

const icons = {
  pdf: <AiFillFilePdf fontSize="53px" color="#E24C3F" />,
  pptx: <SiMicrosoftpowerpoint fontSize="53px" color="#E24C3F" />,
  docx: <SiMicrosoftword fontSize="53px" color="#E24C3F" />,
  doc: <SiMicrosoftword fontSize="53px" color="#E24C3F" />
}