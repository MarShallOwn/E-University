import React, { useEffect, useState } from "react";
import { Divider, Grid, Button, Popover } from "@material-ui/core";
import { SiMicrosoftpowerpoint, SiMicrosoftword } from "react-icons/si";
import { AiFillFilePdf } from "react-icons/ai";
import {
  MdKeyboardArrowUp,
  MdKeyboardArrowDown,
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
} from "react-icons/md";
import Axios from "axios";

import NoVideoAvailable from '../../assets/images/no-video-available.jpg'

const Subject = (props) => {
  const subjectId = props.location.state.subjectId;

  const [subject, setSubject] = useState(null);

  const [activeVideos, setActiveVideos] = useState(null);

  console.log(subject);
  console.log(activeVideos);

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  useEffect(() => {
    Axios.get(`/api/getStudentSubject/${subjectId}`).then((res) => {
      res.data.subject.lectures.sort(
        (a, b) => a.lectureNumber - b.lectureNumber
      );
      if (res.data.pass) {
        const videos = [];
        for (let lecture of res.data.subject.lectures) {
          let empty = true;
          let activeElement = { prev: false, value: null, next: false };
          if (lecture.materials.length !== 0) {
            for (let i = 0; i < lecture.materials.length; i++) {
              if (
                lecture.materials[i].type === "video" &&
                activeElement.value === null
              ) {
                activeElement.value = i;
                continue;
              }

              if (activeElement.value !== null && !activeElement.next) {
                activeElement.next = true;
                break;
              }
            }
          }
          videos.push(activeElement);
        }

        setActiveVideos(videos);

        setSubject(res.data.subject);
      }
    });
  }, []);

  // Switch to either the next or previous
  const handleVideoChange = (e, move, lectureIndex) => {
    let index = parseInt(e.currentTarget.id);
    console.log(index)
    const tempActiveVideos = [...activeVideos];
    let changed = false;
    if (move === "next") {
      tempActiveVideos[lectureIndex].next = false;
      for (
        let i = index + 1;
        i < subject.lectures[lectureIndex].materials.length;
        i++
      ) {
        if (
          subject.lectures[lectureIndex].materials[i].type === "video" &&
          !changed
        ) {
          tempActiveVideos[lectureIndex].value = i;
          
            tempActiveVideos[lectureIndex].prev = true;
          changed = true;
          continue;
        } else if (
          subject.lectures[lectureIndex].materials[i].type === "video" &&
          changed
        ) {
          tempActiveVideos[lectureIndex].next = true;
          break;
        }
      }
    } else if (move === "prev") {
      tempActiveVideos[lectureIndex].prev = false;
      for (let i = index - 1; i >= 0; i--) {
        if (
          subject.lectures[lectureIndex].materials[i].type === "video" &&
          !changed
        ) {
          tempActiveVideos[lectureIndex].value = i;
          
            tempActiveVideos[lectureIndex].next = true;
          changed = true;
          continue;
        } else if (
          subject.lectures[lectureIndex].materials[i].type === "video" &&
          changed
        ) {
          tempActiveVideos[lectureIndex].prev = true;
          break;
        }
      }
    }
    setActiveVideos(tempActiveVideos);
  };

  return (
    <Grid>
      <Grid
        style={{
          padding: "0 50px",
          marginBottom: "60px",
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
              font: "normal normal normal 35px/90px Poppins",
            }}
          >
            Business Management
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
          <p
            style={{
              position: "absolute",
              left: "110px",
              bottom: "-10px",
              margin: "0",
              color: "#1C60B3",
              font: "normal normal normal 20px/30px Poppins",
            }}
          >
            Dr:
            {subject &&
              ` ${subject.professor.firstname} ${subject.professor.lastname}`}
          </p>
        </Grid>
      </Grid>

      <Grid container justify="center" style={{ marginBottom: "33px" }}>
        <Grid
          container
          justify="center"
          alignItems="center"
          style={{
            backgroundColor: "#1C60B3",
            color: "white",
            height: "54px",
            width: "176px",
            font: "normal normal normal 20px/30px Poppins",
          }}
        >
          Lectures
        </Grid>
        <Grid
          container
          justify="center"
          alignItems="center"
          style={{
            height: "54px",
            color: "#424446",
            width: "176px",
            font: "normal normal normal 20px/30px Poppins",
            border: "2px solid rgba(112, 112, 112, 0.6)",
            borderLeft: "none",
          }}
        >
          Sections
        </Grid>
      </Grid>

      <Grid
        style={{
          width: "1247px",
          border: "1.3px solid rgba(150, 150, 150, 0.75)",
          borderRadius: "10px",
          margin: "0 auto",
        }}
      >
        {subject &&
          subject.lectures.map((lecture, index) => (
            <Grid key={index}>
              <Grid container alignItems="center" style={{ height: "191.5px" }}>
                <Grid
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginLeft: "20px",
                  }}
                >
                  {lecture.materials.length !== 0 &&
                  activeVideos[index].value !== null ? (
                    <>
                      {activeVideos[index].prev ? (
                        <MdKeyboardArrowLeft
                          style={{ cursor: "pointer" }}
                          fontSize="30px"
                          id={activeVideos[index].value}
                          onClick={(e) => handleVideoChange(e, "prev", index)}
                        />
                      ) : (
                        <Grid style={{ height: "30px", width: "30px" }}></Grid>
                      )}

                      <iframe
                        height="133px"
                        width="265px"
                        src={`https://www.youtube.com/embed/${
                          lecture.materials[activeVideos[index].value].link
                        }`}
                      />

                      {activeVideos[index].next ? (
                        <MdKeyboardArrowRight
                          style={{ cursor: "pointer", verticalAlign: "center" }}
                          fontSize="30px"
                          id={activeVideos[index].value}
                          onClick={(e) => handleVideoChange(e, "next", index)}
                        />
                      ) : (
                        <Grid style={{ height: "30px", width: "30px" }}></Grid>
                      )}
                    </>
                  ) : (
                    <Grid style={{ height: '133px', width: "265px", overflow: 'hidden', margin: '0 30px' }}>
                      <img style={{height: '253px', marginLeft: '-90px', marginTop: '-75px'}} src={NoVideoAvailable} />
                    </Grid>
                  )}
                </Grid>
                <Grid style={{ display: "inline-block", marginLeft: "35px" }}>
                  <p
                    style={{
                      color: "#3D5E84",
                      font: "normal normal 600 20px/30px Poppins",
                    }}
                  >
                    Lecture {lecture.lectureNumber}
                  </p>

                  <Grid
                    id={index}
                    style={{ width: "120px" }}
                    onClick={(e) => setAnchorEl(e.currentTarget)}
                  >
                    <Grid container alignItems="center">
                      <p
                        style={{
                          display: "inline-block",
                          margin: 0,
                          font: "normal normal normal 18px/27px Poppins",
                        }}
                      >
                        Resources
                      </p>
                      <MdKeyboardArrowDown
                        style={{
                          fontSize: "23px",
                        }}
                      />
                    </Grid>
                  </Grid>

                  <p
                    style={{
                      color: "#1C60B3",
                      font: "normal normal normal 18px/27px Poppins",
                    }}
                  >
                    {new Date(lecture.createdAt).toLocaleDateString("en-US")}
                  </p>
                </Grid>
              </Grid>
              <Divider />
            </Grid>
          ))}
      </Grid>

      <Popover
        open={open}
        anchorEl={anchorEl}
        style={{ marginTop: "5px" }}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Grid style={{ width: "250px" }}>
          {subject &&
            anchorEl &&
            subject.lectures[parseInt(anchorEl.id)].materials.map(
              (material, index) => {
                if (material.type === "file") {
                  return (
                    <Grid
                      style={{
                        width: "100%",
                        display: "block",
                        height: "100%",
                      }}
                      key={index}
                    >
                      <Grid container alignItems="center">
                        {icons[material.extension]}
                        <p style={{ display: "inline-block" }}>
                          {material.name}
                        </p>
                        <a
                          style={{
                            textDecoration: "none",
                            display: "inline-block",
                          }}
                          href={`https://res.cloudinary.com/dxkufsejm/${
                            material.extension === "pdf" ? "image" : "raw"
                          }/upload/fl_attachment/v1601325837/${material.file}`}
                        >
                          <Button
                            style={{
                              backgroundColor: "#E24C3F",
                              color: "white",
                            }}
                          >
                            DOWNLOAD
                          </Button>
                        </a>
                      </Grid>
                      <Divider />
                    </Grid>
                  );
                } else {
                  return;
                }
              }
            )}
        </Grid>
      </Popover>
    </Grid>
  );
};

export default Subject;

const icons = {
  pdf: <AiFillFilePdf style={{ display: "inline-block" }} />,
  pptx: (
    <SiMicrosoftpowerpoint
      style={{ display: "inline-block", fontSize: "20px" }}
    />
  ),
  docx: <SiMicrosoftword style={{ display: "inline-block" }} />,
  doc: <SiMicrosoftword style={{ display: "inline-block" }} />,
};

/*


          {
            (subject && anchorEl) &&
            subject.lectures[parseInt(anchorEl.id)].materials.map((material, index) => (
              <Grid style={{width: '100%', display: 'block', height: '100%'}} key={index}>
              <Grid>
                <p style={{float: 'left', display: 'inline-block', }}>{material.name}</p>
                <a style={{textDecoration: 'none', float: 'right', display: 'inline-block'}}><Button style={{backgroundColor: '#E24C3F', color: 'white'}}>DOWNLOAD</Button></a>
              </Grid>
              <Divider />
              </Grid>
            ))
          }
*/

/*

  useEffect(() => {
    Axios.get(`/api/getStudentSubject/${subjectId}`).then((res) => {
      res.data.subject.lectures.sort(
        (a, b) => a.lectureNumber - b.lectureNumber
      );
      if (res.data.pass) {
        const videos = [];
        for (let lecture of res.data.subject.lectures) {
          let empty = true;
          if (lecture.materials.length !== 0) {
            for (let i = 0; i < lecture.materials.length; i++) {
              if (lecture.materials[i].type === "video") {
                videos.push(i);
                empty = false;
                break;
              }
            }
          }
          if (empty) videos.push(null);
        }

        setActiveVideos(videos);

        setSubject(res.data.subject);
      }
    });
  }, []);








    const handleVideoChange = (e, move, lectureIndex) => {
    let index = parseInt(e.target.id);
    const tempActiveVideos = [...activeVideos];
    if (move === "next") {
      for (
        let i = index;
        i < subject.lectures[lectureIndex].materials.length;
        i++
      ) {
        if (subject.lectures[lectureIndex].materials[i].type === "video") {
          tempActiveVideos[lectureIndex] = i;
          setActiveVideos(tempActiveVideos);
        }
      }
    } else if (move === "prev") {
      for (let i = index; i >= 0; i--) {
        if (subject.lectures[lectureIndex].materials[i].type === "video") {
          tempActiveVideos[lectureIndex] = i;
          setActiveVideos(tempActiveVideos);
        }
      }
    }
  };
*/

/*

  useEffect(() => {
    Axios.get(`/api/getStudentSubject/${subjectId}`).then((res) => {
      res.data.subject.lectures.sort(
        (a, b) => a.lectureNumber - b.lectureNumber
      );
      if (res.data.pass) {
        const videos = [];
        for (let lecture of res.data.subject.lectures) {
          let empty = true;
          let activeElement = {prev: false, value: null, next: false}
          if (lecture.materials.length !== 0) {
            for (let i = 0; i < lecture.materials.length; i++) {
              if (lecture.materials[i].type === "video" && !activeElement.value) {
                activeElement.value = i;
                continue;
              }

              if(activeElement.value && !activeElement.next){
                activeElement.next = true;
                break;
              }
            }
          }
          videos.push(activeElement);
        }

        setActiveVideos(videos);

        setSubject(res.data.subject);
      }
    });
  }, []);

*/
