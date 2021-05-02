import react, { useState } from "react";
import {
  Grid,
  TextField,
} from "@material-ui/core";
import QuestionCheckBox from "./QuestionCheckBox";

const MultipleAnswers = props => {

  const {answers, setAnswers, correctAnswers, setCorrectAnswers} = props

  const [answer, setAnswer] = useState("");

  const handleAddAnswer = () => {
    setAnswers([...answers, answer]);
    setAnswer("");
  };

  return (
    <Grid>
      Choose Multiple Answers
      Answer:{" "}
      <TextField value={answer} onChange={(e) => setAnswer(e.target.value)} />
      <button onClick={handleAddAnswer}>Add Answer</button>
      <QuestionCheckBox answers={answers} setAnswers={setAnswers} correctAnswers={correctAnswers} setCorrectAnswers={setCorrectAnswers} />
    </Grid>
  );
};

export default MultipleAnswers;
