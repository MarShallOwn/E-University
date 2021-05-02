import React, { useState, useEffect } from "react";
import {
  Grid,
  Button,
  TextField,
  Modal
} from "@material-ui/core";
import Axios from 'axios'
import DisplayedQuestion from "./DisplayedQuestion";

const QuestionBank = props => {

  const { subjectId, level } = props.location.state;

  const [subject, setSubject] = useState({ questionBank: {questions: []} });
  const [updateSubject, setUpdateSubject] = useState(false)
  const [chapters, setChapters] = useState({ current: 3, new: 3 });
  const [open, setOpen] = useState({bool: false, questionId: ""});

  useEffect(() => {
    Axios.post("/api/professor/get-subject", { subjectId, level }).then(
      (res) => res.data.pass && setSubject(res.data.subject)
    );
  }, [updateSubject]);



  const confirmHandleChaptersChange = (result) => {
    if (result === "yes") {
      setChapters({ ...chapters, current: chapters.new });
      Axios.post("/api/professor/question-bank/chapters-number", { chaptersNumber: chapters.new, subjectId, level }).then(res => {})
    } else {
      setChapters({ ...chapters, new: chapters.current });
    }
  };

  const updateChapters = (e) =>{
    setChapters({ ...chapters, new: parseInt(e.target.value) })

    Axios.post("/api/professor/question-bank/chapters-number", { chaptersNumber: e.target.value, subjectId, level }).then(res => {})
  }



  return (
    <Grid style={{ height: "calc(100vh - 3.5rem)" }}>
      <TextField
        onChange={updateChapters}
        name="chapters"
        id="chapters"
        type="number"
        placeholder="Number of Chapters"
      />
      <Button onClick={() => confirmHandleChaptersChange("yes")}>
        Confirm
      </Button>
      {chapters.new < chapters.current && (
        <Grid>
          Are you sure you want to lower chapters number ? all questions will be
          removed from the removed Chapter
          <Button onClick={() => confirmHandleChaptersChange("no")}>
            Cancel
          </Button>
        </Grid>
      )}

      {Array(chapters.current)
        .fill(null)
        .map((value, index) => {
          const chapter = index + 1;

          return <DisplayedQuestion key={index} chapter={chapter} subjectId={subjectId} level={level} setUpdateSubject={setUpdateSubject} subject={subject} setOpen={setOpen} />
        })}

        <Modal
        open={open.bool}
        onClose={() => {}}
        aria-labelledby="delete question"
        aria-describedby="delete question from question bank"
        >
          <Grid>
            Are you sure you want to delete this question ?
            <Button onClick={() => {}}>Confirm</Button>
            <Button onClick={() => setOpen({bool: false, questionId: ""})}>Cancel</Button>
          </Grid>
        </Modal>
    </Grid>
  );
};

export default QuestionBank;


/*
  const [questions, setQuestions] = useState([
    {
      id: "1",
      name: "testing",
      type: "multipleAnswers",
      difficulty: "A",
      answers: ["good", "bad", "great"],
      correctAnswers: { good: true, bad: true },
      chapter: 2
    },
    {
      id: "2",
      name: "is this",
      type: "multipleAnswers",
      difficulty: "B",
      answers: ["no", "yes", "maybe"],
      correctAnswers: { no: true, maybe: true },
      chapter: 1
    },
    {
      id: "1",
      name: "essay testing",
      type: "essay",
      difficulty: "C",
      answers: [],
      correctAnswers: {},
      chapter: 1
    }
  ]);


*/