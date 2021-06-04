import React, { useState, useEffect } from "react";
import Axios from "axios";
import {
  Grid,
  Button,
  Stepper,
  Step,
  StepLabel
} from "@material-ui/core";
import moment from "moment";
import ExamInformation from "./ExamInformation";
import ExamCondition from "./ExamCondition";
import ExamPreview from "./ExamPreview";
import ExamStructureDone from "./ExamStructureDone";


function getSteps() {
  return ['Exam information', 'Exam Condition', 'Exam Preview'];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return 'Select campaign settings...';
    case 1:
      return 'What is an ad group anyways?';
    case 2:
      return 'This is the bit I really care about!';
    default:
      return 'Unknown step';
  }
}

const Exam = (props) => {
  const { subjectId, level, examId, chaptersNumber } = props.location.state;

  const [examName, setExamName] = useState("");
  const [conditions, setConditions] = useState([]);
  const [selectedStartExamDate, setSelectedStartExamDate] = useState(
    Date.now()
  );
  const [selectedEndExamDate, setSelectedEndExamDate] = useState(Date.now());
  const [examType, setExamType] = useState("RealExam");
  const [examChapter, setExamChapter] = useState({});
  const [shortEssay, setShortEssay] = useState(1);
  const [longEssay, setLongEssay] = useState(1);
  const [chooseCorrectAnswer, setChooseCorrectAnswer] = useState(1);
  const [
    chooseMultipleCorrectAnswers,
    setChooseMultipleCorrectAnswers,
  ] = useState(1);
  const [trueOrFalse, setTrueOrFalse] = useState(1);
  const [durationHour, setDurationHour] = useState("");
  const [durationMin, setDurationMin] = useState("");
  const [durationSec, setDurationSec] = useState("");
  const [examMark, setExamMark] = useState(0);
  ////// Stepper code
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());
  const steps = getSteps();

  console.log(activeStep);

  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    let maxTimeLine = 3;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    if(activeStep === maxTimeLine){
      !examId ? addExam() : editExam();
    }

    if(activeStep < maxTimeLine) setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };
  //////

  useEffect(() => {
    if (examId) {
      Axios.post("/api/professor/get-exam", { subjectId, level, examId }).then(
        (res) => {
          if (res.data.pass) {
            const exam = res.data.exam;

            const hour = exam.duration.split(":")[0]
            const min = exam.duration.split(":")[1]
            const sec = exam.duration.split(":")[2]

            setDurationHour(hour);
            setDurationMin(min);
            setDurationSec(sec);
            setSelectedStartExamDate(exam.examDate);
            setSelectedEndExamDate(exam.examEndTime);
            setExamType(exam.type);
            setExamChapter(exam.chapters);
            setConditions(exam.conditions);
            setShortEssay(exam.shortEssay);
            setLongEssay(exam.longEssay);
            setChooseCorrectAnswer(exam.chooseCorrectAnswer);
            setChooseMultipleCorrectAnswers(exam.chooseMultipleCorrectAnswers);
            setTrueOrFalse(exam.trueOrFalse);
            setConditions(exam.conditions);
            setExamName(exam.examName);
            setExamMark(exam.examMark)
          }
        }
      );
    }
  }, []);

  const getQuestionTypeMark = type => {


    if(type === "shortEssay") return shortEssay
    if(type === "longEssay") return longEssay
    if(type === "chooseCorrectAnswer") return chooseCorrectAnswer
    if(type === "multipleAnswers") return chooseMultipleCorrectAnswers
    if(type === "trueOrFalse") return trueOrFalse

    return 0
  }

  // Count the total exam mark depending on number of questions and there mark
  useEffect(() => {
    let mark = 0;
    conditions.map(condition => {
      let conditionMark = condition.numberOfQuestions * getQuestionTypeMark(condition.type);
      mark += conditionMark
    })
    setExamMark(mark);
  }, [conditions, shortEssay, longEssay, chooseCorrectAnswer, chooseMultipleCorrectAnswers, trueOrFalse])
 
  const collectInformation = () => {
    const duration = moment(
      `${durationHour}${durationMin}${durationSec}`,
      "hmmss"
    ).format("HH:mm:ss");

    const newExam = {
      subjectId,
      _id: examId,
      duration,
      examDate: selectedStartExamDate,
      examEndTime: selectedEndExamDate,
      chapters: examChapter,
      examName,
      type: examType,
      shortEssay,
      longEssay,
      chooseCorrectAnswer,
      chooseMultipleCorrectAnswers,
      trueOrFalse,
      conditions,
      examMark
    };

    return newExam
  }

  const addExam = () => {

    const newExam = collectInformation();

    Axios.post("/api/professor/add-exam", { subjectId, level, newExam }).then(
      (res) => {
        if (res.data.pass === true) {
          props.history.push({
            pathname: "/professor/subject/exams-list",
            state: { subjectId, level },
          });
        }
      }
    );
  };

  const editExam = () => {
    const newExam = collectInformation();

    Axios.post("/api/professor/add-exam", { subjectId, level, newExam }).then(
      (res) => {
        if (res.data.pass === true) {
          props.history.push({
            pathname: "/professor/subject/exams-list",
            state: { subjectId, level },
          });
        }
      }
    );
  }

  const timeCondition = (e) => {
    const name = e.currentTarget.name;
    let value = e.currentTarget.value;

    if (value.length === 1) {
      value = `0${value}`;
    }

    if (value.length > 2 && value[0] === "0") {
      value = value.substring(1);
    } else if (value.length > 2 && value[0] !== "0") {
      value = value.slice(0, 2);
    }

    if (name === "hour") {
      parseInt(value) <= 23 ? setDurationHour(value) : setDurationHour("23");
    } else if (name === "min") {
      parseInt(value) < 59 ? setDurationMin(value) : setDurationMin("59");
    } else if (name === "sec") {
      parseInt(value) <= 59 ? setDurationSec(value) : setDurationSec("59");
    }
  };

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
            Exam Structure
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


        <Grid style={{display: 'flex', alignItems: "center", flexDirection: 'column', width : '80%', border: '1px solid #1C60B3', borderRadius: '5px', padding: '5rem' }}>
            <Stepper activeStep={activeStep} alternativeLabel style={{width: '100%'}}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel><p style={{font: 'normal normal 600 16px/25px Poppins'}}>{label}</p></StepLabel>
          </Step>
        ))}
      </Stepper>
      <Grid style={{width: '75%'}}>
        {
          activeStep === 0 && <ExamInformation examName={examName} setExamName={setExamName} examType={examType} setExamType={setExamType} timeCondition={timeCondition} durationHour={durationHour} durationMin={durationMin} durationSec={durationSec} selectedStartExamDate={selectedStartExamDate} setSelectedStartExamDate={setSelectedStartExamDate} selectedEndExamDate={selectedEndExamDate} setSelectedEndExamDate={setSelectedEndExamDate} />
        }
        {
          activeStep === 1 && <ExamCondition chaptersNumber={chaptersNumber} examChapter={examChapter} setExamChapter={setExamChapter} shortEssay={shortEssay} setShortEssay={setShortEssay} longEssay={longEssay} setLongEssay={setLongEssay} chooseCorrectAnswer={chooseCorrectAnswer} setChooseCorrectAnswer={setChooseCorrectAnswer} chooseMultipleCorrectAnswers={chooseMultipleCorrectAnswers} setChooseMultipleCorrectAnswers={setChooseMultipleCorrectAnswers} trueOrFalse={trueOrFalse} setTrueOrFalse={setTrueOrFalse} conditions={conditions} setConditions={setConditions} />
        }
        {
          activeStep === 2 && <ExamPreview />
        }
        {
          activeStep === 3 && <ExamStructureDone />
        }
      </Grid>
      <Grid style={{width: '75%', display: 'flex', justifyContent: 'space-between', marginTop: '3rem'}}>
        <Button disabled={activeStep === 0} onClick={handleBack} variant="outlined" style={{textTransform: 'none', color: '#333333', font: 'normal normal 600 14px/25px Poppins', height: "3rem", width: '10rem', borderRadius: '10px', borderWidth: '2px'}}>Previous Page</Button>
        <Button onClick={handleNext} style={{backgroundColor: '#1C60B3', textTransform: 'none', color: 'white', font: 'normal normal 600 14px/25px Poppins', height: "3rem", width: '10rem'}}>{activeStep >= steps.length - 1 ? 'Done' : 'Next Page'}</Button>
      </Grid>
        </Grid>
        </Grid>
      <p>Exam Mark: {examMark}</p>
    </Grid>
  );
};

export default Exam;
