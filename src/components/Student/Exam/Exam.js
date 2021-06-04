import React, { useState, useEffect } from "react";
import { Grid, Button, Switch } from "@material-ui/core";
import { Link, withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import { LinearProgress } from "@material-ui/core";
import Question from "./Question";
import moment from "moment";
import { useUser } from "../../../contexts/UserProvider";
import { BiHappy } from "react-icons/bi";
import Axios from "axios";

// shuffle array
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};

const Exam = (props) => {
  const user = useUser();

  const [exam, setExam] = useState(props.location.state.exam);
  const [studentQuestionsAnswer, setStudentQuestionsAnswer] = useState([]);
  const [timeLeft, setTimeLeft] = useState({});
  const [questionsInPage, setQuestionsInPage] = useState(0);
  const [darkMode, setDarkMode] = useState(false);
  const [done, setDone] = useState(false);
  const [questionsNumber, setQuestionsNumber] = useState({
    currentPage: 1,
    totalQuestions: props.location.state.exam.questions.length,
  });

  let currentPercentage;

  if (questionsInPage < questionsNumber.totalQuestions) {
    currentPercentage =
      (Math.floor(
        (questionsInPage + 5) /
          (Math.ceil(questionsNumber.totalQuestions / 5) * 5)
      ) *
        100) /
      2;
  } else {
    currentPercentage =
      Math.floor(
        (questionsInPage + 5) /
          (Math.ceil(questionsNumber.totalQuestions / 5) * 5)
      ) * 100;
  }

  console.log(exam)


  // timer countdown
  const getTimeUntil = (duration, studentExamEnter) => {
    let tempDuration = duration.split(":");

    // increase the start of the exam by the duration of hours ,mins and seconds
    // so we get the start of the exam for the student + duration
    const timeWithHour = moment(studentExamEnter)
      .add(parseInt(tempDuration[0]), "hours")
      .toDate();
    const timeWithMin = moment(timeWithHour)
      .add(parseInt(tempDuration[1]), "m")
      .toDate();
    const timeWithSecond = moment(timeWithMin)
      .add(parseInt(tempDuration[2]), "s")
      .toDate();

    // then we subtract the student + duration time with the current time
    // so we can get the time left for the exam to end
    const datemill = timeWithSecond - Date.now();

    // then we get he time for hours , mins and seconds left that will be used for counter
    const hours = Math.floor((datemill / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((datemill / (1000 * 60)) % 60);
    const seconds = Math.floor((datemill / 1000) % 60);

    setTimeLeft({ hours, minutes, seconds });
  };
  const submitExam = () => {
    // increase the number of pages by 5 to get the next 5 questions from the array
    setQuestionsInPage(questionsInPage + 5);

    // increase the current page that the student is in ex (1/6 pages)
    setQuestionsNumber({
      ...questionsNumber,
      currentPage: questionsNumber.currentPage + 1,
    });

    if(questionsNumber.currentPage + 1 >
      Math.ceil(questionsNumber.totalQuestions / 5)){
        Axios.post("/api/student/send-exam",{exam}, (res) => {
          if (res.data.pass) {
            setDone(true)
          }
        })
      }
  };

  useEffect(() => {
    if (darkMode) document.body.style.backgroundColor = "#121212";
    if (!darkMode) document.body.style.backgroundColor = "white";

    return () => {
      document.body.style.backgroundColor = "white";
    };
  }, [darkMode]);

  useEffect(() => {
    const questions = [...props.location.state.exam.questions];

    questions.forEach((question) => {
      shuffleArray(question.answers);
    });

    setExam({ ...props.location.state.exam, questions });

    setQuestionsNumber({
      currentPage: 1,
      totalQuestions: props.location.state.exam.questions.length,
    });

    const counterInterval = setInterval(
      () =>
        getTimeUntil(
          props.location.state.exam.duration,
          props.location.state.exam.studentExamEnter
        ),
      1000
    );

    return () => clearInterval(counterInterval);
  }, [props]);

  // user answer to question
  const editAnswer = (e, questionId) => {
    const questions = [...exam.questions];

    questions.forEach((question) => {
      if (question._id === questionId) {
        if (question.questionType === "multipleAnswers") {

          // if the target is false then remove it and store only true
            question.userAnswer = {
              ...question.userAnswer,
              [e.currentTarget.name]: e.target.checked,
            };

            for (const answer in question.userAnswer) {
              if(question.userAnswer[answer] === false) delete question.userAnswer[answer];
            }

        } else {
          question.userAnswer = e.currentTarget.value;
        }
      }
    });

    setExam({ ...exam, questions });
  };

  const displayedQuestion = [];

  for (let i = questionsInPage; i < questionsInPage + 5; i++) {
    if (i >= questionsNumber.totalQuestions) {
      break;
    }

    displayedQuestion.push(
      <Question
        key={i}
        darkMode={darkMode}
        question={exam.questions[i]}
        exam={exam}
        setExam={setExam}
        editAnswer={editAnswer}
        studentQuestionsAnswer={studentQuestionsAnswer}
        setStudentQuestionsAnswer={setStudentQuestionsAnswer}
      />
    );
  }

  return (
    <Grid style={{ height: "calc(100vh - 3.5rem)" }}>
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
        ></Grid>

        <Grid
          style={
            darkMode
              ? {
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "column",
                  width: "80%",
                  borderRadius: "5px",
                  padding: "5rem",
                  paddingTop: "1rem",
                  backgroundColor: "#191d22",
                  position: "relative",
                }
              : {
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "column",
                  width: "80%",
                  borderRadius: "5px",
                  padding: "5rem",
                  paddingTop: "1rem",
                  backgroundColor: "#F3F9FF",
                  position: "relative",
                }
          }
        >
          <Grid
            style={{
              position: "absolute",
              right: "5rem",
              top: "4rem",
              display: "flex",
              aligntItems: "center",
            }}
          >
            <p
              style={
                darkMode
                  ? {
                      font: "normal normal bold 18px/27px Poppins",
                      color: "#ddddde",
                      marginTop: ".3rem",
                    }
                  : {
                      font: "normal normal bold 18px/27px Poppins",
                      marginTop: ".3rem",
                    }
              }
            >
              {darkMode ? "Dark Mode" : "Light Mode"}
            </p>{" "}
            <Grid>
              <Switch
                checked={darkMode}
                onChange={(e) => setDarkMode(e.target.checked)}
                color="primary"
                inputProps={{ "aria-label": "primary checkbox" }}
              />
            </Grid>
          </Grid>
          {/** Page Title */}
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
                style={
                  darkMode
                    ? {
                        color: "#ddddde",
                        textAlign: "center",
                        fontSize: "35px",
                        font: "normal normal 600 35px/53px Poppins",
                      }
                    : {
                        color: "#2C4563",
                        textAlign: "center",
                        fontSize: "35px",
                        font: "normal normal 600 35px/53px Poppins",
                      }
                }
              >
                Exams
              </p>
              <div
                style={
                  darkMode
                    ? {
                        position: "absolute",
                        left: "0",
                        bottom: "0",
                        width: "70px",
                        height: "4px",
                        backgroundColor: "#a89647",
                      }
                    : {
                        position: "absolute",
                        left: "0",
                        bottom: "0",
                        width: "70px",
                        height: "4px",
                        backgroundColor: "#FFE05D",
                      }
                }
              ></div>
            </Grid>
          </Grid>
          {/** Student Name and time */}
          <Grid
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "1.5rem",
              marginTop: "1.5rem",
            }}
          >
            <Grid
              style={
                darkMode
                  ? {
                      width: "80%",
                      borderRadius: "7px",
                      height: "3.5rem",
                      backgroundColor: "#25292d",
                      display: "flex",
                      alignItems: "center",
                      paddingLeft: "2rem",
                    }
                  : {
                      width: "80%",
                      border: "1px solid #1C60B3",
                      borderRadius: "7px",
                      height: "3.5rem",
                      backgroundColor: "#FFFFFF",
                      display: "flex",
                      alignItems: "center",
                      paddingLeft: "2rem",
                    }
              }
            >
              <p
                style={
                  darkMode
                    ? {
                        font: "normal normal normal 20px/34px Poppins",
                        color: "#bebec0",
                      }
                    : { font: "normal normal normal 20px/34px Poppins" }
                }
              >
                <span style={darkMode ? {} : { color: "#002D64" }}>
                  Student Name:
                </span>{" "}
                {`${user.firstname} ${user.lastname}`}
              </p>
            </Grid>
            {
              !done &&
            <Grid
              style={
                darkMode
                  ? {
                      width: "15%",
                      borderRadius: "7px",
                      height: "3.5rem",
                      backgroundColor: "#25292d",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }
                  : {
                      width: "15%",
                      border: "1px solid #1C60B3",
                      borderRadius: "7px",
                      height: "3.5rem",
                      backgroundColor: "#FFFFFF",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }
              }
            >
              <p
                style={
                  darkMode
                    ? {
                        font: "normal normal normal 20px/34px Poppins",
                        color: "#bebec0",
                      }
                    : { font: "normal normal normal 20px/34px Poppins" }
                }
              >
                {timeLeft.hours < 10 ? `0${timeLeft.hours}` : timeLeft.hours}:
              </p>
              <p
                style={
                  darkMode
                    ? {
                        font: "normal normal normal 20px/34px Poppins",
                        color: "#bebec0",
                      }
                    : { font: "normal normal normal 20px/34px Poppins" }
                }
              >
                {timeLeft.minutes < 10
                  ? `0${timeLeft.minutes}`
                  : timeLeft.minutes}
                :
              </p>
              <p
                style={
                  darkMode
                    ? {
                        font: "normal normal normal 20px/34px Poppins",
                        color: "#bebec0",
                      }
                    : { font: "normal normal normal 20px/34px Poppins" }
                }
              >
                {timeLeft.seconds < 10
                  ? `0${timeLeft.seconds}`
                  : timeLeft.seconds}
              </p>
            </Grid>
}
          </Grid>

          <Grid style={{ display: "flex", width: "100%", flexWrap: "wrap" }}>
            {/** Progress Bar */}
            <Grid
              style={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
              }}
            >
              {questionsNumber.currentPage <=
                Math.ceil(questionsNumber.totalQuestions / 5) && (
                <p
                  style={
                    darkMode
                      ? {
                          font: "normal normal 600 17px/30px Poppins",
                          color: "#ddddde",
                        }
                      : { font: "normal normal 600 17px/30px Poppins" }
                  }
                >
                  Page {questionsNumber.currentPage} of{" "}
                  {Math.ceil(questionsNumber.totalQuestions / 5)}
                </p>
              )}
            </Grid>
            <Grid style={{ width: "100%", marginBottom: "5rem" }}>
              <BorderLinearProgress
                variant="determinate"
                style={darkMode? {backgroundColor: '#97999b'} : {backgroundColor: '#efefef'}}
                value={currentPercentage}
              />
            </Grid>

            {!done && (
              <>
                <Grid style={{ width: "100%" }}>{displayedQuestion}</Grid>
                <Grid
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    marginTop: "1.5rem",
                    flexDirection: "column",
                  }}
                >
                  <p
                    style={
                      darkMode
                        ? {
                            color: "#bebec0",
                            font: "normal normal normal 20px/34px Poppins",
                          }
                        : { font: "normal normal normal 20px/34px Poppins" }
                    }
                  >
                    Are you sure you want to submit ? you can't return to this
                    page after submitting
                  </p>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={submitExam}
                    style={{
                      backgroundColor: "#1C60B3",
                      textTransform: "none",
                      color: "white",
                      font: "normal normal 600 14px/25px Poppins",
                      height: "3rem",
                      width: "10rem",
                    }}
                  >
                    Submit
                  </Button>
                </Grid>
              </>
            )}

            {done && (
              <Grid style={{width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <Grid style={{display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', width: '100%'}}>
                <BiHappy style={darkMode && {color: '#bebec0'}} fontSize="8rem" />
                <p style={darkMode ? {font: 'normal normal 600 25px/0px Poppins', color: '#bebec0'}:{font: 'normal normal 600 25px/0px Poppins'}}>Congrats on completing the exam</p>
                <p style={darkMode ? {font: 'normal normal normal 18px/25px Poppins', color: '#bebec0'}:{font: 'normal normal normal 18px/25px Poppins'}}>
                  Please head to the result page of the exam to check your
                  result.
                </p>
                <Link
                to="/student/exams-list"
                style={{
                  textDecoration: "none",
                  color: "black",
                  width: "100%",
                }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  style={{
                    marginTop: '1rem',
                    backgroundColor: "#1C60B3",
                    textTransform: "none",
                    color: "white",
                    font: "normal normal 600 12px/25px Poppins",
                    height: "3rem",
                    width: "10rem",
                  }}
                >Return to exams list</Button>
              </Link>
              </Grid>
              </Grid>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

const BorderLinearProgress = withStyles((theme) => ({
  root: {
    height: 17,
    borderRadius: 5,
  },
  bar: {
    borderRadius: 5,
    backgroundColor: "#1a90ff",
  },
}))(LinearProgress);

export default withRouter(Exam);
