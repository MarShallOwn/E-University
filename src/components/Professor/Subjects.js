import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Grid,
  Button,
  TextField,
  InputAdornment,
  Divider,
  Popover,
} from "@material-ui/core";
import {
  MdSearch,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
} from "react-icons/md";
import Axios from "axios";

const Subjects = (props) => {
  const [levels, setLevels] = useState([]);

  useEffect(() => {
    Axios.get("/api/professorSubjects").then((res) =>
      setLevels(res.data.subjects)
    );
  }, []);

  const [anchorEl, setAnchorEl] = useState(null);
  const [currentMenuSubjectId, setCurrentMenuSubjectId] = useState(null);

  // close menu
  const handleClose = () => {
    setAnchorEl(null);
    setCurrentMenuSubjectId(null);
  };

  // open menu
  const handleMenuOpen = (e) => {
    setAnchorEl(e.currentTarget);
    setCurrentMenuSubjectId(e.currentTarget.id);
  };

  // open Subject
  const handleSubject = (e) => {
    let subject;
    let levelNumber;

    for (let level of levels) {
      subject = level.subjects.find(
        (subject) => subject._id === e.currentTarget.id
      );

      if (subject) {
        levelNumber = level.level;
      }
      break;
    }

    props.history.push({
      pathname: "/professor/subject",
      state: { subjectId: subject._id, level: levelNumber },
    });
  };

  // control open and close of menu
  const open = Boolean(anchorEl);

  // open question bank for specific subject
  const handleQuestionBank = (e) => {
    let subject;
    let levelNumber;

    for (let level of levels) {
      subject = level.subjects.find(
        (subject) => subject._id === e.currentTarget.id
      );

      if (subject) {
        levelNumber = level.level;
      }
      break;
    }

    props.history.push({
      pathname: "/professor/subject/question-bank",
      state: { subjectId: subject._id, level: levelNumber },
    });
  };

  // open exams
  const handleExams = (e) => {
    let subject;
    let levelNumber;

    for (let level of levels) {
      subject = level.subjects.find(
        (subject) => subject._id === e.currentTarget.id
      );

      if (subject) {
        levelNumber = level.level;
      }
      break;
    }

    props.history.push({
      pathname: "/professor/subject/exams-list",
      state: { subjectId: subject._id, level: levelNumber },
    });
  };

  return (
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
            Subjects
          </p>
          <div
            style={{
              position: "absolute",
              left: "0",
              bottom: "0",
              width: "135px",
              height: "4px",
              backgroundColor: "#FFE05D",
            }}
          ></div>
        </Grid>
      </Grid>

      <Grid
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Grid
          style={{
            margin: "30px 0",
            width: "80%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <TextField
            variant="outlined"
            size="small"
            placeholder="search level and subject"
            style={{ width: "40%" }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <MdSearch color="#7A7A7A" />
                </InputAdornment>
              ),
            }}
          />
        </Grid>

        <Grid
          style={{
            border: "1px solid #1C60B3",
            borderRadius: "7px",
            width: "80%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          {levels.map((level, index) => (
            <>
              <Grid key={index} style={{ width: "90%" }}>
                <Grid
                  style={{
                    position: "relative",
                  }}
                >
                  <p
                    style={{
                      color: "#1C60B3",
                      fontSize: "20px",
                      font: "normal normal 600 35px/53px Poppins",
                    }}
                  >
                    Level {level.level}
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
                <Grid
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "space-between",
                  }}
                >
                  {level.subjects.map((subject, index) => (
                    <div key={index}>
                      <Grid
                        onClick={handleMenuOpen}
                        container
                        alignItems="center"
                        id={subject._id}
                        style={{
                          margin: "20px 0",
                          width: "500px",
                          height: "100px",
                          marginLeft: "20px",
                          backgroundColor: "#F1F8FF",
                          borderRadius: "7px",
                          cursor: 'pointer'
                        }}
                      >
                        <Grid
                          style={{
                            height: "100%",
                            width: "80%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <p
                            style={{
                              font: "normal normal 600 20px/53px Poppins",
                            }}
                          >
                            {subject.name}
                          </p>
                        </Grid>
                        <Grid
                          style={{
                            height: "100%",
                            width: "20%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          {currentMenuSubjectId ? (
                            <MdKeyboardArrowUp fontSize="35px" />
                          ) : (
                            <MdKeyboardArrowDown fontSize="35px" />
                          )}
                        </Grid>
                      </Grid>
                    </div>
                  ))}
                </Grid>
              </Grid>
              <Divider />
            </>
          ))}
        </Grid>
      </Grid>

      <Popover
        open={open}
        anchorEl={anchorEl}
        style={{ marginTop: "5px" }}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Grid style={{ padding: ".5rem", width: "500px" }}>
          <Grid>
            <Grid container justify="flex-start">
              <Button
                onClick={handleSubject}
                id={currentMenuSubjectId}
                fullWidth
                style={{
                  justifyContent: "flex-start",
                  textTransform: "none",
                }}
              >
                Subject
              </Button>
              <Divider />
              <Button
                onClick={handleQuestionBank}
                id={currentMenuSubjectId}
                fullWidth
                style={{
                  justifyContent: "flex-start",
                  textTransform: "none",
                }}
              >
                Question Bank
              </Button>
              <Divider />
              <Button
                onClick={handleExams}
                id={currentMenuSubjectId}
                fullWidth
                style={{
                  justifyContent: "flex-start",
                  textTransform: "none",
                }}
              >
                Exams
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Popover>
    </Grid>
  );
};

export default Subjects;
