import React, { useState, useEffect } from "react";
import Axios from "axios";
import {
  Grid,
  TextField,
  Radio,
  FormControlLabel,
  RadioGroup,
  Checkbox,
  Button,
} from "@material-ui/core";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
  KeyboardTimePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import Conditions from "./Conditions";
import moment from "moment";

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
          }
        }
      );
    }
  }, []);
 
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
    };

    return newExam
  }

  const AddExam = () => {

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
    <Grid>
      <TextField
        value={examName}
        onChange={(e) => setExamName(e.target.value)}
        label="Exam Name"
      />
      <RadioGroup
        value={examType}
        onChange={(e) => setExamType(e.target.value)}
      >
        Exam Type
        <FormControlLabel
          value="RealExam"
          control={<Radio />}
          label="Real Exam"
        />
        <FormControlLabel value="Test" control={<Radio />} label="Test" />
      </RadioGroup>
      <Grid style={{ display: "block" }}>
        Duration
        <TextField
          type="number"
          name="hour"
          onChange={timeCondition}
          value={durationHour}
          label="hour"
        />
        <TextField
          type="number"
          name="min"
          onChange={timeCondition}
          value={durationMin}
          label="min"
        />
        <TextField
          type="number"
          name="sec"
          onChange={timeCondition}
          value={durationSec}
          label="sec"
        />
      </Grid>
      <p>Exam Start</p>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          margin="normal"
          id="date-picker-dialog"
          label="Date picker dialog"
          format="MM/dd/yyyy"
          value={selectedStartExamDate}
          onChange={(date) => setSelectedStartExamDate(date)}
          KeyboardButtonProps={{
            "aria-label": "change date",
          }}
        />
        <KeyboardTimePicker
          margin="normal"
          id="time-picker"
          label="Time picker"
          value={selectedStartExamDate}
          onChange={(date) => setSelectedStartExamDate(date)}
          KeyboardButtonProps={{
            "aria-label": "change time",
          }}
        />
      </MuiPickersUtilsProvider>
      <p>Exam End</p>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          margin="normal"
          id="date-picker-dialog"
          label="Date picker dialog"
          format="MM/dd/yyyy"
          value={selectedEndExamDate}
          onChange={(date) => setSelectedEndExamDate(date)}
          KeyboardButtonProps={{
            "aria-label": "change date",
          }}
        />
        <KeyboardTimePicker
          margin="normal"
          id="time-picker"
          label="Time picker"
          value={selectedEndExamDate}
          onChange={(date) => setSelectedEndExamDate(date)}
          KeyboardButtonProps={{
            "aria-label": "change time",
          }}
        />
      </MuiPickersUtilsProvider>
      <Grid style={{ display: "block" }}>
        <TextField
          value={shortEssay}
          onChange={(e) => setShortEssay(parseInt(e.target.value))}
          style={{ width: "16rem", margin: "0 1rem" }}
          label="Short Essay"
          type="number"
          InputProps={{ inputProps: { min: 1, max: 15 } }}
        />
        <TextField
          value={longEssay}
          onChange={(e) => setLongEssay(parseInt(e.target.value))}
          style={{ width: "16rem", margin: "0 1rem" }}
          label="Long Essay"
          type="number"
          InputProps={{ inputProps: { min: 1, max: 15 } }}
        />
        <TextField
          value={chooseCorrectAnswer}
          onChange={(e) => setChooseCorrectAnswer(parseInt(e.target.value))}
          style={{ width: "16rem", margin: "0 1rem" }}
          label="Choose Correct Answer"
          type="number"
          InputProps={{ inputProps: { min: 1, max: 5 } }}
        />
        <TextField
          value={chooseMultipleCorrectAnswers}
          onChange={(e) =>
            setChooseMultipleCorrectAnswers(parseInt(e.target.value))
          }
          style={{ width: "16rem", margin: "0 1rem" }}
          label="Choose Multiple Correct Answers"
          type="number"
          InputProps={{ inputProps: { min: 1, max: 5 } }}
        />
        <TextField
          value={trueOrFalse}
          onChange={(e) => setTrueOrFalse(parseInt(e.target.value))}
          style={{ width: "16rem", margin: "0 1rem" }}
          label="True or False"
          type="number"
          InputProps={{ inputProps: { min: 1, max: 5 } }}
        />
      </Grid>
      {
        Array(chaptersNumber).fill(null).map((chapter, index) => (
          <FormControlLabel
          key={Math.random()}
          control={
            <Checkbox
              checked={examChapter[index+1]}
              onChange={(e) =>
                setExamChapter({
                  ...examChapter,
                  [e.target.name]: e.target.checked,
                })
              }
              name={index+1}
            />
          }
          label={`Chapter ${index+1}`}
        />
        ))
      }
      <Conditions conditions={conditions} setConditions={setConditions} />
      {!examId && <Button onClick={AddExam}>Add Exam</Button>}
      {examId && <Button onClick={editExam}>Edit Exam</Button>}
    </Grid>
  );
};

export default Exam;
