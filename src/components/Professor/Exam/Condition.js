import react, { useEffect, useState } from "react";
import {
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
} from "@material-ui/core";

const Condition = props => {

    const { conditions, setConditions, conditionIndex, setConditionState } = props
    
  const [chapter, setChapter] = useState("");
  const [questionType, setQuestionType] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [numberOfQuestions, setNumberofQuestions] = useState("");

  useEffect(() => {
      if(conditionIndex){
          const condition = conditions[conditionIndex];
          setChapter(condition.chapter)
          setQuestionType(condition.type)
          setDifficulty(condition.difficulty)
          setNumberofQuestions(condition.numberOfQuestions)
      }
  }, [])

  const addCondition = () => {
    const condition = {
      chapter,
      type: questionType,
      difficulty,
      numberOfQuestions,
    };

    if(conditionIndex){
        const newConditions = conditions;
        const index = newConditions.indexOf(conditionIndex);
        newConditions.splice(index, 1);
        newConditions.push(condition);
        setConditions(newConditions);
        setConditionState({stateChange: false,type: null,id: null})

    }
    else{
        setConditions([...conditions, condition]);
    }
  };

    return(
        <Grid>
              <FormControl style={{ width: "10rem", margin: "0 1rem" }}>
        <InputLabel>Chapter</InputLabel>
        <Select value={chapter} onChange={(e) => setChapter(e.target.value)}>
          <MenuItem value={1}>Chapter 1</MenuItem>
          <MenuItem value={2}>Chapter 2</MenuItem>
          <MenuItem value={3}>Chapter 3</MenuItem>
        </Select>
      </FormControl>
      <FormControl style={{ width: "10rem", margin: "0 1rem" }}>
        <InputLabel>Question Type</InputLabel>
        <Select
          value={questionType}
          onChange={(e) => setQuestionType(e.target.value)}
        >
          <MenuItem value={"chooseCorrectAnswer"}>
            Choose Correct Answer
          </MenuItem>
          <MenuItem value={"chooseMultipleCorrectAnswers"}>
            Choose Multiple Correct Answers
          </MenuItem>
          <MenuItem value={"trueOrFalse"}>True Or False</MenuItem>
          <MenuItem value={"shortEssay"}>Short Essay</MenuItem>
          <MenuItem value={"longEssay"}>Long Essay</MenuItem>
        </Select>
      </FormControl>
      <FormControl style={{ width: "10rem", margin: "0 1rem" }}>
        <InputLabel>Difficulty</InputLabel>
        <Select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
        >
          <MenuItem value={"A"}>A</MenuItem>
          <MenuItem value={"B"}>B</MenuItem>
          <MenuItem value={"C"}>C</MenuItem>
        </Select>
      </FormControl>
      <TextField
        type="number"
        label="Number of Questions"
        value={numberOfQuestions}
        onChange={(e) => setNumberofQuestions(e.target.value)}
      />
      <Button variant="contained" color="primary" onClick={addCondition}>
        Add Condition
      </Button>
        </Grid>
    )
}

export default Condition