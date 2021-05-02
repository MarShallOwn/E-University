import React, { useState, useEffect } from "react";
import {
  Grid,
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Button,
} from "@material-ui/core";
import ChooseCorrectAnswer from "./QuestionTypes/ChooseCorrectAnswer";
import MultipleAnswers from "./QuestionTypes/MultipleAnswers";
import TrueOrFalse from "./QuestionTypes/TrueOrFalse";
import Axios from "axios";
import QuestionMedia from "./QuestionMedia";

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

    setMedia(tempMedia.filter((file) => {
      if(storedOrNewUpload === "stored"){
        return file._id !== fileName
      }
      else{
        return file.name !== fileName
      }
    }));
  };

  const deleteQuestion = e => {
    const id = e.currentTarget.id

  }


  const editQuestion = e => {

    const oldMedia = media.filter(file => typeof file.name !== "string");

    const newMedia = media.filter(file => typeof file.name === "string");

    const newQuestion = {
      questionName,
      questionType,
      difficulty,
      answers,
      correctAnswers,
      chapterNumber,
      oldMedia,
      _id: e.currentTarget.id
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
        setEditQuestion({bool: false, index: ""})
      }
    });
  }

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
      {edit && (
        <>
        <Button id={oldQuestion._id} variant="contained" onClick={editQuestion}>
          Edit Question
        </Button>
        <Button variant="contained" onClick={() => setEditQuestion({bool: false, index: ""})}>
          Cancel
        </Button>
        </>
      )}
      {!edit && (
        <Button variant="contained" onClick={addQuestion}>
          Submit
        </Button>
      )}
      Question
      <TextField
        value={questionName}
        onChange={(e) => setQuestionName(e.target.value)}
      />
      <FormControl style={{ width: "10rem" }}>
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
      <input type="file" onChange={handleFileUpload}></input>
      {media.map((file, index) => {
        let url;
        console.log(typeof file.name === 'string')
        if (typeof file.name === 'string') {
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
      <Grid style={{ display: "block" }}>
        <button onClick={() => setQuestionType("shortEssay")}>Short Essay</button>
        <button onClick={() => setQuestionType("longEssay")}>Long Essay</button>
        <button onClick={() => setQuestionType("chooseCorrectAnswer")}>
          Choose Correct Answer
        </button>
        <button onClick={() => setQuestionType("multipleAnswers")}>
          Choose multiple Correct Answers
        </button>
        <button onClick={() => setQuestionType("trueOrFalse")}>
          True or False
        </button>
      </Grid>
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
    </Grid>
  );
};

export default Question;
