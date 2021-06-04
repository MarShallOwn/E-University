import React, { useState, useEffect } from "react";
import {
  Grid,
  Button,
  TextField,
  Modal,
  InputAdornment
} from "@material-ui/core";
import Axios from 'axios'
import DisplayedQuestion from "./DisplayedQuestion";
import { MdSearch } from 'react-icons/md'

const QuestionBank = props => {

  const { subjectId, level } = props.location.state;

  const [subject, setSubject] = useState({ questionBank: {questions: []} });
  const [updateSubject, setUpdateSubject] = useState(false)
  const [chapters, setChapters] = useState({ current: 3, new: 3 });
  const [update, setUpdate] = useState(0);
  const [open, setOpen] = useState({bool: false, questionId: ""});

  console.log(chapters.current)
  console.log(chapters.new)

  useEffect(() => {
    Axios.post("/api/professor/get-subject", { subjectId, level }).then(
      (res) =>{ 
        if(res.data.pass){
        setSubject(res.data.subject)
        setChapters({current: res.data.subject.questionBank.chaptersNumber,new: res.data.subject.questionBank.chaptersNumber})
      }
      });
  }, [updateSubject]);


  const confirmHandleChaptersChange = (result) => {
    if (result === "yes") {
      setChapters({ ...chapters, current: parseInt(chapters.new) });
      Axios.post("/api/professor/question-bank/chapters-number", { chaptersNumber: parseInt(chapters.new), subjectId, level }).then(res => {})
    } else {
      setChapters({ ...chapters, new: parseInt(chapters.current) });
    }
  };

  const updateChapters = (e) =>{
    
    setChapters({ ...chapters, new: parseInt(e.target.value) })

    Axios.post("/api/professor/question-bank/chapters-number", { chaptersNumber: parseInt(e.target.value), subjectId, level }).then(res => {})
  }



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
            {subject.name} Question Bank
          </p>
          <div
            style={{
              position: "absolute",
              left: "0",
              bottom: "0",
              width: "300px",
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

        <Grid style={{display: 'flex', alignItems: "center" }}>
        <p style={{display: 'inline-block', marginRight: '1rem', color: '#2C4563', font: 'normal normal 600 25px/43px Poppins'}}>Chapter Numbers :</p>
        <TextField
        onChange={updateChapters}
        name="chapters"
        id="chapters"
        type="number"
        variant="outlined"
        size="small"
        style={{width: '150px'}}
      />
      {
        chapters.new < chapters.current && (
        <Button onClick={() => confirmHandleChaptersChange("yes")}>
          Confirm
        </Button>
        )
      }
        </Grid>

        <Grid>
        <TextField
            variant="outlined"
            size="small"
            placeholder="search level and subject"
            style={{ width: "30rem" , marginBottom: '2rem'}}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <MdSearch color="#7A7A7A" />
                </InputAdornment>
              ),
            }}
          />
        </Grid>

      {chapters.new < chapters.current && (
        <Grid>
          Are you sure you want to lower chapters number? all questions will be
          removed from the removed Chapter
          <Button onClick={() => confirmHandleChaptersChange("no")}>
            Cancel
          </Button>
        </Grid>
      )}

    <Grid style={{display: 'flex', alignItems: "center", flexDirection: 'column', width : '80%', border: '1px solid #1C60B3', borderRadius: '5px' }}>
      {Array(chapters.current)
        .fill(null)
        .map((value, index) => {
          const chapter = index + 1;

          return <DisplayedQuestion key={index} chapter={chapter} subjectId={subjectId} level={level} setUpdateSubject={setUpdateSubject} subject={subject} setOpen={setOpen} />
        })}
</Grid>
        </Grid>

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