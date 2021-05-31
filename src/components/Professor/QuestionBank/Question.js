import React, { useState, useEffect, useRef } from "react";
import {
  Grid,
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Button,
  Divider,
} from "@material-ui/core";
import { MdLibraryBooks } from "react-icons/md";
import { BsCardImage } from "react-icons/bs";
import { RiMovieFill } from "react-icons/ri";
import { GiSpeaker } from "react-icons/gi";
import { GrClose } from "react-icons/gr";
import ChooseCorrectAnswer from "./QuestionTypes/ChooseCorrectAnswer";
import MultipleAnswers from "./QuestionTypes/MultipleAnswers";
import TrueOrFalse from "./QuestionTypes/TrueOrFalse";
import Axios from "axios";
import QuestionMedia from "./QuestionMedia";
import { useStyles } from "./style";

const Question = (props) => {
  const {
    chapterNumber,
    subjectId,
    level,
    setUpdateSubject,
    edit,
    oldQuestion,
    setEditQuestion,
  } = props;

  const classes = useStyles();

  // upload media file
  const mediaRef = useRef(null);

  // activate Media click from icons
  const activateMediaRef = () => {
    mediaRef.current.click();
  };

  const [questionName, setQuestionName] = useState("");
  const [questionType, setQuestionType] = useState("multipleAnswers");
  const [difficulty, setDifficulty] = useState("");
  const [answers, setAnswers] = useState([]);
  const [correctAnswers, setCorrectAnswers] = useState({});
  const [media, setMedia] = useState([]);

  useEffect(() => {
    if (edit === true) {
      setQuestionName(oldQuestion.questionName);
      setQuestionType(oldQuestion.questionType);
      setDifficulty(oldQuestion.difficulty);
      setAnswers(oldQuestion.answers);
      setCorrectAnswers(oldQuestion.correctAnswers);
      setMedia(oldQuestion.media);
    }
  }, []);

  const handleFileUpload = (e) => {
    console.log(e.target.files);
    setMedia([...media, e.target.files[0]]);
  };

  const handleMediaDeletion = (e) => {
    const fileName = e.currentTarget.id;
    const storedOrNewUpload = e.currentTarget.name;
    const tempMedia = media;

    setMedia(
      tempMedia.filter((file) => {
        if (storedOrNewUpload === "stored") {
          return file._id !== fileName;
        } else {
          return file.name !== fileName;
        }
      })
    );
  };

  const deleteQuestion = (e) => {
    const id = e.currentTarget.id;
  };

  const editQuestion = (e) => {
    const oldMedia = media.filter((file) => typeof file.name !== "string");

    const newMedia = media.filter((file) => typeof file.name === "string");

    const newQuestion = {
      questionName,
      questionType,
      difficulty,
      answers,
      correctAnswers,
      chapterNumber,
      oldMedia,
      _id: e.currentTarget.id,
    };

    const formData = new FormData();

    if (newMedia.length !== 0) {
      newMedia.map((file) => {
        formData.append("multi-files", file);
      });
    }

    formData.append("newQuestion", JSON.stringify(newQuestion));
    formData.append("level", JSON.stringify(level));
    formData.append("subjectId", JSON.stringify(subjectId));

    const headers = {
      "Content-Type": "application/x-www-form-urlencoded",
    };

    // Handle the display of the media that is uploaded for preview
    Axios.post(
      "/api/professor/question-bank/edit-question",
      formData,
      headers
    ).then((res) => {
      if (res.data.pass) {
        const randomNumber = Math.floor(Math.random() * 100 + 1);
        setUpdateSubject(randomNumber);
        setQuestionName("");
        setQuestionType("");
        setDifficulty();
        setAnswers([]);
        setCorrectAnswers({});
        setMedia([]);
        setEditQuestion({ bool: false, index: "" });
      }
    });
  };

  const addQuestion = () => {
    const newQuestion = {
      questionName,
      questionType,
      difficulty,
      answers,
      correctAnswers,
      chapterNumber,
    };

    const formData = new FormData();

    if (media.length !== 0) {
      media.map((file) => {
        formData.append("multi-files", file);
      });
    }

    formData.append("newQuestion", JSON.stringify(newQuestion));
    formData.append("level", JSON.stringify(level));
    formData.append("subjectId", JSON.stringify(subjectId));

    const headers = {
      "Content-Type": "application/x-www-form-urlencoded",
    };

    // Handle the display of the media that is uploaded for preview
    Axios.post(
      "/api/professor/question-bank/add-question",
      formData,
      headers
    ).then((res) => {
      if (res.data.pass) {
        const randomNumber = Math.floor(Math.random() * 100 + 1);
        setUpdateSubject(randomNumber);
        setQuestionName("");
        setQuestionType("");
        setDifficulty();
        setAnswers([]);
        setCorrectAnswers({});
        setMedia([]);
      }
    });
  };

  return (
    <Grid>
      <Grid
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          marginBottom: '5rem'
        }}
      >
        <button
          className={
            questionType === "shortEssay"
              ? classes.activeQuestionType
              : classes.questionType
          }
          onClick={() => setQuestionType("shortEssay")}
        >
          <MdLibraryBooks fontSize="2rem" />
          <p>Short Essay</p>
        </button>
        <button
          className={
            questionType === "longEssay"
              ? classes.activeQuestionType
              : classes.questionType
          }
          onClick={() => setQuestionType("longEssay")}
        >
          <MdLibraryBooks fontSize="2rem" />
          <p>Long Essay</p>
        </button>
        <button
          className={
            questionType === "chooseCorrectAnswer"
              ? classes.activeQuestionType
              : classes.questionType
          }
          onClick={() => setQuestionType("chooseCorrectAnswer")}
        >
          <MdLibraryBooks fontSize="2rem" />
          <p>Choose Correct Answer</p>
        </button>
        <button
          className={
            questionType === "multipleAnswers"
              ? classes.activeQuestionType
              : classes.questionType
          }
          onClick={() => setQuestionType("multipleAnswers")}
        >
          <MdLibraryBooks fontSize="2rem" />
          <p>Choose multiple Correct Answers</p>
        </button>
        <button
          className={
            questionType === "trueOrFalse"
              ? classes.activeQuestionType
              : classes.questionType
          }
          onClick={() => setQuestionType("trueOrFalse")}
        >
          <MdLibraryBooks fontSize="2rem" />
          <p>True or False</p>
        </button>
      </Grid>
      <Grid style={{ border: "1px solid #1C60B3", borderRadius: '7px', marginBottom: '3rem' }}>
        <Grid style={{ display: "flex", alignItems: "center", height: "4rem", padding: '0 2rem' }}>
          <Grid style={{ width: "20%" }}>
            <FormControl
              variant="outlined"
              size="small"
              style={{ width: "10rem", boxShadow: "0px 3px 6px #00000029" }}
            >
              <InputLabel id="demo-simple-select-label">Difficulty</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
              >
                <MenuItem value={"A"}>A</MenuItem>
                <MenuItem value={"B"}>B</MenuItem>
                <MenuItem value={"C"}>C</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid style={{ width: "30%" }}></Grid>
          <Grid
            style={{ width: "40%", display: "flex", justifyContent: "center" }}
          >
            <input
              type="file"
              onChange={handleFileUpload}
              ref={mediaRef}
              style={{ display: "none" }}
            ></input>
            <BsCardImage
              onClick={activateMediaRef}
              fontSize="1.8rem"
              style={{ margin: "0 .7rem", color: "#1C60B3", cursor: "pointer" }}
            />
            <RiMovieFill
              onClick={activateMediaRef}
              fontSize="1.8rem"
              style={{ margin: "0 .7rem", color: "#1C60B3", cursor: "pointer" }}
            />
            <GiSpeaker
              onClick={activateMediaRef}
              fontSize="1.8rem"
              style={{ margin: "0 .7rem", color: "#1C60B3", cursor: "pointer" }}
            />
          </Grid>

          <Grid
            style={{
              width: "10%",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <GrClose />
          </Grid>
        </Grid>
        <Grid>
        <Divider />
        </Grid>
        <Grid style={{padding: '0 2rem'}}>
          <TextField
            variant="outlined"
            size="small"
            value={questionName}
            onChange={(e) => setQuestionName(e.target.value)}
          />

          {media.map((file, index) => {
            let url;
            console.log(typeof file.name === "string");
            if (typeof file.name === "string") {
              url = URL.createObjectURL(file);
            } else if (edit && file.type.includes("image")) {
              url = `https://res.cloudinary.com/dxkufsejm/image/upload/fl_attachment/v1601325837/${file.file}`;
            } else if (
              edit &&
              (file.type.includes("video") || file.type.includes("audio"))
            ) {
              url = `https://res.cloudinary.com/dxkufsejm/video/upload/fl_attachment/v1601325837/${file.file}`;
            }

            return (
              <QuestionMedia
                key={index}
                file={file}
                handleMediaDeletion={handleMediaDeletion}
                url={url}
                edit={edit}
              />
            );
          })}

          {questionType === "multipleAnswers" && (
            <MultipleAnswers
              answers={answers}
              setAnswers={setAnswers}
              correctAnswers={correctAnswers}
              setCorrectAnswers={setCorrectAnswers}
            />
          )}
          {questionType === "chooseCorrectAnswer" && (
            <ChooseCorrectAnswer
              answers={answers}
              setAnswers={setAnswers}
              correctAnswer={correctAnswers}
              setCorrectAnswer={setCorrectAnswers}
            />
          )}
          {questionType === "trueOrFalse" && (
            <TrueOrFalse
              correctAnswer={correctAnswers}
              setCorrectAnswer={setCorrectAnswers}
            />
          )}

          {edit && (
            <>
              <Button
                id={oldQuestion._id}
                variant="contained"
                onClick={editQuestion}
              >
                Edit Question
              </Button>
              <Button
                variant="contained"
                onClick={() => setEditQuestion({ bool: false, index: "" })}
              >
                Cancel
              </Button>
            </>
          )}
          {!edit && (
            <Button variant="contained" onClick={addQuestion} style={{color: 'white',width: '7rem', backgroundColor: '#1C60B3', font: 'normal normal 600 12px/25px Poppins', textTransform: 'lowercase'}}>
              Submit
            </Button>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Question;
