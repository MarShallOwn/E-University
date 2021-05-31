import React, { useState, useEffect } from "react";
import {
  Accordion,
  AccordionSummary,
  Grid,
  Button,
  AccordionDetails,
} from "@material-ui/core";
import { MdExpandMore, MdExpandLess } from "react-icons/md";
import { BiPencil } from 'react-icons/bi'
import { GrClose } from "react-icons/gr";
import QuestionCheckBox from "./QuestionTypes/QuestionCheckBox";
import QuestionRadioButton from "./QuestionTypes/QuestionRadioButton";
import TrueOrFalse from "./QuestionTypes/TrueOrFalse";
import Question from "./Question";
import QuestionMedia from "./QuestionMedia";

const DisplayedQuestion = (props) => {
  const { chapter, subjectId, level, setUpdateSubject, subject, setOpen } = props;

  const [editQuestion, setEditQuestion] = useState({
    bool: false,
    index: "",
  });

  const [questionsNumber, setQuestionsNumber] = useState(0)

  useEffect(() => {
    setQuestionsNumber(subject.questionBank.questions.filter(question => question.chapterNumber === chapter).length)
  }, [subject])

  return (
    <Accordion style={{width: '100%'}}>
      <AccordionSummary
      style={{padding: '0 3rem'}}
        expandIcon={<MdExpandMore fontSize="2.5rem" />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Grid>
          <p style={{ display: "inline-block", marginRight: "2rem", font: 'normal normal 600 20px/38px Poppins' }}>
            Chapter: {chapter}
          </p>
          <p style={{color: '#1C60B3',font: 'normal normal normal 15px/0px Poppins',marginBottom: '1.5rem', marginTop: '0px'}}>
            {questionsNumber} Questions
          </p>
        </Grid>
      </AccordionSummary>
      <AccordionDetails style={{ display: "block", padding: '0 3rem' }}>
        <Question
          subjectId={subjectId}
          level={level}
          chapterNumber={chapter}
          setUpdateSubject={setUpdateSubject}
        />
        <Grid style={{backgroundColor: '#F1F8FF', padding: '.1rem 0', marginBottom: '5rem'}}> 
        {subject.questionBank.questions.map((question, index) => {
          if (question.chapterNumber === chapter) {
            if (editQuestion.bool && editQuestion.index === index) {
              return <Question edit={true} subjectId={subjectId} level={level} oldQuestion={question} chapterNumber={chapter} setUpdateSubject={setUpdateSubject} setEditQuestion={setEditQuestion} />;
            } else {
              return (
                <Grid key={index} style={{padding: '0 2rem', margin: '5rem 0'}}>
                    <Grid style={{display: 'flex', alignItems: 'center'}}>
                      <Grid style={{width: '55%'}}>
                      <p
                        style={{
                          display: "inline-block",
                          marginRight: "2rem",
                          font: 'normal normal 600 16px/27px Poppins'
                        }}
                      >
                        {question.questionName}
                      </p>
                      </Grid>
                      <Grid style={{width: '15%'}}>
                      <p
                        style={{
                          display: "inline-block",
                          marginRight: "2rem",
                          color: '#1C60B3',
                          font: 'normal normal 600 16px/27px Poppins'
                        }}
                      >
                        (Difficulty {question.difficulty})
                      </p>
                      </Grid>
                      <Grid style={{width: '15%'}}>
                      <p
                        style={{
                          display: "inline-block",
                          marginRight: "2rem",
                          color: '#1C60B3',
                          font: 'normal normal 600 16px/27px Poppins'
                        }}
                      >
                        ({question.questionType})
                      </p>
                      </Grid>
                      {!editQuestion.bool && (
                      <Grid style={{ width: '15%'}}>
                        <Button
                          onClick={() => setEditQuestion({ bool: true, index })}
                        >
                          <BiPencil fontSize="20px" />
                        </Button>
                        <Button onClick={() => setOpen({bool: true, questionId: question._id})}><GrClose fontSize="20px"  /></Button>
                      </Grid>
                    )}
                    </Grid>

                  {question.media.length !== 0 &&
                    <Grid style={{display: 'flex', margin: '1.5rem 0'}}>
                  {question.media.map((file, index) => {
                    let url;
                    if(file.type.includes("image")){
                      url = `https://res.cloudinary.com/dxkufsejm/image/upload/fl_attachment/v1601325837/${file.file}`
                    }
                    else if(file.type.includes("video") || file.type.includes("audio")){
                      url = `https://res.cloudinary.com/dxkufsejm/video/upload/fl_attachment/v1601325837/${file.file}`
                    }
                      return (
                        <QuestionMedia
                          key={index}
                          url={url}
                          file={file}
                          deleteDisabled={true}
                        />
                      );
                  })}
                  </Grid>
                  }

                  <p style={{font: 'normal normal 600 16px/25px Poppins', marginBottom: '0px'}}>Answers</p>

                    {question.questionType === "multipleAnswers" && (
                      <QuestionCheckBox
                        answers={question.answers}
                        correctAnswers={question.correctAnswers}
                        buttonDisabled={true}
                      />
                    )}
                    {question.questionType === "chooseCorrectAnswer" && (
                      <QuestionRadioButton
                        answers={question.answers}
                        correctAnswer={question.correctAnswers}
                        buttonDisabled={true}
                      />
                    )}
                    {question.type === "trueOrFalse" && (
                      <TrueOrFalse
                        correctAnswer={question.correctAnswers}
                        setCorrectAnswer={question.setCorrectAnswers}
                        buttonDisabled={true}
                      />
                    )}
                </Grid>
              );
            }
          }
        })}
                </Grid>
      </AccordionDetails>
    </Accordion>
  );
};

export default DisplayedQuestion;
