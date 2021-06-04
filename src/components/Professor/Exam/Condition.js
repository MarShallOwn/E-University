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

const Condition = (props) => {
  const { conditions, setConditions, conditionIndex, setConditionState } =
    props;

  const [chapter, setChapter] = useState("");
  const [questionType, setQuestionType] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [numberOfQuestions, setNumberofQuestions] = useState("");

  useEffect(() => {
    if (conditionIndex) {
      const condition = conditions[conditionIndex];
      setChapter(condition.chapter);
      setQuestionType(condition.type);
      setDifficulty(condition.difficulty);
      setNumberofQuestions(condition.numberOfQuestions);
    }
  }, []);

  const addCondition = () => {
    const condition = {
      chapter,
      type: questionType,
      difficulty,
      numberOfQuestions,
    };

    if (conditionIndex) {
      const newConditions = conditions;
      const index = newConditions.indexOf(conditionIndex);
      newConditions.splice(index, 1);
      newConditions.push(condition);
      setConditions(newConditions);
      setConditionState({ stateChange: false, type: null, id: null });
    } else {
      setConditions([...conditions, condition]);
    }
  };

  return (
    <Grid style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between'}}>
      <FormControl
        variant="outlined"
        size="small"
        style={{ width: "23%", margin: '1.5rem 0' }}
      >
        <InputLabel>Chapter</InputLabel>
        <Select value={chapter} onChange={(e) => setChapter(e.target.value)}>
          <MenuItem value={1}>Chapter 1</MenuItem>
          <MenuItem value={2}>Chapter 2</MenuItem>
          <MenuItem value={3}>Chapter 3</MenuItem>
        </Select>
      </FormControl>
      <FormControl
        variant="outlined"
        size="small"
        style={{ width: "23%", margin: '1.5rem 0' }}
      >
        <InputLabel>Question Type</InputLabel>
        <Select
          value={questionType}
          onChange={(e) => setQuestionType(e.target.value)}
        >
          <MenuItem value={"chooseCorrectAnswer"}>
            Choose Correct Answer
          </MenuItem>
          <MenuItem value={"multipleAnswers"}>
            Choose Multiple Correct Answers
          </MenuItem>
          <MenuItem value={"trueOrFalse"}>True Or False</MenuItem>
          <MenuItem value={"shortEssay"}>Short Essay</MenuItem>
          <MenuItem value={"longEssay"}>Long Essay</MenuItem>
        </Select>
      </FormControl>
      <FormControl
        variant="outlined"
        size="small"
        style={{ width: "23%", margin: '1.5rem 0' }}
      >
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
        variant="outlined"
        size="small"
        style={{ width: "23%", margin: '1.5rem 0' }}
        type="number"
        label="Number of Questions"
        value={numberOfQuestions}
        onChange={(e) => setNumberofQuestions(e.target.value)}
      />
      <Grid style={{width: '100%', display: 'flex', justifyContent: 'flex-end'}}>
        <Button variant="contained" color="primary" onClick={addCondition} style={{backgroundColor: '#1C60B3', textTransform: 'none', color: 'white', font: 'normal normal 600 14px/25px Poppins', height: "3rem", width: '10rem'}}>
          Add Condition
        </Button>
      </Grid>
    </Grid>
  );
};

export default Condition;
