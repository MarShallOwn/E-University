import React from "react";
import { Grid, TextField, InputAdornment } from "@material-ui/core";
import QuestionCheckBox from "./QuestionCheckBox";
import QuestionRadioButton from "./QuestionRadioButton";
import TrueOrFalse from "./TrueOrFalse";
import Essay from "./Essay";

const Question = (props) => {
  const {
    question,
    exam,
    setExam,
    editAnswer,
    studentQuestionsAnswer,
    setStudentQuestionsAnswer,
    darkMode,
  } = props;

  return (
    <Grid style={{ margin: "2rem 0" }}>
      <Grid style={{ display: "flex", alignItems: "center" }}>
        <Grid style={{ width: "55%" }}>
          <p
            style={
              darkMode
                ? {
                    display: "inline-block",
                    marginRight: "2rem",
                    font: "normal normal 600 18px/27px Poppins",
                    color: "#bebec0",
                  }
                : {
                    display: "inline-block",
                    marginRight: "2rem",
                    font: "normal normal 600 18px/27px Poppins",
                  }
            }
          >
            {question.questionName}
          </p>
        </Grid>
        <Grid
          style={{ width: "17%", display: "flex", justifyContent: "flex-end" }}
        >
          <p
            style={
              darkMode
                ? {
                    display: "inline-block",
                    color: "#bebec0",
                    font: "normal normal 600 18px/27px Poppins",
                  }
                : {
                    display: "inline-block",
                    color: "#1C60B3",
                    font: "normal normal 600 18px/27px Poppins",
                  }
            }
          >
            (Difficulty {question.difficulty})
          </p>
        </Grid>
        <Grid
          style={{ width: "18%", display: "flex", justifyContent: "flex-end" }}
        >
          <p
            style={
              darkMode
                ? {
                    display: "inline-block",
                    color: "#bebec0",
                    font: "normal normal 600 18px/27px Poppins",
                  }
                : {
                    display: "inline-block",
                    color: "#1C60B3",
                    font: "normal normal 600 18px/27px Poppins",
                  }
            }
          >
            ({question.questionType})
          </p>
        </Grid>
        <Grid
          style={{ width: "10%", display: "flex", justifyContent: "flex-end" }}
        >
          <p
            style={
              darkMode
                ? {
                    display: "inline-block",
                    color: "#bebec0",
                    font: "normal normal 600 18px/27px Poppins",
                  }
                : {
                    display: "inline-block",
                    color: "#1C60B3",
                    font: "normal normal 600 18px/27px Poppins",
                  }
            }
          >
            ({question.questionType === "shortEssay" && exam.shortEssay}
            {question.questionType === "longEssay" && exam.longEssay}
            {question.questionType === "chooseCorrectAnswer" &&
              exam.chooseCorrectAnswer}{" "}
            {question.questionType === "multipleAnswers" &&
              exam.chooseMultipleCorrectAnswers}
            {question.questionType === "trueOrFalse" && exam.trueOrFalse} point)
          </p>
        </Grid>
      </Grid>
      {question.questionType === "shortEssay" && (
        <Essay
          darkMode={darkMode}
          questionId={question._id}
          answers={question.answers}
          editAnswer={editAnswer}
          userAnswer={question.userAnswer}
        />
      )}
      {question.questionType === "longEssay" && (
        <Essay
          darkMode={darkMode}
          questionId={question._id}
          answers={question.answers}
          editAnswer={editAnswer}
          userAnswer={question.userAnswer}
        />
      )}
      {question.questionType === "multipleAnswers" && (
        <QuestionCheckBox
          darkMode={darkMode}
          questionId={question._id}
          answers={question.answers}
          editAnswer={editAnswer}
          userAnswer={question.userAnswer}
        />
      )}
      {question.questionType === "chooseCorrectAnswer" && (
        <QuestionRadioButton
          darkMode={darkMode}
          questionId={question._id}
          answers={question.answers}
          editAnswer={editAnswer}
          userAnswer={question.userAnswer}
        />
      )}
      {question.questionType === "trueOrFalse" && (
        <TrueOrFalse
          darkMode={darkMode}
          questionId={question._id}
          editAnswer={editAnswer}
        />
      )}
    </Grid>
  );
};

export default Question;

/*
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
      {question.questionType === "trueOrFalse" && (
        <TrueOrFalse
          correctAnswer={question.correctAnswers}
          setCorrectAnswer={question.setCorrectAnswers}
          buttonDisabled={true}
        />
      )}
  </Grid>
*/
