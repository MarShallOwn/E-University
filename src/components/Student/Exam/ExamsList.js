import React, { useState, useEffect } from "react";
import { Grid, Button } from "@material-ui/core";
import Axios from "axios";
import { IoDocumentTextOutline } from "react-icons/io5";
import moment from "moment";

const ExamsList = (props) => {
  const [exams, setExams] = useState([]);
  const [activeTab, setActiveTab] = useState(2);

  console.log(exams);

  const enterExam = (e) => {
    const examId = e.currentTarget.id;
    const subjectId = e.currentTarget.name;
    Axios.post("/api/student/get-exam", { subjectId, examId }).then((res) => {
      if (res.data.pass && res.data.examChance > 0) {
        props.history.push({
          pathname: "/student/exam",
          state: { exam: res.data.exam },
        });
      }
    });
  };

  useEffect(() => {
    Axios.post("/api/student/get-exams").then((res) => {
      if (res.data.pass === true) {
        setExams(res.data.exams);
      }
    });
  }, []);

  return (
    <Grid style={{ height: "calc(100vh - 3.5rem)" }}>
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
            Exams
          </p>
          <div
            style={{
              position: "absolute",
              left: "0",
              bottom: "0",
              width: "70px",
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
            margin: "10px 0",
            width: "80%",
            display: "flex",
            justifyContent: "center",
          }}
        ></Grid>

        <Grid
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            width: "80%",
            border: "1px solid #1C60B3",
            borderRadius: "5px",
            padding: "5rem",
          }}
        >
          <Grid style={{ display: "flex", justifyContent: "center" }}>
            <Grid style={{ display: "flex" }}>
              <Grid
                style={
                  activeTab === 1
                    ? {
                        display: "flex",
                        border: "1px solid #707070",
                        backgroundColor: "#1C60B3",
                        color: "white",
                        padding: "10px 20px",
                        cursor: 'pointer'
                      }
                    : {
                        display: "flex",
                        border: "1px solid #707070",
                        padding: "10px 20px",
                        cursor: 'pointer'
                      }
                }
              >
                <p
                  style={{
                    font: "normal normal normal 16px/0px Poppins",
                    marin: "0",
                  }}
                >
                  Old Exam
                </p>
              </Grid>
              <Grid
                style={
                  activeTab === 2
                    ? {
                        display: "flex",
                        border: "1px solid #707070",
                        backgroundColor: "#1C60B3",
                        color: "white",
                        padding: "10px 20px",
                        cursor: 'pointer'
                      }
                    : {
                        display: "flex",
                        border: "1px solid #707070",
                        padding: "10px 20px",
                        cursor: 'pointer'
                      }
                }
              >
                <p
                  style={{
                    font: "normal normal normal 16px/0px Poppins",
                    marin: "0",
                  }}
                >
                  Active Exam
                </p>
              </Grid>
              <Grid
                style={
                  activeTab === 3
                    ? {
                        display: "flex",
                        border: "1px solid #707070",
                        backgroundColor: "#1C60B3",
                        color: "white",
                        padding: "10px 20px",
                        cursor: 'pointer'
                      }
                    : {
                        display: "flex",
                        border: "1px solid #707070",
                        padding: "10px 20px",
                        cursor: 'pointer'
                      }
                }
              >
                <p
                  style={{
                    font: "normal normal normal 16px/0px Poppins",
                    marin: "0",
                  }}
                >
                  Future Exam
                </p>
              </Grid>
            </Grid>
          </Grid>
          <Grid
            style={{ display: "flex", width: "100%", flexDirection: "column", marginTop: '5rem' }}
          >
            {exams.map((subjectExam, subjectExamsIndex) => (
              <Grid key={subjectExamsIndex}>
                <Grid style={{ display: "flex" }}>
                  {subjectExam.exams.map((exam, index) => (
                    <Grid
                      key={index}
                      style={{
                        height: "20rem",
                        width: "20rem",
                        backgroundColor: "#F1F8FF",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: "column",
                        position: "relative",
                        margin: "1rem 2rem",
                        borderRadius: "8px",
                      }}
                    >
                      <IoDocumentTextOutline fontSize="75px" color="#1C60B3" />
                      <Grid style={{ textAlign: "center" }}>
                        <p
                          style={{
                            font: "normal 18px Poppins",
                            marginBottom: "0",
                          }}
                        >
                          {subjectExam.subject.subjectName}<br/>{exam.examName}
                        </p>
                        <p
                          style={{
                            font: "normal normal normal 16px/0px Poppins",
                            margin: "0 0 0 1.5rem 0",
                          }}
                        >
                          <span style={{ color: "#1C60B3" }}>From :</span>{" "}
                          {moment(exam.examDate).format(
                            "MMMM Do YYYY, h:mm:ss a"
                          )}
                        </p>
                        <p
                          style={{
                            font: "normal normal normal 16px/0px Poppins",
                            margin: "1.5rem 0",
                          }}
                        >
                          <span style={{ color: "#1C60B3" }}>To :</span>{" "}
                          {moment(exam.examEndTime).format(
                            "MMMM Do YYYY, h:mm:ss a"
                          )}
                        </p>
                      </Grid>
                      {Date.now() >= Date.parse(exam.examDate) &&
                        Date.now() <= Date.parse(exam.examEndTime) && (
                          <Button
                            id={exam._id}
                            name={subjectExam.subject.subjectId}
                            onClick={enterExam}
                            style={{
                              color: "#1C60B3",
                              font: "normal normal 600 18px/27px Poppins",
                              textTransform: "none",
                            }}
                          >
                            Enter Exam
                          </Button>
                        )}
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ExamsList;

/*

            <Grid>
                {
                exams.map((subjectExam, subjectExamsIndex) => (
                    <Grid key={subjectExamsIndex}>
                        subject Name: {subjectExam.subject.subjectName}
                        <Grid>
                            <p>Exams List</p>
                            {subjectExam.exams.map((exam, index) => (
                                <Grid key={index}>
                                    exam name: {exam.examName}
                                    {
                                        (Date.now() >= Date.parse(exam.examDate) && Date.now() <= Date.parse(exam.examEndTime)) &&
                                        <Button id={exam._id} name={subjectExam.subject.subjectId} variant="contained" onClick={enterExam}>Enter Exam</Button>
                                    }
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                ))
                }
            </Grid>


*/
