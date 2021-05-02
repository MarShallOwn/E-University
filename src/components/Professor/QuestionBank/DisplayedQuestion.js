import React, { useState } from "react";
import {
  Accordion,
  AccordionSummary,
  Grid,
  Button,
  AccordionDetails,
} from "@material-ui/core";
import { MdExpandMore, MdExpandLess } from "react-icons/md";
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

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<MdExpandMore />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Grid>
          <p style={{ display: "inline-block", marginRight: "2rem" }}>
            Chapter: {chapter}
          </p>
        </Grid>
      </AccordionSummary>
      <AccordionDetails style={{ display: "block" }}>
        <Grid>
          <h3>Questions</h3>
        </Grid>
        <Question
          subjectId={subjectId}
          level={level}
          chapterNumber={chapter}
          setUpdateSubject={setUpdateSubject}
        />
        {subject.questionBank.questions.map((question, index) => {
          if (question.chapterNumber === chapter) {
            if (editQuestion.bool && editQuestion.index === index) {
              return <Question edit={true} subjectId={subjectId} level={level} oldQuestion={question} chapterNumber={chapter} setUpdateSubject={setUpdateSubject} setEditQuestion={setEditQuestion} />;
            } else {
              return (
                <Accordion key={index}>
                  <AccordionSummary
                    expandIcon={<MdExpandMore />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                  >
                    <Grid>
                      <p
                        style={{
                          display: "inline-block",
                          marginRight: "2rem",
                        }}
                      >
                        {question.questionName}
                      </p>
                      <p
                        style={{
                          display: "inline-block",
                          marginRight: "2rem",
                        }}
                      >
                        {question.difficulty}
                      </p>
                      <p
                        style={{
                          display: "inline-block",
                          marginRight: "2rem",
                        }}
                      >
                        {question.questionType}
                      </p>
                    </Grid>
                    {!editQuestion.bool && (
                      <>
                        <Button
                          onClick={() => setEditQuestion({ bool: true, index })}
                        >
                          Edit
                        </Button>
                        <Button onClick={() => setOpen({bool: true, questionId: question._id})}>Delete</Button>
                      </>
                    )}
                  </AccordionSummary>

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

                  <AccordionDetails style={{ display: "block" }}>
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
                  </AccordionDetails>
                </Accordion>
              );
            }
          }
        })}
      </AccordionDetails>
    </Accordion>
  );
};

export default DisplayedQuestion;
